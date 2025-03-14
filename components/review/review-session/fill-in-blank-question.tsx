"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { BaseQuestion, BaseQuestionProps, QuestionActions } from "./base-question"


export function FillInBlankQuestion({ vocabularyItem, onAnswer, onSkip }: BaseQuestionProps) {
  const [answer, setAnswer] = useState("")

  // Create a sentence with the word replaced by a blank
  const sentenceWithBlank = vocabularyItem.example.replace(vocabularyItem.word, "_".repeat(vocabularyItem.word.length))

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
          <p className="text-xl mb-2">Điền từ thích hợp vào chỗ trống:</p>
          <p className="text-lg italic mb-4">{sentenceWithBlank}</p>
        </div>

        <div className="py-4">
          <div className="mb-4 p-3 bg-muted/30 rounded-lg">
            <h3 className="text-sm font-medium mb-2">Gợi ý: Chọn từ thích hợp</h3>
            <div className="flex flex-wrap gap-2">
              {/* Display word options */}
              {getWordOptions().map((word, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => setAnswer(word)}
                  className={answer === word ? "border-primary bg-primary/5" : ""}
                >
                  {word}
                </Button>
              ))}
            </div>
          </div>
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

  function getWordOptions() {
    // Generate some distractors along with the correct word
    return [vocabularyItem.word, "example", "different", "another", "word"].sort(() => Math.random() - 0.5)
  }
}

