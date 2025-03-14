"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { AnimatePresence } from "framer-motion"
import { QuestionFeedback } from "@/components/review/review-session/question-feedback"
import type { VocabularyItem } from "@/types/vocabulary"

export interface BaseQuestionProps {
  vocabularyItem: VocabularyItem
  onAnswer: (isCorrect: boolean, timeSpent: number) => void
  onSkip: () => void
}

export function BaseQuestion({
  children,
  vocabularyItem,
  onAnswer,
  onSkip,
  validateAnswer,
  correctAnswer,
}: BaseQuestionProps & {
  children: React.ReactNode
  validateAnswer: (answer: string) => boolean
  correctAnswer: string
}) {
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [startTime] = useState(Date.now())

  const handleSubmit = (answer: string) => {
    const timeSpent = (Date.now() - startTime) / 1000
    const correct = validateAnswer(answer)

    setIsCorrect(correct)
    setShowResult(true)

    setTimeout(() => {
      setShowResult(false)
      onAnswer(correct, timeSpent)
    }, 1500)
  }

  return (
    <div className="space-y-4">
      {children}

      <AnimatePresence>
        {showResult && <QuestionFeedback isCorrect={isCorrect} correctAnswer={correctAnswer} />}
      </AnimatePresence>
    </div>
  )
}

export function QuestionActions({
  onSkip,
  onSubmit,
  disabled = false,
}: {
  onSkip: () => void
  onSubmit: () => void
  disabled?: boolean
}) {
  return (
    <div className="flex justify-between mt-6">
      <Button variant="outline" onClick={onSkip}>
        Bỏ qua
      </Button>
      <Button onClick={onSubmit} disabled={disabled}>
        Kiểm tra
      </Button>
    </div>
  )
}

