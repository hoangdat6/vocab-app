"use client"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight, Volume2, Check, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"

export function Flashcards(props: {
  lesson: any;
  currentIndex: number;
  nextCard(): void;
  prevCard(): void;
  savedWords: string[];
  toggleSaveWord(id: string): void;
  playAudio(word: string): void;
  showSide: "front" | "back";
  setShowSide(side: "front" | "back"): void;
}) {
  return (
    <motion.div
      key={`flashcard-${props.currentIndex}-${props.showSide}`}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { type: "spring", stiffness: 100, damping: 15 }
        },
        exit: { opacity: 0, y: -50, transition: { duration: 0.3 } }
      }}
      initial="hidden"
      animate="visible"
      exit="exit"
      layout
    >
      <div
        className="relative h-[320px] overflow-hidden"
        style={{ perspective: "1000px" }} // <-- add perspective
      >
        <div
          className={`relative w-full h-full transition-transform duration-500`}
          style={{
            transformStyle: "preserve-3d",
            transform: props.showSide === "back" ? "rotateY(180deg)" : "none"
          }}
        >
          {/* Front side */}
          <div
            className="absolute w-full h-full backface-hidden flex flex-col justify-center items-center p-6"
            style={{ WebkitBackfaceVisibility: "hidden" }}
            onClick={() =>
              props.setShowSide("back")
            }
          >
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">
                {props.lesson.vocabulary[props.currentIndex].word}
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                Nhấp để xem nghĩa
              </p>
              <div className="mt-6">
                <p className="text-sm italic text-muted-foreground">
                  "{props.lesson.vocabulary[props.currentIndex].example}"
                </p>
              </div>
            </div>
          </div>

          {/* Back side */}
          <div
            className="absolute w-full h-full backface-hidden flex flex-col justify-center items-center p-6"
            style={{ transform: "rotateY(180deg)", WebkitBackfaceVisibility: "hidden" }}
            onClick={() =>
              props.setShowSide("front")
            }
          >
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">
                {props.lesson.vocabulary[props.currentIndex].translation}
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                Nhấp để xem từ vựng
              </p>
              <div className="mt-4">
                <p className="text-sm italic text-muted-foreground">
                  "{props.lesson.vocabulary[props.currentIndex].exampleTranslation}"
                </p>
              </div>
              {props.lesson.vocabulary[props.currentIndex].note && (
                <div className="mt-6 px-4 py-2 bg-muted rounded-lg text-sm">
                  <p>
                    <span className="font-medium">Ghi chú:</span>{" "}
                    {props.lesson.vocabulary[props.currentIndex].note}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Top-right corner buttons */}
          <div
            className="absolute top-0 right-0 flex gap-2 p-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Audio button */}
            <button
              onClick={() =>
                props.playAudio(props.lesson.vocabulary[props.currentIndex].word)
              }
            >
              <Volume2 className="h-5 w-5" />
            </button>
            {/* Save button */}
            <button
              onClick={() =>
                props.toggleSaveWord(props.lesson.vocabulary[props.currentIndex].id)
              }
            >
              <Star
                className={`h-5 w-5 ${
                  props.savedWords.includes(
                    props.lesson.vocabulary[props.currentIndex].id
                  )
                    ? "fill-yellow-400 text-yellow-400"
                    : ""
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}