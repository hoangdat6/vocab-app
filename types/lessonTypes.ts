export interface Lesson {
  id: string;
  title: string;
  description: string;
  vocabCount: number;
  estimatedTime: string;
  completed: boolean;
  progress: number;
  difficulty?: string;
  themeId?: string;
  themeName?: string;
  themeColor?: string;
  themeIcon?: string;
  // ...add more fields if needed...
}

export interface Theme {
  id: string;
  title: string;
  description: string;
  image: string;
  backgroundColor: string;
  color: string;
  icon: string;
  lessonsCount: number;
  completedLessons: number;
  userCount: number;
  difficulty: string;
  tags: string[];
  lessons: Lesson[];
}
