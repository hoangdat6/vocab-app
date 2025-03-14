"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, ArrowRight, Volume2, Check, X, RotateCcw, BookOpen, Flag, ThumbsUp, Lightbulb, Star } from 'lucide-react'
import { Clock } from 'lucide-react'; // Import Clock icon
import { 
  Card, 
  CardContent, 
  CardFooter,
  CardHeader, 
  CardTitle,
  CardDescription 
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter,
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog"
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { useVocabularyLearning } from "./hooks/useVocabularyLearning"
import { Flashcards } from "./components/Flashcards"
import { WritingMode } from "./components/WritingMode"
import { QuizMode } from "./components/QuizMode"

// Animation variants
const pageVariants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { duration: 0.5 }
  },
  exit: { opacity: 0 }
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  },
  exit: { 
    opacity: 0, 
    y: -50,
    transition: { duration: 0.3 }
  }
};

const resultVariants = {
  correct: {
    scale: [1, 1.2, 1],
    backgroundColor: ["rgba(34, 197, 94, 0)", "rgba(34, 197, 94, 0.2)", "rgba(34, 197, 94, 0)"],
    transition: { duration: 0.5 }
  },
  incorrect: {
    scale: [1, 1.2, 1],
    backgroundColor: ["rgba(239, 68, 68, 0)", "rgba(239, 68, 68, 0.2)", "rgba(239, 68, 68, 0)"],
    transition: { duration: 0.5 }
  }
};

// Learning modes
const learningModes = [
  { id: "flashcards", name: "Thẻ ghi nhớ", icon: <BookOpen className="h-4 w-4 mr-2" /> },
  { id: "writing", name: "Viết", icon: <BookOpen className="h-4 w-4 mr-2" /> },
  { id: "quiz", name: "Trắc nghiệm", icon: <BookOpen className="h-4 w-4 mr-2" /> }
];

export default function Page({ params }: { params: { lessonId: string } }) {
  const {
    lesson, loading,
    currentIndex,
    learningMode, setLearningMode,
    showSide, setShowSide,
    answer, setAnswer,
    isCorrect,
    completed, showCompletionDialog, setShowCompletionDialog,
    progress, correctAnswers, incorrectAnswers, savedWords,
    nextCard, prevCard, handleRestart, toggleSaveWord, playAudio,
    checkAnswer // <-- add this
  } = useVocabularyLearning(params.lessonId);

  const router = useRouter();

  if (loading) {
    return (
      <div className="container max-w-3xl py-20 flex justify-center items-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Đang tải bài học...</p>
        </motion.div>
      </div>
    );
  } else if (!lesson) {
    router.push("/lessons");
    return null;
  }

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="container max-w-4xl py-10"
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button 
            variant="ghost" 
            onClick={() => router.push("/lessons")}
            className="gap-1"
          >
            <ArrowLeft className="h-4 w-4" />
            Quay lại
          </Button>
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={handleRestart}
              className="gap-1"
            >
              <RotateCcw className="h-4 w-4" />
              Học lại
            </Button>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Badge className={`${lesson.themeColor} ${lesson.themeFontColor}`}>
              <span className="mr-1">{lesson.themeIcon}</span> {lesson.theme}
            </Badge>
            <Badge variant="outline">
              {lesson.difficulty === "beginner" ? "Cơ bản" : 
               lesson.difficulty === "intermediate" ? "Trung cấp" : "Nâng cao"}
            </Badge>
          </div>
          <h1 className="text-3xl font-bold">{lesson.title}</h1>
          <p className="text-muted-foreground">{lesson.description}</p>
          
          <div className="flex items-center gap-4 pt-2">
            <div className="flex items-center text-sm text-muted-foreground gap-1">
              <BookOpen className="h-4 w-4" />
              {lesson.vocabulary.length} từ vựng
            </div>
            <div className="flex items-center text-sm text-muted-foreground gap-1">
              <Clock className="h-4 w-4" />
              {lesson.estimatedTime}
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              Tiến độ: {currentIndex + 1}/{lesson.vocabulary.length} từ vựng
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="flex items-center text-green-500 gap-1">
                <Check className="h-4 w-4" /> {correctAnswers}
              </span>
              <span className="flex items-center text-red-500 gap-1">
                <X className="h-4 w-4" /> {incorrectAnswers}
              </span>
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        
        <Tabs value={learningMode} onValueChange={setLearningMode} className="mt-6">
          <TabsList className="grid grid-cols-3 mb-6">
            {learningModes.map(mode => (
              <TabsTrigger key={mode.id} value={mode.id} className="flex items-center">
                {mode.icon}
                {mode.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <TabsContent value="flashcards">
            <Flashcards
              lesson={lesson}
              currentIndex={currentIndex}
              nextCard={nextCard}
              prevCard={prevCard}
              savedWords={savedWords}
              toggleSaveWord={toggleSaveWord}
              playAudio={playAudio}
              showSide={showSide}
              setShowSide={setShowSide}
            />
          </TabsContent>
          
          <TabsContent value="writing">
            <WritingMode
              lesson={lesson}
              currentIndex={currentIndex}
              answer={answer}
              setAnswer={setAnswer}
              isCorrect={isCorrect}
              checkAnswer={checkAnswer}
              nextCard={nextCard}
              prevCard={prevCard}
              savedWords={savedWords}
              toggleSaveWord={toggleSaveWord}
              playAudio={playAudio}
            />
          </TabsContent>
          
          <TabsContent value="quiz">
            <QuizMode setLearningMode={setLearningMode} />
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Completion Dialog */}
      <Dialog open={showCompletionDialog} onOpenChange={setShowCompletionDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Chúc mừng!</DialogTitle>
            <DialogDescription>
              Bạn đã hoàn thành bài học từ vựng "{lesson.title}"
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-500">{correctAnswers}</div>
                  <div className="text-sm text-muted-foreground">Đúng</div>
                </div>
                
                <Separator orientation="vertical" className="h-10" />
                
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-500">{incorrectAnswers}</div>
                  <div className="text-sm text-muted-foreground">Sai</div>
                </div>
                
                <Separator orientation="vertical" className="h-10" />
                
                <div className="text-center">
                  <div className="text-3xl font-bold">{savedWords.length}</div>
                  <div className="text-sm text-muted-foreground">Đã lưu</div>
                </div>
              </div>
              
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-center mb-4">Độ chính xác</p>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
                  <div 
                    className="h-full bg-green-500 rounded-full"
                    style={{ width: `${correctAnswers > 0 ? (correctAnswers / (correctAnswers + incorrectAnswers) * 100) : 0}%` }}>
                  </div>
                </div>
                <p className="text-center mt-2">
                  {correctAnswers > 0 ? Math.round((correctAnswers / (correctAnswers + incorrectAnswers) * 100)) : 0}%
                </p>
              </div>
            </div>
          </div>
          
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={() => router.push("/lessons")} className="sm:flex-1">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Quay lại danh sách
            </Button>
            <Button onClick={handleRestart} className="sm:flex-1">
              <RotateCcw className="h-4 w-4 mr-2" />
              Học lại
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}
