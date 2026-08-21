<script setup lang="ts">
import { computed, ref } from 'vue'
import { hiraganaData, type HiraganaCharacter } from '@/data/hiragana'

// ── Types ──────────────────────────────────────────────────────────────────
type QuizMode = 'char-to-romaji' | 'romaji-to-char' | 'random'
type AnswerState = 'idle' | 'correct' | 'incorrect'

interface HiraQuestion {
  item: HiraganaCharacter
  mode: 'char-to-romaji' | 'romaji-to-char'
  options: string[]
  correct: string
}

// ── Helpers ─────────────────────────────────────────────────────────────────
function shuffle<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = arr[i]!
    arr[i] = arr[j]!
    arr[j] = temp
  }
  return arr
}


function buildOptions(item: HiraganaCharacter, mode: 'char-to-romaji' | 'romaji-to-char'): string[] {
  const correct = mode === 'char-to-romaji' ? item.romaji : item.character
  const pool = hiraganaData.filter(h => h.character !== item.character)
  shuffle(pool)
  const distractors = pool.slice(0, 3).map(h =>
    mode === 'char-to-romaji' ? h.romaji : h.character
  )
  return shuffle([correct, ...distractors])
}

function resolveMode(selected: QuizMode): 'char-to-romaji' | 'romaji-to-char' {
  if (selected === 'random') return Math.random() < 0.5 ? 'char-to-romaji' : 'romaji-to-char'
  return selected
}

function makeQuestion(item: HiraganaCharacter, selected: QuizMode): HiraQuestion {
  const mode = resolveMode(selected)
  return {
    item,
    mode,
    options: buildOptions(item, mode),
    correct: mode === 'char-to-romaji' ? item.romaji : item.character,
  }
}

function buildQuiz(selected: QuizMode): HiraQuestion[] {
  return shuffle([...hiraganaData]).map(item => makeQuestion(item, selected))
}

// ── State ────────────────────────────────────────────────────────────────────
const quizMode    = ref<QuizMode>('random')
const quizOrder   = ref<HiraQuestion[]>([])
const currentIdx  = ref(0)
const answerState = ref<AnswerState>('idle')
const selected    = ref<string | null>(null)
const score       = ref({ correct: 0, incorrect: 0 })
const isFinished  = ref(false)
const cardKey     = ref(0)

const modeOptions: { value: QuizMode; label: string; icon: string }[] = [
  { value: 'char-to-romaji', label: 'あ → Romaji', icon: '🇯🇵' },
  { value: 'romaji-to-char', label: 'Romaji → あ', icon: '🇻🇳' },
  { value: 'random',         label: 'Lộn xộn',     icon: '🔀' },
]

// ── Derived ──────────────────────────────────────────────────────────────────
const total    = computed(() => quizOrder.value.length)
const question = computed(() => quizOrder.value[currentIdx.value] ?? null)
const progress = computed(() => {
  if (isFinished.value) return total.value
  return answerState.value === 'idle' ? currentIdx.value : currentIdx.value + 1
})
const accuracy = computed(() => {
  const done = score.value.correct + score.value.incorrect
  return done === 0 ? 0 : Math.round((score.value.correct / done) * 100)
})

// ── Actions ──────────────────────────────────────────────────────────────────
function startQuiz() {
  quizOrder.value   = buildQuiz(quizMode.value)
  currentIdx.value  = 0
  answerState.value = 'idle'
  selected.value    = null
  score.value       = { correct: 0, incorrect: 0 }
  isFinished.value  = false
  cardKey.value     = 0
}

function onModeChange(mode: QuizMode) {
  if (quizMode.value === mode) return
  quizMode.value = mode
  startQuiz()
}

function onSelect(option: string) {
  if (answerState.value !== 'idle' || !question.value) return
  selected.value = option
  if (option === question.value.correct) {
    answerState.value = 'correct'
    score.value = { ...score.value, correct: score.value.correct + 1 }
  } else {
    answerState.value = 'incorrect'
    score.value = { ...score.value, incorrect: score.value.incorrect + 1 }
  }
}

