<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { hiraganaWritingData, type KanaWritingItem } from '@/data/hiraganaWriting'
import { katakanaWritingData } from '@/data/katakanaWriting'
import { speakJapaneseWord } from '@/utils/speakJapanese'
import WritingCanvas from '@/components/WritingCanvas.vue'
import CharacterGridModal from '@/components/CharacterGridModal.vue'

type AlphabetType = 'hiragana' | 'katakana'
type PracticeMode = 'guided' | 'blind'

const alphabet = ref<AlphabetType>('hiragana')
const practiceMode = ref<PracticeMode>('guided')
const currentIdx = ref(0)
const isModalOpen = ref(false)

// Canvas controls
const showGhost = ref(true)
const showGrid = ref(true)
const showStrokeOrder = ref(true)
const isRevealed = ref(false) // For blind test reveal

// Practiced tracker
const practicedHiragana = ref<Set<number>>(new Set())
const practicedKatakana = ref<Set<number>>(new Set())

// Canvas ref
const canvasComp = ref<InstanceType<typeof WritingCanvas> | null>(null)

// Toast feedback
const toastMessage = ref<string | null>(null)
let toastTimer: number | null = null

function showToast(msg: string) {
  toastMessage.value = msg
  if (toastTimer) clearTimeout(toastTimer)
  toastTimer = window.setTimeout(() => {
    toastMessage.value = null
  }, 2200)
}

const currentList = computed<KanaWritingItem[]>(() => {
  return alphabet.value === 'hiragana' ? hiraganaWritingData : katakanaWritingData
})

const currentItem = computed<KanaWritingItem>(() => {
  return currentList.value[currentIdx.value] ?? currentList.value[0]!
})

const practicedSet = computed(() => {
  return alphabet.value === 'hiragana' ? practicedHiragana.value : practicedKatakana.value
})

function switchAlphabet(type: AlphabetType) {
  if (alphabet.value === type) return
  alphabet.value = type
  currentIdx.value = 0
  isRevealed.value = false
}

function nextChar() {
  if (currentIdx.value < currentList.value.length - 1) {
    currentIdx.value++
  } else {
    currentIdx.value = 0
  }
  isRevealed.value = false
}

function prevChar() {
  if (currentIdx.value > 0) {
    currentIdx.value--
  } else {
    currentIdx.value = currentList.value.length - 1
  }
  isRevealed.value = false
}

function randomChar() {
  let next = Math.floor(Math.random() * currentList.value.length)
  if (next === currentIdx.value) {
    next = (next + 1) % currentList.value.length
  }
  currentIdx.value = next
  isRevealed.value = false
  showToast('🎲 Đã chọn chữ ngẫu nhiên!')
}

function playAudio() {
  speakJapaneseWord(currentItem.value.character, currentItem.value.romaji)
}

function playAnim() {
  canvasComp.value?.playStrokeAnimation()
}

function ratePractice(stars: number) {
  practicedSet.value.add(currentIdx.value)
  if (stars === 3) {
    showToast('🌟 Tuyệt vời! Nét chữ rất chuẩn!')
  } else if (stars === 2) {
    showToast('👍 Khá tốt! Đã lưu tiến độ.')
  } else {
    showToast('💪 Hãy thử viết lại lần nữa nhé!')
  }
  setTimeout(() => {
    if (stars >= 2) {
      nextChar()
    }
  }, 400)
}

function onSelectFromModal(index: number) {
  currentIdx.value = index
  isRevealed.value = false
}

// Sound on initial load & change
watch(
  () => currentItem.value.character,
  () => {
    isRevealed.value = false
    playAudio()
  }
)

onMounted(() => {
  // Load saved practiced from localStorage if available
  try {
    const savedHira = localStorage.getItem('lingua_practiced_hiragana')
    if (savedHira) practicedHiragana.value = new Set(JSON.parse(savedHira))
    const savedKata = localStorage.getItem('lingua_practiced_katakana')
    if (savedKata) practicedKatakana.value = new Set(JSON.parse(savedKata))
  } catch (e) {
    // ignore
  }
})

