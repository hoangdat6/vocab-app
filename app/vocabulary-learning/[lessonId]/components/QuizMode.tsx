"use client"
import { Lightbulb } from "lucide-react"
import { Button } from "@/components/ui/button"

export function QuizMode(props: { setLearningMode(value: string): void }) {
  return (
    <div className="text-center py-20">
      <Lightbulb className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
      <h3 className="text-xl font-medium mb-2">Chế độ trắc nghiệm</h3>
      <p className="text-muted-foreground mb-6">Chế độ này đang được phát triển và sẽ có sẵn trong bản cập nhật sắp tới.</p>
      <Button onClick={() => props.setLearningMode("flashcards")}>
        Quay lại chế độ thẻ ghi nhớ
      </Button>
    </div>
  );
}