"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { BaseQuestion, QuestionActions } from "@/components/review/review-session/base-question"
import { AudioButton } from "@/components/review/review-session/audio-button"
import type { BaseQuestionProps } from "@/components/review/review-session/base-question"

export function TranslationQuestion({ vocabularyItem, onAnswer, onSkip }: BaseQuestionProps) {
  const [answer, setAnswer] = useState("")

  return (
    <BaseQuestion
      vocabularyItem={vocabularyItem}
      onAnswer={onAnswer}
      onSkip={onSkip}
      validateAnswer={(answer) => answer.toLowerCase().trim() === vocabularyItem.meaning.toLowerCase().trim()}
      correctAnswer={vocabularyItem.meaning}
    >
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">{vocabularyItem.word}</h2>
          <div className="flex items-center justify-center gap-2">
            <span className="text-muted-foreground">{vocabularyItem.pronunciation}</span>
            <AudioButton text={vocabularyItem.word} />
          </div>
        </div>

        <div className="py-4">
          <h3 className="text-lg font-medium mb-4">Nhập nghĩa của từ:</h3>
          <Input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Nhập nghĩa tiếng Việt..."
            className="text-lg"
            onKeyDown={(e) => {
              if (e.key === "Enter" && answer.trim()) {
                handleSubmit()
              }
            }}
          />
        </div>

        <QuestionActions onSkip={onSkip} onSubmit={handleSubmit} disabled={!answer.trim()} />
      </div>
    </BaseQuestion>
  )

  function handleSubmit() {
    onAnswer(answer.toLowerCase().trim() === vocabularyItem.meaning.toLowerCase().trim(), 0)
  }
}