watch(
  () => practicedHiragana.value.size,
  () => {
    try {
      localStorage.setItem('lingua_practiced_hiragana', JSON.stringify(Array.from(practicedHiragana.value)))
    } catch (e) {}
  }
)

watch(
  () => practicedKatakana.value.size,
  () => {
    try {
      localStorage.setItem('lingua_practiced_katakana', JSON.stringify(Array.from(practicedKatakana.value)))
    } catch (e) {}
  }
)
</script>

<template>
  <div class="writing-page-container">
    <!-- Top Navigation Bar -->
    <header class="writing-top-nav">
      <a href="#/" class="back-pill ios-pressable">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
        <span>Menu</span>
      </a>

      <!-- Alphabet Switcher (Hiragana / Katakana) -->
      <div class="alphabet-segmented">
        <button
          type="button"
          class="seg-btn"
          :class="{ 'seg-active': alphabet === 'hiragana' }"
          @click="switchAlphabet('hiragana')"
        >
          <span>Hiragana</span>
        </button>
        <button
          type="button"
          class="seg-btn"
          :class="{ 'seg-active': alphabet === 'katakana' }"
          @click="switchAlphabet('katakana')"
        >
          <span>Katakana</span>
        </button>
      </div>

      <!-- Quick Character Grid Picker Button -->
      <button type="button" class="grid-picker-btn ios-pressable" @click="isModalOpen = true">
        <span>{{ currentIdx + 1 }}/{{ currentList.length }}</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
        </svg>
      </button>
    </header>

    <!-- Sub Navigation / Mode Selector -->
    <div class="mode-bar-container">
      <div class="mode-toggle-group">
        <button
          type="button"
          class="mode-btn"
          :class="{ 'mode-active': practiceMode === 'guided' }"
          @click="practiceMode = 'guided'"
        >
          <span>✍️ Tập tô theo mẫu</span>
        </button>
        <button
          type="button"
          class="mode-btn"
          :class="{ 'mode-active': practiceMode === 'blind' }"
          @click="practiceMode = 'blind'"
        >
          <span>🧠 Tự viết nhớ chữ</span>
        </button>
      </div>
    </div>

    <!-- Main Card Body -->
    <main class="writing-content">
      <!-- Character Meta Banner -->
      <div class="char-header-row">
        <div class="char-info-left">
          <div class="romaji-badge">
            <span class="romaji-label">Romaji</span>
            <span class="romaji-text">{{ currentItem.romaji }}</span>
          </div>

          <div class="stroke-badge">
            <span>{{ currentItem.strokeCount }} Nét</span>
          </div>
        </div>

        <!-- Audio & Stroke Order Animation Buttons -->
        <div class="action-pills-right">
          <button
            type="button"
            class="icon-action-btn audio-btn ios-pressable"
            title="Nghe phát âm"
            @click="playAudio"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.2" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
            </svg>
            <span>Phát âm</span>
          </button>

          <button
            type="button"
            class="icon-action-btn anim-btn ios-pressable"
            title="Xem hoạt ảnh viết mẫu"
            @click="playAnim"
          >
            <span>▶️ Thứ tự nét</span>
          </button>
        </div>
      </div>

      <!-- Quick Canvas Display Toggles -->
      <div class="view-toggles-row">
        <button
          v-if="practiceMode === 'guided'"
          type="button"
          class="mini-toggle-pill ios-pressable"
          :class="{ 'pill-on': showGhost }"
          @click="showGhost = !showGhost"
        >
          <span>👁️ {{ showGhost ? 'Ẩn nét mờ' : 'Hiện nét mờ' }}</span>
        </button>

        <button
          v-if="practiceMode === 'guided'"
          type="button"
          class="mini-toggle-pill ios-pressable"
          :class="{ 'pill-on': showStrokeOrder }"
          @click="showStrokeOrder = !showStrokeOrder"
        >
          <span>🔢 {{ showStrokeOrder ? 'Ẩn số nét' : 'Hiện số nét' }}</span>
        </button>

        <button
          type="button"
          class="mini-toggle-pill ios-pressable"
          :class="{ 'pill-on': showGrid }"
          @click="showGrid = !showGrid"
        >
          <span>📐 {{ showGrid ? 'Ẩn ô vuông' : 'Hiện ô vuông' }}</span>
        </button>
      </div>

      <!-- Handwriting Canvas Component -->
      <WritingCanvas
        ref="canvasComp"
        :item="currentItem"
        :show-ghost="showGhost"
        :show-grid="showGrid"
        :show-stroke-order="showStrokeOrder"
        :is-blind-test="practiceMode === 'blind' && !isRevealed"
      />

      <!-- Blind Mode Reveal Button -->
      <div v-if="practiceMode === 'blind'" class="blind-reveal-box">
        <button
          type="button"
          class="reveal-btn ios-pressable"
          @click="isRevealed = !isRevealed"
        >
          <span>{{ isRevealed ? '🙈 Ẩn mẫu chữ đối chiếu' : '👁️ Xem mẫu chữ đối chiếu' }}</span>
        </button>
      </div>

      <!-- Stroke Order Tips Details -->
      <div class="tips-accordion ios-card">
        <div class="tips-header">
          <span class="tips-icon">💡</span>
          <span class="tips-title">Mẹo thứ tự nét ({{ currentItem.character }})</span>
        </div>
        <div class="tips-list">
          <div v-for="tip in currentItem.strokeTips" :key="tip" class="tip-line">
            {{ tip }}
          </div>
        </div>
      </div>

      <!-- Example Vocabulary Card -->
      <div class="example-vocab-card ios-card">
        <div class="vocab-left">
          <span class="vocab-emoji">{{ currentItem.example.emoji }}</span>
          <div class="vocab-text">
            <div class="vocab-word">
              <span>{{ currentItem.example.word }}</span>
              <span class="vocab-romaji">({{ currentItem.example.romaji }})</span>
            </div>
            <div class="vocab-meaning">{{ currentItem.example.meaning }}</div>
          </div>
        </div>
        <button
          type="button"
          class="vocab-speak-btn ios-pressable"
          @click="speakJapaneseWord(currentItem.example.word, currentItem.example.romaji)"
        >
          🔊
        </button>
      </div>
    </main>

    <!-- Bottom Action Navigation -->
    <footer class="writing-footer">
      <!-- Self-rating Row -->
      <div class="rating-bar">
        <span class="rating-label">Tự đánh giá:</span>
        <div class="rating-buttons">
          <button type="button" class="rate-btn rate-1 ios-pressable" @click="ratePractice(1)">
            <span>⭐ Luyện lại</span>
          </button>
          <button type="button" class="rate-btn rate-2 ios-pressable" @click="ratePractice(2)">
            <span>⭐⭐ Đạt</span>
          </button>
          <button type="button" class="rate-btn rate-3 ios-pressable" @click="ratePractice(3)">
            <span>⭐⭐⭐ Chuẩn</span>
          </button>
        </div>
      </div>

      <!-- Navigation Arrows & Random Button -->
      <div class="nav-control-bar">
        <button type="button" class="nav-btn prev-btn ios-pressable" @click="prevChar">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
          <span>Chữ trước</span>
        </button>

        <button type="button" class="nav-btn random-btn ios-pressable" title="Xáo trộn chữ" @click="randomChar">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.2" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3" />
          </svg>
        </button>

        <button type="button" class="nav-btn next-btn ios-pressable" @click="nextChar">
          <span>Tiếp theo</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>
    </footer>

    <!-- Character Grid Modal -->
    <CharacterGridModal
      :is-open="isModalOpen"
      :characters="currentList"
      :current-idx="currentIdx"
      :practiced-indices="practicedSet"
      :title="alphabet === 'hiragana' ? 'Bảng Chữ Hiragana (46)' : 'Bảng Chữ Katakana (46)'"
      @select="onSelectFromModal"
      @close="isModalOpen = false"
    />

    <!-- Toast Notification -->
    <Teleport to="body">
      <div v-if="toastMessage" class="toast-notification">
        <span>{{ toastMessage }}</span>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.writing-page-container {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  max-width: 460px;
  margin: 0 auto;
  padding: calc(var(--sat) + 0.75rem) 1rem calc(var(--sab) + 1.25rem);
  box-sizing: border-box;
  gap: 0.75rem;
}