function onNext() {
  if (currentIdx.value >= total.value - 1) {
    isFinished.value = true
    return
  }
  currentIdx.value++
  answerState.value = 'idle'
  selected.value    = null
  cardKey.value++
}

startQuiz()
</script>

<template>
  <div class="mobile-quiz-wrapper">
    <!-- Top Navigation Bar -->
    <div class="top-nav">
      <a href="#/" class="back-pill ios-pressable">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
        <span>Menu</span>
      </a>

      <div class="quiz-title-badge">
        <span class="badge-dot"></span>
        <span>Hiragana Quiz</span>
      </div>

      <div class="counter-badge">
        {{ progress }}/{{ total }}
      </div>
    </div>

    <!-- Mode Selector (iOS Segmented Control) -->
    <div class="segmented-control">
      <button
        v-for="opt in modeOptions"
        :key="opt.value"
        type="button"
        class="segment-tab"
        :class="{ 'segment-active': quizMode === opt.value }"
        @click="onModeChange(opt.value)"
      >
        <span class="segment-icon">{{ opt.icon }}</span>
        <span class="segment-text">{{ opt.label }}</span>
      </button>
    </div>

    <!-- Progress Line -->
    <div class="progress-bar-container" v-if="total > 0 && !isFinished">
      <div class="progress-line-track">
        <div class="progress-line-fill" :style="{ width: `${(progress / total) * 100}%` }"></div>
      </div>
    </div>

    <!-- RESULT SCREEN -->
    <div v-if="isFinished" class="result-box ios-card">
      <div class="result-sparkle">
        {{ accuracy >= 80 ? '🏆' : accuracy >= 50 ? '🌟' : '💪' }}
      </div>
      <h2 class="result-headline">
        {{ accuracy >= 80 ? 'Xuất Sắc!' : accuracy >= 50 ? 'Làm Tốt Lắm!' : 'Cố Gắng Thêm Nhé!' }}
      </h2>
      <p class="result-desc">Bạn đã hoàn thành {{ total }} ký tự Hiragana</p>

      <div class="stats-row">
        <div class="stat-pill correct-pill">
          <span class="stat-digit">{{ score.correct }}</span>
          <span class="stat-tag">Đúng</span>
        </div>
        <div class="stat-pill incorrect-pill">
          <span class="stat-digit">{{ score.incorrect }}</span>
          <span class="stat-tag">Sai</span>
        </div>
        <div class="stat-pill acc-pill">
          <span class="stat-digit">{{ accuracy }}%</span>
          <span class="stat-tag">Chính xác</span>
        </div>
      </div>

      <button class="primary-btn restart-action ios-pressable" @click="startQuiz">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
        </svg>
        Luyện Tập Lại
      </button>
    </div>

    <!-- QUESTION CARD -->
    <Transition v-else-if="question" name="card" mode="out-in">
      <div :key="cardKey" class="quiz-card ios-card">
        <!-- Question Header Badge -->
        <div class="card-top-info">
          <span class="direction-badge" :class="question.mode === 'char-to-romaji' ? 'dir-char' : 'dir-roma'">
            {{ question.mode === 'char-to-romaji' ? '🇯🇵 Nhìn chữ → Chọn Romaji' : '🇻🇳 Nhìn Romaji → Chọn chữ' }}
          </span>
        </div>

        <!-- Big Prompt Display -->
        <div class="prompt-box">
          <span
            class="main-prompt"
            :class="question.mode === 'char-to-romaji' ? 'prompt-kana' : 'prompt-latin'"
          >
            {{ question.mode === 'char-to-romaji' ? question.item.character : question.item.romaji }}
          </span>
        </div>

        <p class="select-hint">Chọn 1 trong 4 đáp án:</p>

        <!-- 4 Options Grid (2x2 touch optimized) -->
        <div class="options-container">
          <button
            v-for="opt in question.options"
            :key="opt"
            type="button"
            class="choice-btn ios-pressable"
            :class="{
              'choice-correct':  answerState !== 'idle' && opt === question.correct,
              'choice-wrong':    answerState !== 'idle' && opt === selected && opt !== question.correct,
              'choice-dimmed':   answerState !== 'idle' && opt !== selected && opt !== question.correct,
              'choice-kana':     question.mode === 'romaji-to-char',
            }"
            :disabled="answerState !== 'idle'"
            @click="onSelect(opt)"
          >
            {{ opt }}
          </button>
        </div>

        <!-- Bottom Feedback Floating Bar -->
        <Transition name="feedback">
          <div v-if="answerState !== 'idle'" class="feedback-panel">
            <div class="feedback-status">
              <span v-if="answerState === 'correct'" class="status-icon-correct">✓</span>
              <span v-else class="status-icon-wrong">✕</span>
              <div class="status-text">
                <p v-if="answerState === 'correct'" class="status-title correct-title">Chính xác!</p>
                <p v-else class="status-title wrong-title">
                  Đáp án đúng: <span class="highlight-ans">{{ question.correct }}</span>
                </p>
              </div>
            </div>
            
            <button type="button" class="primary-btn next-action ios-pressable" @click="onNext">
              <span>{{ currentIdx >= total - 1 ? 'Xem kết quả' : 'Tiếp theo' }}</span>
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
.mobile-quiz-wrapper {
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

.quiz-title-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.78rem;
  font-weight: 800;
  color: #7e22ce;
  background: rgba(250, 245, 255, 0.8);
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  border: 1px solid rgba(233, 213, 255, 0.8);
}

