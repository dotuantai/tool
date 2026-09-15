<script setup lang="ts">
import { computed, nextTick, onUnmounted, ref } from 'vue'
import { katakanaData, type KatakanaCharacter } from '@/data/katakana'

type AnswerState = 'idle' | 'correct' | 'incorrect'
type CardRange = 'all' | 'first15' | 'mid15' | 'last16'

interface FlashcardItem extends KatakanaCharacter {
  isReview: boolean
  isCompleted: boolean
}

const selectedRange = ref<CardRange>('all')
const isShuffleEnabled = ref(false)
const cards = ref<FlashcardItem[]>(katakanaData.map(item => ({ ...item, isReview: false, isCompleted: false })))
const currentIndex = ref(0)
const isFlipped = ref(false)
const answer = ref('')
const answerState = ref<AnswerState>('idle')
const correctCount = ref(0)
const checkedCount = ref(0)
const answerInput = ref<HTMLInputElement | null>(null)
const initialCardCount = ref(katakanaData.length)
let autoAdvanceTimer: ReturnType<typeof setTimeout> | undefined

const isFinished = computed(() => currentIndex.value >= cards.value.length)
const incorrectCount = computed(() => checkedCount.value - correctCount.value)
const accuracy = computed(() =>
  checkedCount.value === 0 ? 0 : Math.round((correctCount.value / checkedCount.value) * 100),
)

const currentCard = computed<FlashcardItem>(() =>
  cards.value[currentIndex.value] ?? { ...katakanaData[0]!, isReview: false, isCompleted: false },
)
const progress = computed(() => {
  if (isFinished.value) return 100
  return cards.value.length === 0 ? 0 : (currentIndex.value / cards.value.length) * 100
})
const normalizedAnswer = computed(() => answer.value.trim().toLowerCase())

const rangeOptions: { value: CardRange; label: string; sub: string }[] = [
  { value: 'all',     label: 'Tất cả 46', sub: 'ア - ン' },
  { value: 'first15', label: '15 chữ đầu', sub: 'ア - ソ' },
  { value: 'mid15',   label: '15 chữ tiếp', sub: 'タ - ホ' },
  { value: 'last16',  label: '16 chữ cuối', sub: 'マ - ン' },
]

function getRangeCards(range: CardRange): FlashcardItem[] {
  let rangeData: KatakanaCharacter[]
  switch (range) {
    case 'first15': rangeData = katakanaData.slice(0, 15);  break
    case 'mid15':   rangeData = katakanaData.slice(15, 30); break
    case 'last16':  rangeData = katakanaData.slice(30, 46); break
    default:        rangeData = katakanaData
  }
  return rangeData.map(item => ({ ...item, isReview: false, isCompleted: false }))
}

function resetCard() {
  if (autoAdvanceTimer !== undefined) {
    clearTimeout(autoAdvanceTimer)
    autoAdvanceTimer = undefined
  }
  isFlipped.value = false
  answer.value = ''
  answerState.value = 'idle'
  void nextTick(() => answerInput.value?.focus())
}

function flipCard() {
  isFlipped.value = !isFlipped.value
}

function checkAnswer() {
  if (isFinished.value) return
  if (answerState.value === 'incorrect') { nextCard(); return }
  if (!normalizedAnswer.value || answerState.value !== 'idle') return

  if (normalizedAnswer.value === currentCard.value.romaji.toLowerCase()) {
    answerState.value = 'correct'
    if (!currentCard.value.isReview && !currentCard.value.isCompleted) {
      checkedCount.value += 1
      correctCount.value += 1
    }
    autoAdvanceTimer = setTimeout(() => nextCard(), 500)
  } else {
    answerState.value = 'incorrect'
    if (!currentCard.value.isReview && !currentCard.value.isCompleted) {
      checkedCount.value += 1
    }
    if (!currentCard.value.isCompleted) scheduleReview(currentCard.value)
  }
  currentCard.value.isCompleted = true
  answerInput.value?.focus({ preventScroll: true })
}

function goToCard(index: number) {
  currentIndex.value = Math.max(0, Math.min(index, cards.value.length))
  resetCard()
}

function nextCard() {
  if (isFinished.value || answerState.value === 'idle') return
  goToCard(currentIndex.value + 1)
}

function previousCard() {
  if (isFinished.value || currentIndex.value === 0) return
  goToCard(currentIndex.value - 1)
}