/* ── Top Navigation ── */
.writing-top-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}

.back-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.45rem 0.8rem;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.85);
  border-radius: 999px;
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--color-ink);
  text-decoration: none;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04);
}

.alphabet-segmented {
  display: flex;
  background: rgba(226, 232, 240, 0.8);
  padding: 0.2rem;
  border-radius: 999px;
  gap: 0.15rem;
}

.seg-btn {
  padding: 0.35rem 0.85rem;
  border-radius: 999px;
  border: none;
  background: transparent;
  font-size: 0.78rem;
  font-weight: 700;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.seg-active {
  background: #ffffff;
  color: #0d9488;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.grid-picker-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.45rem 0.75rem;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.85);
  border-radius: 999px;
  font-size: 0.78rem;
  font-weight: 800;
  color: #0d9488;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04);
}

/* ── Mode Switcher ── */
.mode-bar-container {
  display: flex;
  justify-content: center;
}

.mode-toggle-group {
  display: flex;
  width: 100%;
  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(12px);
  padding: 0.25rem;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.85);
  gap: 0.3rem;
}

.mode-btn {
  flex: 1;
  padding: 0.45rem 0.5rem;
  border-radius: 12px;
  border: none;
  background: transparent;
  font-size: 0.8rem;
  font-weight: 700;
  color: #64748b;
  cursor: pointer;
  transition: all 0.18s ease;
}