.badge-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #a855f7;
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

/* ── Segmented Control (iOS Style) ── */
.segmented-control {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4px;
  padding: 4px;
  background: rgba(226, 232, 240, 0.7);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.6);
}

.segment-tab {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
  padding: 0.55rem 0.25rem;
  border: none;
  background: transparent;
  border-radius: 12px;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  user-select: none;
  -webkit-user-select: none;
}

.segment-icon {
  font-size: 0.8rem;
}

.segment-text {
  font-size: 0.72rem;
  font-weight: 700;
  color: #64748b;
  white-space: nowrap;
}

.segment-active {
  background: #ffffff;
  box-shadow: 0 3px 10px rgba(15, 23, 42, 0.08), 0 1px 2px rgba(15, 23, 42, 0.04);
}

.segment-active .segment-text {
  color: #7e22ce;
  font-weight: 800;
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
  background: linear-gradient(90deg, #9333ea, #ec4899);
  transition: width 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

/* ── Question Card ── */
.quiz-card {
  border-radius: 28px;
  padding: 1.5rem 1.25rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: relative;
  overflow: hidden;
}

.card-top-info {
  display: flex;
  justify-content: center;
}

.direction-badge {
  font-size: 0.72rem;
  font-weight: 800;
  padding: 0.3rem 0.85rem;
  border-radius: 999px;
  letter-spacing: 0.02em;
}

.dir-char {
  background: #faf5ff;
  color: #7e22ce;
  border: 1px solid #f3e8ff;
}

.dir-roma {
  background: #eff6ff;
  color: #1d4ed8;
  border: 1px solid #dbeafe;
}

/* ── Big Prompt Box ── */
.prompt-box {
  background: linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%);
  border-radius: 20px;
  border: 1px solid rgba(226, 232, 240, 0.8);
  padding: 1.25rem 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 130px;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.02);
}

.main-prompt {
  line-height: 1;
  font-weight: 900;
}

.prompt-kana {
  font-size: clamp(4.5rem, 18vw, 5.5rem);
  font-family: 'M PLUS Rounded 1c', sans-serif;
  background: linear-gradient(145deg, #6b21a8 0%, #a855f7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.prompt-latin {
  font-size: clamp(2.5rem, 10vw, 3.25rem);
  letter-spacing: 0.05em;
  color: #1e40af;
}

.select-hint {
  font-size: 0.76rem;
  font-weight: 700;
  color: var(--color-muted);
  text-align: center;
  margin: -0.25rem 0 0;
}

/* ── Options 2x2 ── */
.options-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.65rem;
}

