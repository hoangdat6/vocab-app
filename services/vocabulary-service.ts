import { VocabularyItem } from "@/types/vocabulary"

// Sample vocabulary data - in a real app, this would come from an API
const vocabularyItems: VocabularyItem[] = [
  {
    id: 1,
    word: "Accomplish",
    meaning: "Hoàn thành",
    example: "She accomplished her goal of running a marathon.",
    pronunciation: "/əˈkʌmplɪʃ/",
    level: 3,
  },
  {
    id: 2,
    word: "Determine",
    meaning: "Quyết định",
    example: "We need to determine the best course of action.",
    pronunciation: "/dɪˈtɜːmɪn/",
    level: 2,
  },
  {
    id: 3,
    word: "Enhance",
    meaning: "Nâng cao",
    example: "The new features will enhance the user experience.",
    pronunciation: "/ɪnˈhɑːns/",
    level: 4,
  },
  {
    id: 4,
    word: "Facilitate",
    meaning: "Tạo điều kiện",
    example: "The new system will facilitate better communication.",
    pronunciation: "/fəˈsɪlɪteɪt/",
    level: 1,
  },
  {
    id: 5,
    word: "Generate",
    meaning: "Tạo ra",
    example: "The solar panels generate electricity.",
    pronunciation: "/ˈdʒenəreɪt/",
    level: 3,
  },
]

export const VocabularyService = {
  // Simulate fetching vocabulary items
  getVocabularyItems: async (): Promise<VocabularyItem[]> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))
    return vocabularyItems
  },

  // Get a specific vocabulary item by ID
  getVocabularyItemById: async (id: number): Promise<VocabularyItem | undefined> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 200))
    return vocabularyItems.find((item) => item.id === id)
  },

  // Get vocabulary items by level
  getVocabularyItemsByLevel: async (level: number): Promise<VocabularyItem[]> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300))
    return vocabularyItems.filter((item) => item.level === level)
  },
}