.mode-active {
  background: #0d9488;
  color: #ffffff;
  box-shadow: 0 4px 12px rgba(13, 148, 136, 0.25);
}

/* ── Main Content ── */
.writing-content {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  flex: 1;
}

.char-header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.25rem;
}

.char-info-left {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.romaji-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  background: #f1f5f9;
  padding: 0.3rem 0.65rem;
  border-radius: 10px;
}

.romaji-label {
  font-size: 0.65rem;
  font-weight: 700;
  color: #64748b;
  text-transform: uppercase;
}

.romaji-text {
  font-size: 0.95rem;
  font-weight: 800;
  color: var(--color-ink);
}

.stroke-badge {
  background: #ccfbf1;
  color: #0f766e;
  padding: 0.3rem 0.6rem;
  border-radius: 10px;
  font-size: 0.75rem;
  font-weight: 800;
}

.action-pills-right {
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

.icon-action-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.4rem 0.65rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.8);
  font-size: 0.75rem;
  font-weight: 700;
  cursor: pointer;
}

.audio-btn {
  background: #e0f2fe;
  color: #0369a1;
}

.anim-btn {
  background: #fef3c7;
  color: #92400e;
}

/* ── View Toggles Row ── */
.view-toggles-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  flex-wrap: wrap;
}

.mini-toggle-pill {
  padding: 0.25rem 0.65rem;
  background: rgba(255, 255, 255, 0.6);
  border: 1px solid #e2e8f0;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 700;
  color: #64748b;
  cursor: pointer;
  transition: all 0.15s ease;
}

.mini-toggle-pill.pill-on {
  background: #f0fdf4;
  border-color: #86efac;
  color: #166534;
}

/* ── Blind Mode Reveal ── */
.blind-reveal-box {
  display: flex;
  justify-content: center;
}

