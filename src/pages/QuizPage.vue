<script setup lang="ts">
import { computed, ref } from 'vue'
import AnswerOptions from '@/components/AnswerOptions.vue'
import MemoryTip from '@/components/MemoryTip.vue'
import ProgressBar from '@/components/ProgressBar.vue'
import ResultScreen from '@/components/ResultScreen.vue'
import WordCard from '@/components/WordCard.vue'
import vocabularyData from '@/data/vocabulary.json'
import type { AnswerState, Question, QuizScore, VocabularyItem } from '@/types/vocabulary'
import { buildQuizOrder, generateQuestion } from '@/utils/generateQuestion'

const vocabulary = vocabularyData as VocabularyItem[]

const quizOrder = ref<VocabularyItem[]>([])
const currentIndex = ref(0)
const question = ref<Question | null>(null)
const answerState = ref<AnswerState>('idle')
const selectedMeaning = ref<string | null>(null)
const score = ref<QuizScore>({ correct: 0, incorrect: 0 })
const isFinished = ref(false)
const cardKey = ref(0)

const total = computed(() => quizOrder.value.length)
const completedCount = computed(() => {
  if (isFinished.value) return total.value
  return answerState.value === 'idle' ? currentIndex.value : currentIndex.value + 1
})
const feedbackMessage = computed(() => {
  if (answerState.value === 'correct') return 'Chính xác!'
  if (answerState.value === 'incorrect' && question.value) {
    return `Nghĩa đúng: ${question.value.correctMeaning}`
  }
  return ''
})
const showMemoryTip = computed(
  () =>
    answerState.value === 'correct' &&
    Boolean(question.value?.item.memory_tip),
)

function startQuiz() {
  quizOrder.value = buildQuizOrder(vocabulary)
  currentIndex.value = 0
  score.value = { correct: 0, incorrect: 0 }
  isFinished.value = false
  answerState.value = 'idle'
  selectedMeaning.value = null
  loadCurrentQuestion()
}

function loadCurrentQuestion() {
  const item = quizOrder.value[currentIndex.value]
  if (!item) {
    isFinished.value = true
    question.value = null
    return
  }

  question.value = generateQuestion(item, vocabulary)
  answerState.value = 'idle'
  selectedMeaning.value = null
  cardKey.value += 1
}

function onSelect(meaning: string) {
  if (answerState.value !== 'idle' || !question.value) return

  selectedMeaning.value = meaning
  const isCorrect = meaning === question.value.correctMeaning

  if (isCorrect) {
    answerState.value = 'correct'
    score.value = { ...score.value, correct: score.value.correct + 1 }
  } else {
    answerState.value = 'incorrect'
    score.value = { ...score.value, incorrect: score.value.incorrect + 1 }
  }
}

function onNext() {
  if (currentIndex.value >= total.value - 1) {
    isFinished.value = true
    return
  }

  currentIndex.value += 1
  loadCurrentQuestion()
}

startQuiz()
</script>

<template>
  <div class="mx-auto flex min-h-dvh w-full max-w-lg flex-col px-4 py-8 sm:py-12">
    <header class="mb-6 text-center">
      <p class="text-sm font-bold uppercase tracking-[0.2em] text-teal-700/80">Word Recall</p>
      <h1 class="mt-1 font-['Source_Serif_4',serif] text-2xl font-bold text-[var(--color-ink)]">
        Học từ vựng
      </h1>
    </header>

    <ProgressBar
      v-if="total > 0"
      class="mb-6"
      :current="completedCount"
      :total="total"
    />

    <ResultScreen
      v-if="isFinished"
      :score="score"
      :total="total"
      @restart="startQuiz"
    />

    <Transition
      v-else-if="question"
      name="card"
      mode="out-in"
    >
      <div
        :key="cardKey"
        class="rounded-3xl bg-[var(--color-surface)] p-6 shadow-[0_12px_40px_rgba(26,46,53,0.08)] sm:p-8"
      >
        <WordCard
          :word="question.item.word"
          :pronunciation="question.item.pronunciation"
          :question-number="currentIndex + 1"
          :total="total"
        />

        <div class="mt-8">
          <AnswerOptions
            :options="question.options"
            :correct-meaning="question.correctMeaning"
            :selected-meaning="selectedMeaning"
            :answer-state="answerState"
            @select="onSelect"
          />
        </div>

        <div
          v-if="answerState !== 'idle'"
          class="mt-5 animate-[fadeIn_0.3s_ease-out] text-center"
        >
          <p
            class="text-lg font-bold"
            :class="
              answerState === 'correct'
                ? 'text-[var(--color-correct)]'
                : 'text-[var(--color-wrong)]'
            "
          >
            {{ feedbackMessage }}
          </p>

          <MemoryTip
            v-if="showMemoryTip && question.item.memory_tip"
            :word="question.item.word"
            :meaning="question.item.meaning"
            :tip="question.item.memory_tip"
          />

          <button
            type="button"
            class="mt-6 w-full rounded-2xl bg-[var(--color-accent)] px-6 py-3.5 text-base font-bold text-white shadow-sm transition hover:bg-teal-700 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2"
            @click="onNext"
          >
            {{ currentIndex >= total - 1 ? 'Xem kết quả' : 'Tiếp theo' }}
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.card-enter-active,
.card-leave-active {
  transition:
    opacity 0.28s ease,
    transform 0.28s ease;
}

.card-enter-from {
  opacity: 0;
  transform: translateY(12px);
}

.card-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
