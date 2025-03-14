"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { BaseQuestion, QuestionActions } from "@/components/review/review-session/base-question"
import { AudioButton } from "@/components/review/review-session/audio-button"
import type { BaseQuestionProps } from "@/components/review/review-session/base-question"

interface MultipleChoiceQuestionProps extends BaseQuestionProps {
  options: string[]
}

export function MultipleChoiceQuestion({ vocabularyItem, options, onAnswer, onSkip }: MultipleChoiceQuestionProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  return (
    <BaseQuestion
      vocabularyItem={vocabularyItem}
      onAnswer={onAnswer}
      onSkip={onSkip}
      validateAnswer={(answer) => answer === vocabularyItem.meaning}
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
          <h3 className="text-lg font-medium mb-4">Chọn nghĩa đúng:</h3>
          <RadioGroup value={selectedOption || ""} onValueChange={setSelectedOption} className="space-y-3">
            {options.map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.1 }}
                className={`flex items-center space-x-2 rounded-lg border p-4 transition-colors hover:bg-accent ${
                  selectedOption === option ? "border-primary bg-primary/5" : ""
                }`}
              >
                <RadioGroupItem value={option} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer font-medium">
                  {option}
                </Label>
              </motion.div>
            ))}
          </RadioGroup>
        </div>

        <QuestionActions
          onSkip={onSkip}
          onSubmit={() => selectedOption && handleSubmit(selectedOption)}
          disabled={!selectedOption}
        />
      </div>
    </BaseQuestion>
  )

  function handleSubmit(answer: string) {
    onAnswer(answer === vocabularyItem.meaning, 0)
  }
}

