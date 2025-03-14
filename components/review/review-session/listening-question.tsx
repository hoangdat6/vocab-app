"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { BaseQuestion, QuestionActions } from "@/components/review/review-session/base-question"
import { AudioButton } from "@/components/review/review-session/audio-button"
import type { BaseQuestionProps } from "@/components/review/review-session/base-question"

export function ListeningQuestion({ vocabularyItem, onAnswer, onSkip }: BaseQuestionProps) {
  const [answer, setAnswer] = useState("")

  return (
    <BaseQuestion
      vocabularyItem={vocabularyItem}
      onAnswer={onAnswer}
      onSkip={onSkip}
      validateAnswer={(answer) => answer.toLowerCase().trim() === vocabularyItem.word.toLowerCase().trim()}
      correctAnswer={vocabularyItem.word}
    >
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Nghe và nhập từ</h2>
          <AudioButton text={vocabularyItem.word} size="default" variant="default" className="mb-4" />
          <p className="text-muted-foreground text-sm">Nhấn nút để nghe và nhập từ bạn nghe được</p>
        </div>

        <div className="py-4">
          <Input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Nhập từ tiếng Anh..."
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
    onAnswer(answer.toLowerCase().trim() === vocabularyItem.word.toLowerCase().trim(), 0)
  }
}

