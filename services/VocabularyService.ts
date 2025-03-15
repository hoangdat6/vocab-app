import { Lesson } from "../app/vocabulary-learning/[lessonId]/types"

// Sample vocabulary data for a lesson
export const vocabularyLessons: Record<string, Lesson> = {
  "l1": {
    id: "l1",
    title: "Chào hỏi và giới thiệu",
    description: "Học cách chào hỏi và giới thiệu bản thân",
    theme: "Giao tiếp cơ bản",
    themeIcon: "💬",
    themeColor: "bg-blue-100 dark:bg-blue-900/30",
    themeFontColor: "text-blue-800 dark:text-blue-400",
    difficulty: "beginner",
    estimatedTime: "15 phút",
    vocabulary: [
      {
        id: "v1",
        word: "Hello",
        translation: "Xin chào",
        example: "Hello, how are you?",
        exampleTranslation: "Xin chào, bạn khỏe không?",
        audioUrl: "",
        note: "Dùng khi gặp ai đó"
      },
      {
        id: "v2",
        word: "Goodbye",
        translation: "Tạm biệt",
        example: "Goodbye, see you tomorrow!",
        exampleTranslation: "Tạm biệt, hẹn gặp lại vào ngày mai!",
        audioUrl: "",
        note: "Dùng khi chia tay"
      },
      {
        id: "v3",
        word: "Thank you",
        translation: "Cảm ơn",
        example: "Thank you for your help.",
        exampleTranslation: "Cảm ơn vì sự giúp đỡ của bạn.",
        audioUrl: "",
        note: "Dùng khi cảm ơn ai đó"
      },
      {
        id: "v4",
        word: "Please",
        translation: "Làm ơn",
        example: "Please help me.",
        exampleTranslation: "Làm ơn giúp tôi.",
        audioUrl: "",
        note: "Dùng khi yêu cầu lịch sự"
      },
      {
        id: "v5",
        word: "Sorry",
        translation: "Xin lỗi",
        example: "I'm sorry for being late.",
        exampleTranslation: "Tôi xin lỗi vì đến muộn.",
        audioUrl: "",
        note: "Dùng khi xin lỗi"
      },
      {
        id: "v6",
        word: "My name is",
        translation: "Tên tôi là",
        example: "My name is John.",
        exampleTranslation: "Tên tôi là John.",
        audioUrl: "",
        note: "Dùng khi giới thiệu tên"
      },
      {
        id: "v7",
        word: "Nice to meet you",
        translation: "Rất vui được gặp bạn",
        example: "Nice to meet you, Sarah.",
        exampleTranslation: "Rất vui được gặp bạn, Sarah.",
        audioUrl: "",
        note: "Dùng khi gặp ai đó lần đầu"
      },
      {
        id: "v8",
        word: "How are you?",
        translation: "Bạn khỏe không?",
        example: "Hi Tom, how are you today?",
        exampleTranslation: "Chào Tom, hôm nay bạn thế nào?",
        audioUrl: "",
        note: "Dùng khi hỏi thăm sức khỏe"
      },
      {
        id: "v9",
        word: "I'm fine",
        translation: "Tôi khỏe",
        example: "I'm fine, thank you.",
        exampleTranslation: "Tôi khỏe, cảm ơn bạn.",
        audioUrl: "",
        note: "Dùng khi trả lời câu hỏi 'How are you?'"
      },
      {
        id: "v10",
        word: "Where are you from?",
        translation: "Bạn đến từ đâu?",
        example: "Where are you from? I'm from Vietnam.",
        exampleTranslation: "Bạn đến từ đâu? Tôi đến từ Việt Nam.",
        audioUrl: "",
        note: "Dùng khi hỏi quê quán hoặc quốc tịch"
      }
    ]
  },
  // Add more lessons as needed
};

export function fetchLessonById(lessonId: string): Lesson | null {
  return vocabularyLessons[lessonId] || null;
}