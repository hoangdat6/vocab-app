"use client"

import { useState } from "react"
import { MultipleChoiceQuestion } from "@/components/review/review-session/multiple-choice-question"
import { TranslationQuestion } from "@/components/review/review-session/translation-question"
import { FillInBlankQuestion } from "@/components/review/review-session/fill-in-blank-question"
import { ListeningQuestion } from "@/components/review/review-session/listening-question"
import { ReviewService } from "@/services/review-service"
import type { VocabularyItem } from "@/types/vocabulary"
import type { QuestionType } from "@/types/review"

interface ReviewQuestionProps {
  questionType: QuestionType
  vocabularyItem: VocabularyItem
  onAnswer: (isCorrect: boolean, timeSpent: number) => void
  onSkip: () => void
}

export function ReviewQuestion({ questionType, vocabularyItem, onAnswer, onSkip }: ReviewQuestionProps) {
  const [startTime] = useState(Date.now())

  // Generate options for multiple choice
  const options =
    questionType === "multiple-choice" ? ReviewService.generateMultipleChoiceOptions(vocabularyItem.meaning) : []

  // Handle answer with time tracking
  const handleAnswer = (isCorrect: boolean) => {
    const timeSpent = (Date.now() - startTime) / 1000
    onAnswer(isCorrect, timeSpent)
  }

  // Render the appropriate question component based on type
  switch (questionType) {
    case "multiple-choice":
      return (
        <MultipleChoiceQuestion
          vocabularyItem={vocabularyItem}
          options={options}
          onAnswer={handleAnswer}
          onSkip={onSkip}
        />
      )
    case "translation":
      return <TranslationQuestion vocabularyItem={vocabularyItem} onAnswer={handleAnswer} onSkip={onSkip} />
    case "fill-in-blank":
      return <FillInBlankQuestion vocabularyItem={vocabularyItem} onAnswer={handleAnswer} onSkip={onSkip} />
    case "listening":
      return <ListeningQuestion vocabularyItem={vocabularyItem} onAnswer={handleAnswer} onSkip={onSkip} />
    default:
      return null
  }
}

