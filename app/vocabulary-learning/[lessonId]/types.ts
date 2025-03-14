export interface VocabularyItem {
  id: string;
  word: string;
  translation: string;
  example: string;
  exampleTranslation: string;
  audioUrl: string;
  note: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  theme: string;
  themeIcon: string;
  themeColor: string;
  themeFontColor: string;
  difficulty: string;
  estimatedTime: string;
  vocabulary: VocabularyItem[];
}
