"use client"

import { useState, useEffect } from "react"
import { VocabularyItem } from "@/types/vocabulary"
import { VocabularyService } from "@/services/vocabulary-service"

export function useVocabularyData() {
  const [vocabularyItems, setVocabularyItems] = useState<VocabularyItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchVocabularyItems = async () => {
      try {
        setIsLoading(true)
        const items = await VocabularyService.getVocabularyItems()
        setVocabularyItems(items)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch vocabulary items"))
      } finally {
        setIsLoading(false)
      }
    }

    fetchVocabularyItems()
  }, [])

  return {
    vocabularyItems,
    isLoading,
    error,
  }
}

