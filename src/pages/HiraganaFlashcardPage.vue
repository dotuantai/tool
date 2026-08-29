<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'
import { hiraganaData, type HiraganaCharacter } from '@/data/hiragana'

type AnswerState = 'idle' | 'correct' | 'incorrect'

const cards = ref<HiraganaCharacter[]>([...hiraganaData])
const currentIndex = ref(0)
const isFlipped = ref(false)
const answer = ref('')
const answerState = ref<AnswerState>('idle')
const correctCount = ref(0)
const checkedCount = ref(0)
const answerInput = ref<HTMLInputElement | null>(null)

const currentCard = computed<HiraganaCharacter>(() =>
  cards.value[currentIndex.value] ?? hiraganaData[0]!,
)
const progress = computed(() => ((currentIndex.value + 1) / cards.value.length) * 100)
const normalizedAnswer = computed(() => answer.value.trim().toLowerCase())

function resetCard() {
  isFlipped.value = false
  answer.value = ''
  answerState.value = 'idle'
  void nextTick(() => answerInput.value?.focus())
}

function flipCard() {
  isFlipped.value = !isFlipped.value
}

function checkAnswer() {
  if (!normalizedAnswer.value || answerState.value !== 'idle') return

  checkedCount.value += 1
  if (normalizedAnswer.value === currentCard.value.romaji.toLowerCase()) {
    answerState.value = 'correct'
    correctCount.value += 1
  } else {
    answerState.value = 'incorrect'
  }
}

function goToCard(index: number) {
  const total = cards.value.length
  currentIndex.value = (index + total) % total
  resetCard()
}

function nextCard() {
  goToCard(currentIndex.value + 1)
}

function previousCard() {
  goToCard(currentIndex.value - 1)
}

function shuffleCards() {
  const shuffled = [...cards.value]
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1))
    const currentItem = shuffled[index]!
    shuffled[index] = shuffled[randomIndex]!
    shuffled[randomIndex] = currentItem
  }
  cards.value = shuffled
  currentIndex.value = 0
  resetCard()
}
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
        <span>Hiragana Flashcard</span>
      </div>

      <button type="button" class="shuffle-button ios-pressable" aria-label="Xáo trộn flashcard" @click="shuffleCards">
        ↝
      </button>
    </header>

    <section class="progress-section" aria-label="Tiến độ học">
      <div class="progress-copy">
        <span>Thẻ {{ currentIndex + 1 }} / {{ cards.length }}</span>
        <span>Đúng {{ correctCount }} / {{ checkedCount }}</span>
      </div>
      <div class="progress-track">
        <div class="progress-fill" :style="{ width: `${progress}%` }"></div>
      </div>
    </section>

    <section class="study-area">
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
        :aria-label="isFlipped ? 'Ẩn đáp án Romaji' : 'Lật thẻ để xem đáp án Romaji'"
        @click="flipCard"
      >
        <span class="card-inner">
          <span class="card-face card-front">
            <span class="face-label">HIRAGANA</span>
            <span class="hiragana-character">{{ currentCard.character }}</span>
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
        <label for="romaji-answer">Nhập chữ cái Latin (Romaji)</label>
        <div class="answer-row">
          <input
            id="romaji-answer"
            ref="answerInput"
            v-model="answer"
            type="text"
            inputmode="text"
            autocomplete="off"
            autocapitalize="none"
            spellcheck="false"
            :disabled="answerState !== 'idle'"
            :class="{
              'input-correct': answerState === 'correct',
              'input-incorrect': answerState === 'incorrect',
            }"
          />
          <button
            v-if="answerState === 'idle'"
            type="submit"
            class="check-button ios-pressable"
            :disabled="!normalizedAnswer"
          >
            Kiểm tra
          </button>
          <button v-else type="button" class="next-button ios-pressable" @click="nextCard">
            Tiếp theo →
          </button>
        </div>

        <div class="feedback" aria-live="polite">
          <p v-if="answerState === 'correct'" class="feedback-correct">
            <span>✓</span> Chính xác! <strong>{{ currentCard.character }} = {{ currentCard.romaji }}</strong>
          </p>
          <p v-else-if="answerState === 'incorrect'" class="feedback-incorrect">
            <span>×</span> Chưa đúng. Đáp án là <strong>{{ currentCard.romaji }}</strong>.
          </p>
          <p v-else class="feedback-idle">Nhấn Enter hoặc nút “Kiểm tra” để trả lời.</p>
        </div>
      </form>
    </section>

    <nav class="card-navigation" aria-label="Điều hướng flashcard">
      <button type="button" class="nav-button ios-pressable" @click="previousCard">← Thẻ trước</button>
      <button type="button" class="nav-button nav-primary ios-pressable" @click="nextCard">Thẻ sau →</button>
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