.choice-btn {
  min-height: 56px;
  padding: 0.75rem 0.5rem;
  border-radius: 18px;
  border: 2px solid #e2e8f0;
  background: #ffffff;
  font-family: inherit;
  font-size: 1.15rem;
  font-weight: 800;
  color: var(--color-ink);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 6px rgba(15, 23, 42, 0.02);
}

.choice-kana {
  font-family: 'M PLUS Rounded 1c', sans-serif;
  font-size: 1.65rem;
}

.choice-correct {
  background: #ecfdf5 !important;
  border-color: #10b981 !important;
  color: #047857 !important;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.15) !important;
}

.choice-wrong {
  background: #fff1f2 !important;
  border-color: #f43f5e !important;
  color: #be123c !important;
  box-shadow: 0 4px 12px rgba(244, 63, 94, 0.15) !important;
}

.choice-dimmed {
  opacity: 0.35;
  cursor: not-allowed;
}

/* ── Feedback Panel ── */
.feedback-panel {
  margin-top: 0.25rem;
  padding-top: 0.85rem;
  border-top: 1px solid rgba(226, 232, 240, 0.8);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) both;
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

.status-text {
  flex: 1;
}

.status-title {
  margin: 0;
  font-size: 0.9rem;
  font-weight: 800;
}

.correct-title {
  color: #047857;
}

.wrong-title {
  color: #be123c;
}

.highlight-ans {
  font-family: 'M PLUS Rounded 1c', sans-serif;
  font-size: 1.1rem;
  background: #f1f5f9;
  padding: 0.1rem 0.4rem;
  border-radius: 6px;
  color: var(--color-ink);
}

/* ── Action Buttons ── */
.primary-btn {
  width: 100%;
  min-height: 52px;
  border-radius: 18px;
  border: none;
  background: linear-gradient(135deg, #9333ea 0%, #ec4899 100%);
  color: #ffffff;
  font-family: inherit;
  font-size: 0.95rem;
  font-weight: 800;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  box-shadow: 0 6px 20px rgba(147, 51, 234, 0.35);
}

/* ── Result Box ── */
.result-box {
  border-radius: 28px;
  padding: 2.25rem 1.5rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  animation: fadeUp 0.45s cubic-bezier(0.16, 1, 0.3, 1) both;
}

.result-sparkle {
  font-size: 3.5rem;
  line-height: 1;
}

.result-headline {
  font-family: 'Source Serif 4', serif;
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--color-ink);
  margin: 0;
}

.result-desc {
  font-size: 0.85rem;
  color: var(--color-muted);
  margin: -0.5rem 0 0.25rem;
}

.stats-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  width: 100%;
}

.stat-pill {
  padding: 0.85rem 0.35rem;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.15rem;
}

.correct-pill { background: #ecfdf5; }
.incorrect-pill { background: #fff1f2; }
.acc-pill { background: #faf5ff; }

.stat-digit {
  font-size: 1.4rem;
  font-weight: 900;
  color: var(--color-ink);
  line-height: 1;
}

.stat-tag {
  font-size: 0.65rem;
  font-weight: 800;
  color: var(--color-muted);
  text-transform: uppercase;
}

.restart-action {
  margin-top: 0.5rem;
}

/* ── Animations ── */
.card-enter-active, .card-leave-active {
  transition: opacity 0.22s ease, transform 0.22s cubic-bezier(0.4, 0, 0.2, 1);
}
.card-enter-from { opacity: 0; transform: translateY(12px) scale(0.98); }
.card-leave-to   { opacity: 0; transform: translateY(-8px) scale(0.98); }

@keyframes slideUp {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}
</style>