.reveal-btn {
  padding: 0.5rem 1.25rem;
  background: #fef08a;
  border: 1.5px solid #facc15;
  border-radius: 999px;
  font-size: 0.82rem;
  font-weight: 800;
  color: #854d0e;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(250, 204, 21, 0.25);
}

/* ── Tips Accordion ── */
.tips-accordion {
  padding: 0.75rem 1rem;
  border-radius: 20px;
}

.tips-header {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: 0.35rem;
}

.tips-icon {
  font-size: 0.95rem;
}

.tips-title {
  font-size: 0.82rem;
  font-weight: 800;
  color: var(--color-ink);
}

.tips-list {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.tip-line {
  font-size: 0.75rem;
  font-weight: 600;
  color: #475569;
  line-height: 1.4;
}

/* ── Example Vocabulary Card ── */
.example-vocab-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  border-radius: 20px;
}

.vocab-left {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.vocab-emoji {
  font-size: 1.6rem;
  line-height: 1;
}

.vocab-text {
  display: flex;
  flex-direction: column;
}

.vocab-word {
  display: flex;
  align-items: baseline;
  gap: 0.35rem;
}

.vocab-word span:first-child {
  font-family: 'M PLUS Rounded 1c', sans-serif;
  font-size: 1.05rem;
  font-weight: 800;
  color: var(--color-ink);
}

.vocab-romaji {
  font-size: 0.75rem;
  font-weight: 600;
  color: #64748b;
}

.vocab-meaning {
  font-size: 0.75rem;
  font-weight: 600;
  color: #0d9488;
}

.vocab-speak-btn {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: #f1f5f9;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.95rem;
  cursor: pointer;
}

/* ── Footer / Actions ── */
.writing-footer {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.rating-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  padding: 0.45rem 0.75rem;
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.9);
}

.rating-label {
  font-size: 0.75rem;
  font-weight: 700;
  color: #64748b;
}

.rating-buttons {
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

.rate-btn {
  padding: 0.35rem 0.6rem;
  border-radius: 10px;
  border: none;
  font-size: 0.72rem;
  font-weight: 800;
  cursor: pointer;
}

.rate-1 { background: #fee2e2; color: #991b1b; }
.rate-2 { background: #fef3c7; color: #92400e; }
.rate-3 { background: #dcfce7; color: #166534; }

.nav-control-bar {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.nav-btn {
  padding: 0.75rem 1rem;
  border-radius: 18px;
  border: none;
  font-size: 0.88rem;
  font-weight: 800;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  transition: transform 0.15s ease;
}

.prev-btn {
  flex: 1;
  background: #ffffff;
  color: var(--color-ink);
  border: 1.5px solid #e2e8f0;
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.04);
}

.random-btn {
  width: 48px;
  height: 48px;
  border-radius: 18px;
  background: #f1f5f9;
  color: #475569;
  border: 1.5px solid #e2e8f0;
  padding: 0;
}

.next-btn {
  flex: 1.4;
  background: linear-gradient(135deg, #0d9488 0%, #0284c7 100%);
  color: #ffffff;
  box-shadow: 0 6px 20px -4px rgba(13, 148, 136, 0.4);
}

/* ── Toast Notification ── */
.toast-notification {
  position: fixed;
  top: calc(var(--sat) + 1.25rem);
  left: 50%;
  transform: translateX(-50%);
  background: rgba(15, 23, 42, 0.92);
  color: #ffffff;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  padding: 0.6rem 1.2rem;
  border-radius: 999px;
  font-size: 0.82rem;
  font-weight: 700;
  z-index: 1000;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  animation: toastFade 0.25s cubic-bezier(0.16, 1, 0.3, 1) both;
}

@keyframes toastFade {
  from { opacity: 0; transform: translate(-50%, -10px); }
  to { opacity: 1; transform: translate(-50%, 0); }
}
</style>
