<script setup lang="ts">
import { ref, computed } from 'vue'
import { hiraganaData } from '@/data/hiragana'
import { speakJapaneseWord } from '@/utils/speakJapanese'

const currentIndex = ref(0)
const currentChar = computed(() => hiraganaData[currentIndex.value])
const showRomaji = ref(false)

function playAudio() {
  const char = currentChar.value
  if (!char) return
  speakJapaneseWord(char.character, char.romaji)
}

function nextChar() {
  showRomaji.value = false
  if (currentIndex.value < hiraganaData.length - 1) {
    currentIndex.value++
  } else {
    currentIndex.value = 0 // loop back
  }
}

function prevChar() {
  showRomaji.value = false
  if (currentIndex.value > 0) {
    currentIndex.value--
  } else {
    currentIndex.value = hiraganaData.length - 1 // loop back
  }
}
</script>

<template>
  <div class="mobile-hira-wrapper">
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
        <span>Bảng Chữ Cái</span>
      </div>

      <div class="counter-badge">
        {{ currentIndex + 1 }}/{{ hiraganaData.length }}
      </div>
    </div>

    <!-- Main Flashcard Card -->
    <div class="flashcard-box ios-card">
      <!-- Top hint -->
      <p class="flashcard-sub">Chạm loa để nghe phát âm chuẩn</p>

      <!-- Big Hiragana Character Area -->
      <div class="char-display-wrap">
        <span class="huge-char">{{ currentChar?.character }}</span>
      </div>

      <!-- Audio Button with wave effect -->
      <button
        type="button"
        @click="playAudio"
        class="speaker-btn ios-pressable"
        title="Nghe phát âm"
        aria-label="Phát âm chữ cái"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.2" stroke="currentColor" class="w-8 h-8">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
        </svg>
      </button>

      <!-- Romaji reveal toggle -->
      <div class="romaji-toggle-area">
        <button
          v-if="!showRomaji"
          type="button"
          @click="showRomaji = true"
          class="reveal-btn ios-pressable"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
          <span>Xem cách đọc (Romaji)</span>
        </button>

        <div v-else class="romaji-badge animate-[fadeUp_0.2s_ease-out]">
          <span class="romaji-text">{{ currentChar?.romaji }}</span>
        </div>
      </div>
    </div>

    <!-- Bottom Navigation Buttons (Thumb Zone) -->
    <div class="bottom-nav-bar">
      <button
        type="button"
        @click="prevChar"
        class="nav-btn prev-btn ios-pressable"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
        <span>Trước</span>
      </button>

      <button
        type="button"
        @click="nextChar"
        class="nav-btn next-btn ios-pressable"
      >
        <span>Sau</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
.mobile-hira-wrapper {
  min-height: 100dvh;
  max-width: 480px;
  margin: 0 auto;
  padding: calc(var(--sat) + 0.85rem) 1rem calc(var(--sab) + 1.25rem);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
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
  color: #e11d48;
  background: rgba(255, 241, 242, 0.8);
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  border: 1px solid rgba(254, 205, 211, 0.8);
}

.badge-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #f43f5e;
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

/* ── Flashcard Box ── */
.flashcard-box {
  border-radius: 28px;
  padding: 1.75rem 1.25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  flex: 1;
  justify-content: center;
}

.flashcard-sub {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-muted);
  margin: 0;
  text-align: center;
}

.char-display-wrap {
  width: 170px;
  height: 170px;
  border-radius: 24px;
  background: linear-gradient(145deg, #f0fdf4 0%, #dcfce7 100%);
  border: 1px solid rgba(187, 247, 208, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: inset 0 2px 6px rgba(0, 0, 0, 0.03), 0 8px 24px rgba(16, 185, 129, 0.1);
}

.huge-char {
  font-size: 6.5rem;
  font-family: 'M PLUS Rounded 1c', sans-serif;
  font-weight: 900;
  color: #065f46;
  line-height: 1;
  user-select: none;
}

/* ── Speaker Button ── */
.speaker-btn {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  border: none;
  background: linear-gradient(135deg, #0d9488 0%, #0284c7 100%);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 6px 20px rgba(13, 148, 136, 0.35);
}

/* ── Romaji Toggle ── */
.romaji-toggle-area {
  min-height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.reveal-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.6rem 1.15rem;
  border-radius: 999px;
  border: 1.5px solid #cbd5e1;
  background: #f8fafc;
  color: #475569;
  font-family: inherit;
  font-size: 0.82rem;
  font-weight: 700;
  cursor: pointer;
}

.romaji-badge {
  padding: 0.4rem 1.75rem;
  border-radius: 16px;
  background: #f0fdf4;
  border: 1.5px solid #86efac;
}

.romaji-text {
  font-size: 2rem;
  font-weight: 900;
  color: #166534;
  letter-spacing: 0.08em;
}

/* ── Bottom Nav Thumb Zone ── */
.bottom-nav-bar {
  display: flex;
  gap: 0.75rem;
}

.nav-btn {
  flex: 1;
  min-height: 54px;
  border-radius: 20px;
  border: none;
  font-family: inherit;
  font-size: 0.95rem;
  font-weight: 800;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
}

.prev-btn {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1.5px solid #cbd5e1;
  color: var(--color-ink);
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.04);
}

.next-btn {
  background: linear-gradient(135deg, #0d9488 0%, #0284c7 100%);
  color: #ffffff;
  box-shadow: 0 6px 20px rgba(13, 148, 136, 0.35);
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
}
</style>