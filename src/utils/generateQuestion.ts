import type { Question, VocabularyItem } from '@/types/vocabulary'
import { shuffleArray } from '@/utils/shuffleArray'

const OPTION_COUNT = 4

/**
 * Builds a multiple-choice question for `item`.
 * Wrong answers are sampled from other vocabulary meanings.
 */
export function generateQuestion(
  item: VocabularyItem,
  pool: readonly VocabularyItem[],
): Question {
  const distractors = shuffleArray(
    pool.filter((entry) => entry.id !== item.id).map((entry) => entry.meaning),
  ).slice(0, OPTION_COUNT - 1)

  const options = shuffleArray([item.meaning, ...distractors])

  return {
    item,
    options,
    correctMeaning: item.meaning,
  }
}

/** Shuffles the full pool so each word is asked once. */
export function buildQuizOrder(pool: readonly VocabularyItem[]): VocabularyItem[] {
  return shuffleArray(pool)
}