.top-bar {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 0.65rem;
}

.back-button,
.shuffle-button {
  height: 40px;
  border: 1px solid rgba(255, 255, 255, 0.9);
  background: rgba(255, 255, 255, 0.86);
  color: var(--color-ink);
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.05);
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
  width: 40px;
  border-radius: 50%;
  font-family: inherit;
  font-size: 1.25rem;
  font-weight: 900;
  cursor: pointer;
}

.title-badge {
  justify-self: center;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 0.7rem;
  border: 1px solid #e9d5ff;
  border-radius: 999px;
  background: rgba(250, 245, 255, 0.88);
  color: #7e22ce;
  font-size: 0.72rem;
  font-weight: 800;
  white-space: nowrap;
}

.badge-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #a855f7;
}

.progress-section {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

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
  background: rgba(226, 232, 240, 0.9);
}

.progress-fill {
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #7e22ce, #ec4899);
  transition: width 0.3s ease;
}

.study-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
}

.instruction {
  display: flex;
  align-items: center;
  gap: 0.65rem;
}

.instruction-icon {
  width: 38px;
  height: 38px;
  display: grid;
  place-items: center;
  flex-shrink: 0;
  border-radius: 13px;
  background: #f3e8ff;
  color: #9333ea;
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
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.55s cubic-bezier(0.2, 0.75, 0.25, 1);
}

.is-flipped .card-inner {
  transform: rotateY(180deg);
}

.card-face {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.92);
  border-radius: 30px;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  box-shadow: 0 20px 45px rgba(88, 28, 135, 0.13);
}

.card-front {
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.96), rgba(250, 245, 255, 0.95));
}

.card-back {
  transform: rotateY(180deg);
  background: linear-gradient(145deg, #7e22ce, #a855f7 58%, #db2777);
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

.hiragana-character {
  font-family: 'M PLUS Rounded 1c', sans-serif;
  font-size: clamp(6.5rem, 31vw, 9rem);
  font-weight: 900;
  line-height: 1;
  color: #7e22ce;
  text-shadow: 0 5px 18px rgba(126, 34, 206, 0.13);
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

.answer-form {
  padding: 0.9rem;
  border-radius: 20px;
}

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
  border-color: #a855f7;
  box-shadow: 0 0 0 4px rgba(168, 85, 247, 0.11);
}

.answer-row input.input-correct {
  border-color: #10b981;
  background: #ecfdf5;
  color: #047857;
}

.answer-row input.input-incorrect {
  border-color: #f43f5e;
  background: #fff1f2;
  color: #be123c;
}

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
  background: linear-gradient(135deg, #7e22ce, #a855f7);
  box-shadow: 0 5px 14px rgba(126, 34, 206, 0.27);
}

.check-button:disabled {
  cursor: not-allowed;
  opacity: 0.4;
  box-shadow: none;
}

.next-button {
  background: linear-gradient(135deg, #059669, #10b981);
}

.feedback {
  min-height: 21px;
  margin-top: 0.55rem;
}

.feedback p {
  margin: 0;
  font-size: 0.72rem;
  font-weight: 700;
}

.feedback-idle { color: #94a3b8; }
.feedback-correct { color: #047857; }
.feedback-incorrect { color: #be123c; }

.feedback p span {
  display: inline-grid;
  width: 18px;
  height: 18px;
  place-items: center;
  margin-right: 0.25rem;
  border-radius: 50%;
  background: currentColor;
  color: white;
}

.card-navigation {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.65rem;
}

.nav-button {
  min-height: 46px;
  border: 1.5px solid #e2e8f0;
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.82);
  color: #475569;
  font-family: inherit;
  font-size: 0.78rem;
  font-weight: 800;
  cursor: pointer;
}

.nav-primary {
  border-color: #e9d5ff;
  background: #faf5ff;
  color: #7e22ce;
}

@media (max-height: 720px) {
  .flashcard-page { gap: 0.7rem; }
  .study-area { gap: 0.7rem; }
  .flip-card { height: 190px; }
  .instruction p { display: none; }
  .hiragana-character { font-size: 6rem; }
}

@media (max-width: 370px) {
  .title-badge span:last-child { display: none; }
  .title-badge { padding: 0.55rem; }
  .answer-row { grid-template-columns: 1fr; }
  .check-button,
  .next-button { width: 100%; }
}

@media (prefers-reduced-motion: reduce) {
  .card-inner,
  .progress-fill { transition: none; }
}
</style>