function scheduleReview(card: FlashcardItem) {
  const reviewCard: FlashcardItem = { ...card, isReview: true, isCompleted: false }
  const reviewIndex = Math.min(currentIndex.value + 3, cards.value.length)
  cards.value.splice(reviewIndex, 0, reviewCard)
}

function startSession(shouldShuffle = isShuffleEnabled.value) {
  const nextCards = getRangeCards(selectedRange.value)
  if (shouldShuffle) {
    for (let i = nextCards.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1))
      const tmp = nextCards[i]!
      nextCards[i] = nextCards[j]!
      nextCards[j] = tmp
    }
  }
  cards.value = nextCards
  initialCardCount.value = nextCards.length
  currentIndex.value = 0
  correctCount.value = 0
  checkedCount.value = 0
  resetCard()
}

function changeRange(range: CardRange) {
  if (selectedRange.value === range) return
  selectedRange.value = range
  startSession()
}

function shuffleCards() {
  isShuffleEnabled.value = !isShuffleEnabled.value
  startSession()
}

onUnmounted(() => {
  if (autoAdvanceTimer !== undefined) clearTimeout(autoAdvanceTimer)
})
</script>

<template>
  <main class="flashcard-page">
    <header class="top-bar">
      <a href="#/" class="back-button ios-pressable" aria-label="Quay lại menu">
        <span aria-hidden="true">←</span>
        <span>Menu</span>
      </a>

      <div class="title-badge">
        <span class="badge-dot"></span>
        <span>Katakana Flashcard</span>
      </div>

      <button
        type="button"
        class="shuffle-button ios-pressable"
        :class="{ 'shuffle-active': isShuffleEnabled }"
        :aria-label="isShuffleEnabled ? 'Tắt xáo trộn' : 'Bật xáo trộn'"
        :aria-pressed="isShuffleEnabled"
        @click="shuffleCards"
      >
        <span aria-hidden="true">↝</span>
      </button>
    </header>

    <section class="range-selector ios-card" aria-label="Chọn phần chữ Katakana">
      <button
        v-for="option in rangeOptions"
        :key="option.value"
        type="button"
        class="range-button ios-pressable"
        :class="{ 'range-active': selectedRange === option.value }"
        @click="changeRange(option.value)"
      >
        <span class="range-title">{{ option.label }}</span>
        <span class="range-subtitle">{{ option.sub }}</span>
      </button>
    </section>

    <section class="progress-section" aria-label="Tiến độ học">
      <div class="progress-copy">
        <span v-if="!isFinished">Thẻ {{ currentIndex + 1 }} / {{ cards.length }}</span>
        <span v-else>Đã hoàn thành</span>
        <span>Đúng {{ correctCount }} / {{ checkedCount }}</span>
      </div>
      <div class="progress-track">
        <div class="progress-fill" :style="{ width: `${progress}%` }"></div>
      </div>
    </section>

    <section v-if="!isFinished" class="study-area">
      <div class="instruction">
        <span class="instruction-icon">✦</span>
        <div>
          <h1>Chữ này đọc như thế nào?</h1>
          <p>Chạm vào thẻ nếu bạn cần xem Romaji.</p>
        </div>
      </div>

      <button
        type="button"
        class="flip-card"
        :class="{ 'is-flipped': isFlipped }"
        :aria-label="isFlipped ? 'Ẩn đáp án Romaji' : 'Lật thẻ để xem Romaji'"
        @click="flipCard"
      >
        <span class="card-inner">
          <span class="card-face card-front">
            <span class="face-label">KATAKANA</span>
            <span class="katakana-character">{{ currentCard.character }}</span>
            <span class="flip-hint">Chạm để lật thẻ</span>
          </span>
          <span class="card-face card-back">
            <span class="face-label">ROMAJI</span>
            <span class="romaji-answer">{{ currentCard.romaji }}</span>
            <span class="back-character">{{ currentCard.character }}</span>
            <span class="flip-hint">Chạm để quay lại</span>
          </span>
        </span>
      </button>

      <form class="answer-form ios-card" @submit.prevent="checkAnswer">
        <label for="kata-romaji-answer">Nhập chữ cái Latin (Romaji)</label>
        <div class="answer-row">
          <input
            id="kata-romaji-answer"
            ref="answerInput"
            v-model="answer"
            type="text"
            inputmode="text"
            enterkeyhint="next"
            autocomplete="off"
            autocapitalize="none"
            spellcheck="false"
            :class="{
              'input-correct':   answerState === 'correct',
              'input-incorrect': answerState === 'incorrect',
            }"
            @keydown.enter.prevent="checkAnswer"
          />
          <button
            v-if="answerState === 'idle'"
            type="submit"
            class="check-button ios-pressable"
            :disabled="!normalizedAnswer"
          >Kiểm tra</button>
          <button
            v-else-if="answerState === 'incorrect'"
            type="button"
            class="next-button ios-pressable"
            @click="nextCard"
          >{{ currentIndex >= cards.length - 1 ? 'Xem kết quả' : 'Tiếp theo →' }}</button>
          <span v-else class="auto-advance-status">Đang chuyển…</span>
        </div>

        <div class="feedback" aria-live="polite">
          <p v-if="answerState === 'correct'" class="feedback-correct">
            <span>✓</span> Chính xác! <strong>{{ currentCard.character }} = {{ currentCard.romaji }}</strong>
          </p>
          <p v-else-if="answerState === 'incorrect'" class="feedback-incorrect">
            <span>×</span> Chưa đúng. Đáp án là <strong>{{ currentCard.romaji }}</strong>.
          </p>
          <p v-else class="feedback-idle">Nhấn Enter hoặc nút "Kiểm tra" để trả lời.</p>
        </div>
      </form>
    </section>

    <section v-else class="result-box ios-card" aria-live="polite">
      <div class="result-icon">{{ accuracy >= 80 ? '🏆' : accuracy >= 50 ? '🌟' : '💪' }}</div>
      <h1>Hoàn thành!</h1>
      <p>Bạn đã học xong {{ initialCardCount }} chữ Katakana và nhập lại tất cả các chữ trả lời sai.</p>
      <div class="result-stats">
        <div><strong>{{ correctCount }}</strong><span>Đúng lần đầu</span></div>
        <div><strong>{{ incorrectCount }}</strong><span>Sai lần đầu</span></div>
        <div><strong>{{ accuracy }}%</strong><span>Chính xác</span></div>
      </div>
      <button type="button" class="restart-button ios-pressable" @click="startSession()">Học lại</button>
    </section>

    <nav v-if="!isFinished" class="card-navigation" aria-label="Điều hướng flashcard">
      <button
        type="button"
        class="nav-button ios-pressable"
        :disabled="currentIndex === 0"
        @click="previousCard"
      >← Thẻ trước</button>
      <button
        type="button"
        class="nav-button nav-primary ios-pressable"
        :disabled="answerState === 'idle'"
        @click="nextCard"
      >{{ currentIndex >= cards.length - 1 ? 'Xem kết quả' : 'Thẻ sau →' }}</button>
    </nav>
  </main>
