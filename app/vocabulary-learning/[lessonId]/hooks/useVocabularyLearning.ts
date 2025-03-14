import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { fetchLessonById } from "../services/VocabularyService"
import { Lesson } from "../types"

export function useVocabularyLearning(lessonId: string) {
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [learningMode, setLearningMode] = useState("flashcards");
  const [answer, setAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [completed, setCompleted] = useState(false);
  const [showCompletionDialog, setShowCompletionDialog] = useState(false);
  const [progress, setProgress] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [savedWords, setSavedWords] = useState<string[]>([]);
  const [showSide, setShowSide] = useState<"front" | "back">("front");

  useEffect(() => {
    const fetchedLesson = fetchLessonById(lessonId);
    setLesson(fetchedLesson);
    setLoading(false);
  }, [lessonId]);

  // Update progress or mark complete when index changes
  useEffect(() => {
    if (lesson) {
      const newProgress = ((currentIndex + 1) / lesson.vocabulary.length) * 100;
      setProgress(newProgress);
      if (currentIndex >= lesson.vocabulary.length - 1 && isCorrect !== null) {
        setCompleted(true);
        setShowCompletionDialog(true);
      }
    }
  }, [currentIndex, lesson, isCorrect]);

  const checkAnswer = () => {
    if (!lesson) return;
    const currentWord = lesson.vocabulary[currentIndex];
    const isCorrectAnswer = answer.toLowerCase().trim() === currentWord.translation.toLowerCase().trim();
    setIsCorrect(isCorrectAnswer);
    if (isCorrectAnswer) {
      setCorrectAnswers((prev) => prev + 1);
    } else {
      setIncorrectAnswers((prev) => prev + 1);
    }
  };

  const nextCard = () => {
    if (!lesson) return;
    if (currentIndex < lesson.vocabulary.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setAnswer("");
      setIsCorrect(null);
      setShowSide("front");
    } else {
      setCompleted(true);
      setShowCompletionDialog(true);
    }
  };

  const prevCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setAnswer("");
      setIsCorrect(null);
      setShowSide("front");
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setAnswer("");
    setIsCorrect(null);
    setCompleted(false);
    setShowCompletionDialog(false);
    setProgress(0);
    setCorrectAnswers(0);
    setIncorrectAnswers(0);
    setShowSide("front");
  };

  const toggleSaveWord = (wordId: string) => {
    setSavedWords((prev) =>
      prev.includes(wordId) ? prev.filter((id) => id !== wordId) : [...prev, wordId]
    );
  };

  const playAudio = (word: string) => {
    const speech = new SpeechSynthesisUtterance(word);
    speech.lang = "en-US";
    window.speechSynthesis.speak(speech);
  };

  return {
    lesson,
    loading,
    currentIndex, setCurrentIndex,
    learningMode, setLearningMode,
    answer, setAnswer,
    isCorrect, setIsCorrect,
    completed,
    showCompletionDialog, setShowCompletionDialog,
    progress,
    correctAnswers, setCorrectAnswers,
    incorrectAnswers, setIncorrectAnswers,
    savedWords,
    showSide, setShowSide,
    checkAnswer,
    nextCard,
    prevCard,
    handleRestart,
    toggleSaveWord,
    playAudio,
  };
}