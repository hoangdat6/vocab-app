import { Theme } from "@/types/lessonTypes";

const themesData: Theme[] = [
  {
    id: "t1",
    title: "Giao tiếp cơ bản",
    description: "Các từ vựng và cụm từ cần thiết cho giao tiếp hàng ngày",
    image: "/placeholder.svg?height=200&width=400",
    backgroundColor: "bg-blue-100 dark:bg-blue-900/30",
    color: "text-blue-800 dark:text-blue-400",
    icon: "💬",
    lessonsCount: 12,
    completedLessons: 8,
    userCount: 3420,
    difficulty: "beginner",
    tags: ["essential", "conversation", "daily"],
    lessons: [
      {
          id: "l1",
          title: "Chào hỏi và giới thiệu",
          description: "Học cách chào hỏi và giới thiệu bản thân",
          vocabCount: 20,
          estimatedTime: "15 phút",
          completed: true,
          progress: 100,
          difficulty: ""
      },
      {
          id: "l2",
          title: "Hỏi đường",
          description: "Từ vựng để hỏi và chỉ đường",
          vocabCount: 25,
          estimatedTime: "20 phút",
          completed: true,
          progress: 100,
          difficulty: ""
      },
      {
        id: "l3",
        title: "Đi mua sắm",
        description: "Từ vựng hữu ích khi đi mua sắm",
        vocabCount: 30,
        estimatedTime: "25 phút",
        completed: false,
        progress: 60
      }
    ]
  },
  {
    id: "t2",
    title: "Du lịch",
    description: "Từ vựng cần thiết khi đi du lịch và khám phá thế giới",
    image: "/placeholder.svg?height=200&width=400",
    backgroundColor: "bg-green-100 dark:bg-green-900/30",
    color: "text-green-800 dark:text-green-400",
    icon: "✈️",
    lessonsCount: 10,
    completedLessons: 4,
    userCount: 2850,
    difficulty: "intermediate",
    tags: ["travel", "vacation", "hotel"],
    lessons: [
      {
        id: "l4",
        title: "Đặt phòng khách sạn",
        description: "Từ vựng cho việc đặt và sử dụng dịch vụ khách sạn",
        vocabCount: 25,
        estimatedTime: "20 phút",
        completed: true,
        progress: 100
      },
      {
        id: "l5",
        title: "Tại sân bay",
        description: "Các cụm từ thông dụng tại sân bay",
        vocabCount: 30,
        estimatedTime: "25 phút",
        completed: true,
        progress: 100
      },
      {
        id: "l6",
        title: "Đi nhà hàng",
        description: "Từ vựng để đặt bàn và gọi món ăn",
        vocabCount: 28,
        estimatedTime: "25 phút",
        completed: false,
        progress: 40
      }
    ]
  },
  {
    id: "t3",
    title: "Công sở",
    description: "Từ vựng chuyên nghiệp cho môi trường làm việc",
    image: "/placeholder.svg?height=200&width=400",
    backgroundColor: "bg-purple-100 dark:bg-purple-900/30",
    color: "text-purple-800 dark:text-purple-400",
    icon: "💼",
    lessonsCount: 15,
    completedLessons: 2,
    userCount: 2130,
    difficulty: "intermediate",
    tags: ["business", "office", "professional"],
    lessons: [
      {
        id: "l7",
        title: "Họp hành",
        description: "Từ vựng cho các cuộc họp công việc",
        vocabCount: 35,
        estimatedTime: "30 phút",
        completed: true,
        progress: 100
      },
      {
        id: "l8",
        title: "Thuyết trình",
        description: "Các cụm từ hữu ích khi thuyết trình",
        vocabCount: 32,
        estimatedTime: "30 phút",
        completed: false,
        progress: 25
      },
      {
        id: "l9",
        title: "Email công việc",
        description: "Mẫu câu và từ vựng cho email chuyên nghiệp",
        vocabCount: 30,
        estimatedTime: "25 phút",
        completed: false,
        progress: 0
      }
    ]
  },
  {
    id: "t4",
    title: "Công nghệ",
    description: "Từ vựng về công nghệ, máy tính và internet",
    image: "/placeholder.svg?height=200&width=400",
    backgroundColor: "bg-yellow-100 dark:bg-yellow-900/30",
    color: "text-yellow-800 dark:text-yellow-400",
    icon: "💻",
    lessonsCount: 8,
    completedLessons: 0,
    userCount: 1980,
    difficulty: "advanced",
    tags: ["technology", "computers", "internet"],
    lessons: [
      {
        id: "l10",
        title: "Phần cứng máy tính",
        description: "Từ vựng về linh kiện và thiết bị máy tính",
        vocabCount: 40,
        estimatedTime: "35 phút",
        completed: false,
        progress: 0
      },
      {
        id: "l11",
        title: "Phần mềm và ứng dụng",
        description: "Từ vựng về các loại phần mềm và ứng dụng",
        vocabCount: 38,
        estimatedTime: "30 phút",
        completed: false,
        progress: 0
      },
      {
        id: "l12",
        title: "Mạng xã hội",
        description: "Từ vựng liên quan đến các nền tảng mạng xã hội",
        vocabCount: 35,
        estimatedTime: "25 phút",
        completed: false,
        progress: 0
      }
    ]
  },
  {
    id: "t5",
    title: "Y tế",
    description: "Từ vựng về sức khỏe và y tế",
    image: "/placeholder.svg?height=200&width=400",
    backgroundColor: "bg-red-100 dark:bg-red-900/30",
    color: "text-red-800 dark:text-red-400",
    icon: "🏥",
    lessonsCount: 10,
    completedLessons: 1,
    userCount: 1650,
    difficulty: "advanced",
    tags: ["health", "medical", "doctor"],
    lessons: [
      {
        id: "l13",
        title: "Tại phòng khám",
        description: "Từ vựng khi đi khám bệnh",
        vocabCount: 35,
        estimatedTime: "30 phút",
        completed: true,
        progress: 100
      },
      {
        id: "l14",
        title: "Các bệnh thông thường",
        description: "Từ vựng về các loại bệnh thường gặp",
        vocabCount: 40,
        estimatedTime: "35 phút",
        completed: false,
        progress: 0
      },
      {
        id: "l15",
        title: "Thuốc và điều trị",
        description: "Từ vựng về thuốc và các phương pháp điều trị",
        vocabCount: 38,
        estimatedTime: "30 phút",
        completed: false,
        progress: 0
      }
    ]
  },
  {
    id: "t6",
    title: "Giáo dục",
    description: "Từ vựng về học tập và giáo dục",
    image: "/placeholder.svg?height=200&width=400",
    backgroundColor: "bg-indigo-100 dark:bg-indigo-900/30",
    color: "text-indigo-800 dark:text-indigo-400",
    icon: "🎓",
    lessonsCount: 12,
    completedLessons: 3,
    userCount: 1920,
    difficulty: "intermediate",
    tags: ["education", "school", "learning"],
    lessons: [
      {
        id: "l16",
        title: "Trong lớp học",
        description: "Từ vựng sử dụng trong lớp học",
        vocabCount: 30,
        estimatedTime: "25 phút",
        completed: true,
        progress: 100
      },
      {
        id: "l17",
        title: "Các môn học",
        description: "Từ vựng về các môn học khác nhau",
        vocabCount: 35,
        estimatedTime: "30 phút",
        completed: true,
        progress: 100
      },
      {
        id: "l18",
        title: "Kỳ thi và đánh giá",
        description: "Từ vựng liên quan đến thi cử và đánh giá",
        vocabCount: 32,
        estimatedTime: "28 phút",
        completed: true,
        progress: 100
      }
    ]
  }
];

export function getThemes(): Theme[] {
  return themesData;
}
