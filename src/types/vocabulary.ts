export interface VocabularyItem {
  id: number
  word: string
  meaning: string
  pronunciation: string
  memory_tip?: string
}

export interface Question {
  item: VocabularyItem
  options: string[]
  correctMeaning: string
}

export type AnswerState = 'idle' | 'correct' | 'incorrect'

export interface QuizScore {
  correct: number
  incorrect: number
}
