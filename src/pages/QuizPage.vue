<script setup lang="ts">
import { computed, ref } from 'vue'
import AnswerOptions from '@/components/AnswerOptions.vue'
import MemoryTip from '@/components/MemoryTip.vue'
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
  <div class="mobile-quiz-page">
    <!-- Top Navigation Bar -->
    <div class="top-nav">
      <a href="#/" class="back-pill ios-pressable">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
        <span>Menu</span>
      </a>

      <div class="header-badge">
        <span class="badge-dot"></span>
        <span>Từ Vựng Tiếng Anh</span>
      </div>

      <div class="counter-badge">
        {{ completedCount }}/{{ total }}
      </div>
    </div>

    <!-- Progress Line -->
    <div class="progress-bar-container" v-if="total > 0 && !isFinished">
      <div class="progress-line-track">
        <div class="progress-line-fill" :style="{ width: `${(completedCount / total) * 100}%` }"></div>
      </div>
    </div>

    <!-- Result Screen -->
    <ResultScreen
      v-if="isFinished"
      :score="score"
      :total="total"
      @restart="startQuiz"
    />

    <!-- Question Card -->
    <Transition
      v-else-if="question"
      name="card"
      mode="out-in"
    >
      <div
        :key="cardKey"
        class="quiz-card ios-card"
      >
        <WordCard
          :word="question.item.word"
          :pronunciation="question.item.pronunciation"
          :question-number="currentIndex + 1"
          :total="total"
        />

        <div class="mt-4">
          <AnswerOptions
            :options="question.options"
            :correct-meaning="question.correctMeaning"
            :selected-meaning="selectedMeaning"
            :answer-state="answerState"
            @select="onSelect"
          />
        </div>

        <!-- Feedback & Next Action -->
        <Transition name="fade">
          <div
            v-if="answerState !== 'idle'"
            class="feedback-panel"
          >
            <div class="feedback-status">
              <span v-if="answerState === 'correct'" class="status-icon-correct">✓</span>
              <span v-else class="status-icon-wrong">✕</span>
              <p
                class="status-title"
                :class="answerState === 'correct' ? 'text-emerald-700' : 'text-rose-700'"
              >
                {{ feedbackMessage }}
              </p>
            </div>

            <MemoryTip
              v-if="showMemoryTip && question.item.memory_tip"
              :word="question.item.word"
              :meaning="question.item.meaning"
              :tip="question.item.memory_tip"
            />

            <button
              type="button"
              class="primary-btn ios-pressable mt-2"
              @click="onNext"
            >
              <span>{{ currentIndex >= total - 1 ? 'Xem kết quả' : 'Câu tiếp theo' }}</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </div>
        </Transition>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.mobile-quiz-page {
  min-height: 100dvh;
  max-width: 480px;
  margin: 0 auto;
  padding: calc(var(--sat) + 0.85rem) 1rem calc(var(--sab) + 1.25rem);
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  box-sizing: border-box;
}

/* ── Top Bar ── */
.top-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}

.back-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--color-ink);
  text-decoration: none;
  padding: 0.45rem 0.85rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.9);
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04);
}

.header-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.78rem;
  font-weight: 800;
  color: #0284c7;
  background: rgba(240, 249, 255, 0.8);
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  border: 1px solid rgba(186, 230, 253, 0.8);
}

.badge-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #0284c7;
}

.counter-badge {
  font-size: 0.8rem;
  font-weight: 800;
  color: var(--color-muted);
  background: rgba(255, 255, 255, 0.85);
  padding: 0.4rem 0.75rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.9);
}

/* ── Progress Line ── */
.progress-bar-container {
  padding: 0 2px;
}

.progress-line-track {
  height: 6px;
  border-radius: 999px;
  background: rgba(226, 232, 240, 0.8);
  overflow: hidden;
}

.progress-line-fill {
  height: 100%;
  border-radius: 999px;
  background: linear-gradient(90deg, #0d9488, #0284c7);
  transition: width 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

/* ── Card ── */
.quiz-card {
  border-radius: 28px;
  padding: 1.5rem 1.25rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

/* ── Feedback Panel ── */
.feedback-panel {
  margin-top: 0.25rem;
  padding-top: 0.85rem;
  border-top: 1px solid rgba(226, 232, 240, 0.8);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.feedback-status {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.status-icon-correct {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #10b981;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  font-size: 0.85rem;
  flex-shrink: 0;
}

.status-icon-wrong {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #f43f5e;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  font-size: 0.85rem;
  flex-shrink: 0;
}

.status-title {
  margin: 0;
  font-size: 0.95rem;
  font-weight: 800;
}

.primary-btn {
  width: 100%;
  min-height: 52px;
  border-radius: 18px;
  border: none;
  background: linear-gradient(135deg, #0d9488 0%, #0284c7 100%);
  color: #ffffff;
  font-family: inherit;
  font-size: 0.95rem;
  font-weight: 800;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  box-shadow: 0 6px 20px rgba(13, 148, 136, 0.35);
}

.card-enter-active,
.card-leave-active {
  transition: opacity 0.22s ease, transform 0.22s cubic-bezier(0.4, 0, 0.2, 1);
}

.card-enter-from {
  opacity: 0;
  transform: translateY(12px) scale(0.98);
}

.card-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(0.98);
}
</style>

