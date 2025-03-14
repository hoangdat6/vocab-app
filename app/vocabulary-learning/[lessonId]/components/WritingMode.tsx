"use client"
import { motion, AnimatePresence } from "framer-motion"
import { Check, X, Volume2, Star, ArrowLeft, ArrowRight } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 }
  },
  exit: { opacity: 0, y: -50, transition: { duration: 0.3 } }
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

export function WritingMode(props: {
  lesson: any;
  currentIndex: number;
  answer: string;
  isCorrect: boolean | null;
  checkAnswer(): void;
  nextCard(): void;
  prevCard(): void;
  savedWords: string[];
  toggleSaveWord(id: string): void;
  playAudio(word: string): void;
  setAnswer(value: string): void;
}) {
  return (
    <motion.div
      key={`writing-${props.currentIndex}-${props.isCorrect}`}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      layout
    >
      <Card className="relative overflow-hidden">
        <div 
          className="absolute top-0 right-0 flex gap-2 p-4"
          onClick={(e) => e.stopPropagation()}
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => props.playAudio(props.lesson.vocabulary[props.currentIndex].word)}
                >
                  <Volume2 className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Nghe phát âm</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    props.toggleSaveWord(
                      props.lesson.vocabulary[props.currentIndex].id
                    )
                  }
                >
                  <Star className={`h-5 w-5 ${
                    props.savedWords.includes(
                      props.lesson.vocabulary[props.currentIndex].id
                    ) ? "fill-yellow-400 text-yellow-400" : ""
                  }`} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Lưu từ vựng</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <CardHeader>
          <CardTitle className="text-center text-2xl">
            {props.lesson.vocabulary[props.currentIndex].word}
          </CardTitle>
          <CardDescription className="text-center italic">
            "{props.lesson.vocabulary[props.currentIndex].example}"
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="mb-2 text-sm font-medium">
                Hãy nhập nghĩa của từ này:
              </p>
              <Textarea
                value={props.answer}
                onChange={(e) => props.setAnswer(e.target.value)}
                placeholder="Nhập nghĩa tiếng Việt..."
                disabled={props.isCorrect !== null}
              />
            </div>

            <AnimatePresence>
              {props.isCorrect !== null && (
                <motion.div
                  variants={resultVariants}
                  animate={props.isCorrect ? "correct" : "incorrect"}
                  className={`p-4 rounded-lg ${
                    props.isCorrect
                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {props.isCorrect ? <p>✅</p> : <p>❌</p>}
                    <div>
                      <p className="font-medium">
                        {props.isCorrect ? "Chính xác!" : "Chưa chính xác"}
                      </p>
                      <p>
                        Nghĩa đúng:{" "}
                        <span className="font-medium">
                          {
                            props.lesson.vocabulary[props.currentIndex]
                              .translation
                          }
                        </span>
                      </p>
                      {!props.isCorrect &&
                        props.lesson.vocabulary[props.currentIndex].note && (
                          <p className="mt-1 text-sm">
                            <span className="font-medium">Ghi chú:</span>{" "}
                            {props.lesson.vocabulary[props.currentIndex].note}
                          </p>
                        )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={props.prevCard}
            disabled={props.currentIndex === 0}
          >
            Trước
          </Button>

          {props.isCorrect === null ? (
            <Button onClick={props.checkAnswer} disabled={!props.answer.trim()}>
              Kiểm tra
            </Button>
          ) : (
            <Button onClick={props.nextCard}>
              {props.currentIndex < props.lesson.vocabulary.length - 1
                ? "Tiếp theo"
                : "Hoàn thành"}
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
}