</template>

<style scoped>
.flashcard-page {
  width: 100%;
  max-width: 480px;
  min-height: 100dvh;
  margin: 0 auto;
  padding: calc(var(--sat) + 0.85rem) 1rem calc(var(--sab) + 1rem);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* ── Top Bar ── */
.top-bar {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 0.65rem;
}

.back-button,
.shuffle-button {
  height: 40px;
  border: 1px solid rgba(255,255,255,0.9);
  background: rgba(255,255,255,0.86);
  color: var(--color-ink);
  box-shadow: 0 2px 8px rgba(15,23,42,0.05);
}

.back-button {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0 0.75rem;
  border-radius: 999px;
  text-decoration: none;
  font-size: 0.8rem;
  font-weight: 800;
}

.shuffle-button {
  position: relative;
  width: 40px;
  border-radius: 50%;
  font-family: inherit;
  font-size: 1.25rem;
  font-weight: 900;
  cursor: pointer;
  transition: color 180ms ease, background 180ms ease, border-color 180ms ease, box-shadow 180ms ease;
}

.shuffle-button span { display: inline-block; transition: transform 220ms ease; }

.shuffle-button.shuffle-active {
  border-color: #0e7490;
  background: linear-gradient(145deg, #0e7490, #06b6d4);
  color: #fff;
  box-shadow: 0 4px 12px rgba(14,116,144,0.38);
}

.shuffle-button.shuffle-active span { transform: rotate(180deg); }

.shuffle-button.shuffle-active::after {
  content: '';
  position: absolute;
  right: -1px;
  bottom: -1px;
  width: 10px;
  height: 10px;
  border: 2px solid #fff;
  border-radius: 50%;
  background: #22c55e;
}

.title-badge {
  justify-self: center;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 0.7rem;
  border: 1px solid #a5f3fc;
  border-radius: 999px;
  background: rgba(236,254,255,0.9);
  color: #0e7490;
  font-size: 0.72rem;
  font-weight: 800;
  white-space: nowrap;
}

.badge-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: #06b6d4;
}

/* ── Range Selector ── */
.range-selector {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.3rem;
  padding: 0.4rem;
  border-radius: 16px;
}

.range-button {
  min-width: 0;
  padding: 0.42rem 0.15rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.08rem;
  border: 1.5px solid transparent;
  border-radius: 11px;
  background: transparent;
  color: #475569;
  font-family: inherit;
  cursor: pointer;
}

.range-title  { font-size: 0.66rem; font-weight: 900; white-space: nowrap; }
.range-subtitle { color: #94a3b8; font-size: 0.57rem; font-weight: 800; }

.range-button.range-active {
  border-color: #0e7490;
  background: linear-gradient(145deg, #0e7490, #06b6d4);
  color: #fff;
  box-shadow: 0 3px 8px rgba(14,116,144,0.28);
}

.range-active .range-subtitle { color: #cffafe; }

/* ── Progress ── */
.progress-section { display: flex; flex-direction: column; gap: 0.45rem; }

.progress-copy {
  display: flex;
  justify-content: space-between;
  color: var(--color-muted);
  font-size: 0.72rem;
  font-weight: 800;
}

.progress-track {
  height: 7px;
  overflow: hidden;
  border-radius: 999px;
  background: rgba(226,232,240,0.9);
}

.progress-fill {
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #0e7490, #38bdf8);
  transition: width 0.3s ease;
}

/* ── Study Area ── */
.study-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
}

.instruction { display: flex; align-items: center; gap: 0.65rem; }

.instruction-icon {
  width: 38px; height: 38px;
  display: grid; place-items: center;
  flex-shrink: 0;
  border-radius: 13px;
  background: #ecfeff;
  color: #0e7490;
}

.instruction h1 {
  margin: 0;
  font-family: 'Source Serif 4', serif;
  font-size: 1.25rem;
  line-height: 1.2;
}

.instruction p {
  margin: 0.2rem 0 0;
  color: var(--color-muted);
  font-size: 0.76rem;
}

/* ── Flip Card ── */
.flip-card {
  width: 100%;
  height: clamp(210px, 33dvh, 285px);
  padding: 0;
  border: none;
  border-radius: 30px;
  background: transparent;
  perspective: 1200px;
  cursor: pointer;
}

.card-inner {
  position: relative;
  display: block;
  width: 100%; height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.55s cubic-bezier(0.2, 0.75, 0.25, 1);
}

.is-flipped .card-inner { transform: rotateY(180deg); }

.card-face {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,0.92);
  border-radius: 30px;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  box-shadow: 0 20px 45px rgba(14,116,144,0.13);
}

.card-front {
  background: linear-gradient(145deg, rgba(255,255,255,0.96), rgba(236,254,255,0.95));
}

.card-back {
  transform: rotateY(180deg);
  background: linear-gradient(145deg, #0e7490, #06b6d4 55%, #0284c7);
  color: #fff;
}

.face-label {
  position: absolute;
  top: 1.15rem;
  font-size: 0.64rem;
  font-weight: 900;
  letter-spacing: 0.16em;
  opacity: 0.7;
}

.katakana-character {
  font-family: 'M PLUS Rounded 1c', sans-serif;
  font-size: clamp(6.5rem, 31vw, 9rem);
  font-weight: 900;
  line-height: 1;
  background: linear-gradient(145deg, #0e7490, #06b6d4);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.romaji-answer {
  font-size: clamp(3.5rem, 18vw, 5.5rem);
  font-weight: 900;
  line-height: 1;
  letter-spacing: -0.05em;
}

.back-character {
  margin-top: 0.4rem;
  font-family: 'M PLUS Rounded 1c', sans-serif;
  font-size: 1.45rem;
  opacity: 0.75;
}

.flip-hint {
  position: absolute;
  bottom: 1rem;
  font-size: 0.7rem;
  font-weight: 700;
  opacity: 0.62;
}

/* ── Answer Form ── */
.answer-form { padding: 0.9rem; border-radius: 20px; }

.answer-form label {
  display: block;
  margin-bottom: 0.5rem;
  color: #475569;
  font-size: 0.74rem;
  font-weight: 800;
}

.answer-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 0.55rem;
}

.answer-row input {
  width: 100%;
  min-width: 0;
  height: 48px;
  padding: 0 0.9rem;
  border: 2px solid #e2e8f0;
  border-radius: 14px;
  outline: none;
  background: #fff;
  color: var(--color-ink);
  font-family: inherit;
  font-size: 1rem;
  font-weight: 800;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.answer-row input:focus {
  border-color: #06b6d4;
  box-shadow: 0 0 0 4px rgba(6,182,212,0.12);
}

.answer-row input.input-correct  { border-color: #10b981; background: #ecfdf5; color: #047857; }
.answer-row input.input-incorrect { border-color: #f43f5e; background: #fff1f2; color: #be123c; }

.check-button,
.next-button {
  min-width: 105px;
  height: 48px;
  padding: 0 0.9rem;
  border: none;
  border-radius: 14px;
  color: #fff;
  font-family: inherit;
  font-size: 0.78rem;
  font-weight: 900;
  cursor: pointer;
}

.check-button {
  background: linear-gradient(135deg, #0e7490, #06b6d4);
  box-shadow: 0 5px 14px rgba(14,116,144,0.3);
}

.check-button:disabled { cursor: not-allowed; opacity: 0.4; box-shadow: none; }

.next-button { background: linear-gradient(135deg, #059669, #10b981); }

.auto-advance-status {
  align-self: center;
  color: #047857;
  font-size: 0.72rem;
  font-weight: 800;
  text-align: center;
}

.feedback { min-height: 21px; margin-top: 0.55rem; }

.feedback p { margin: 0; font-size: 0.72rem; font-weight: 700; }

.feedback-idle      { color: #94a3b8; }
.feedback-correct   { color: #047857; }
.feedback-incorrect { color: #be123c; }

.feedback p span {
  display: inline-grid;
  width: 18px; height: 18px;
  place-items: center;
  margin-right: 0.25rem;
  border-radius: 50%;
  background: currentColor;
  color: white;
}

/* ── Navigation ── */
.card-navigation {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.65rem;
}

.nav-button {
  min-height: 46px;
  border: 1.5px solid #e2e8f0;
  border-radius: 15px;
  background: rgba(255,255,255,0.82);
  color: #475569;
  font-family: inherit;
  font-size: 0.78rem;
  font-weight: 800;
  cursor: pointer;
}

.nav-primary {
  border-color: #a5f3fc;
  background: #ecfeff;
  color: #0e7490;
}

.nav-button:disabled { cursor: not-allowed; opacity: 0.45; }

/* ── Result ── */
.result-box { padding: 2rem 1.25rem; text-align: center; }

.result-icon { font-size: 3.25rem; }

.result-box h1 { margin: 0.6rem 0 0.35rem; color: #0e7490; font-size: 1.65rem; }

.result-box > p {
  margin: 0 auto 1.4rem;
  max-width: 360px;
  color: #64748b;
  font-size: 0.85rem;
  line-height: 1.55;
}

.result-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.55rem;
  margin-bottom: 1.35rem;
}

.result-stats div { padding: 0.75rem 0.25rem; border-radius: 14px; background: #ecfeff; }

.result-stats strong,
.result-stats span { display: block; }

.result-stats strong { color: #0e7490; font-size: 1.2rem; }
.result-stats span   { margin-top: 0.2rem; color: #64748b; font-size: 0.65rem; font-weight: 700; }

.restart-button {
  width: 100%;
  min-height: 50px;
  padding: 0 1.5rem;
  border: none;
  border-radius: 18px;
  background: linear-gradient(135deg, #0e7490, #06b6d4);
  color: #fff;
  font-family: inherit;
  font-size: 0.95rem;
  font-weight: 900;
  cursor: pointer;
  box-shadow: 0 8px 20px rgba(14,116,144,0.32);
}

/* ── iOS Helpers ── */
.ios-pressable { transition: transform 0.12s ease, opacity 0.12s ease; }
.ios-pressable:active { transform: scale(0.95); opacity: 0.85; }

.ios-card {
  background: rgba(255,255,255,0.88);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255,255,255,0.9);
  box-shadow: 0 8px 32px rgba(15,23,42,0.06), 0 2px 8px rgba(15,23,42,0.03);
}
</style>
