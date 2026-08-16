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
  <div class="mx-auto flex min-h-dvh w-full max-w-lg flex-col items-center justify-center px-4 py-8 sm:py-12">
    <header class="mb-10 text-center">
      <p class="text-sm font-bold uppercase tracking-[0.2em] text-teal-700/80">Nhận diện</p>
      <h1 class="mt-1 font-['Source_Serif_4',serif] text-2xl font-bold text-[var(--color-ink)]">
        Bảng chữ cái Hiragana
      </h1>
      <p class="mt-2 text-sm text-[var(--color-ink)] opacity-70">
        Hãy tự đọc to chữ cái. Nếu quên, bạn có thể nhấn vào biểu tượng loa để nghe.
      </p>
    </header>

    <div class="relative flex w-full flex-col items-center justify-center rounded-3xl bg-[var(--color-surface)] p-10 shadow-[0_12px_40px_rgba(26,46,53,0.08)]">
      <div class="mb-8 flex h-40 w-40 items-center justify-center rounded-2xl bg-teal-50/50 shadow-inner">
        <span class="text-8xl text-teal-900">{{ currentChar?.character }}</span>
      </div>

      <button
        @click="playAudio"
        class="mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-teal-100 text-teal-700 shadow-sm transition-all hover:bg-teal-200 hover:scale-105 active:scale-95"
        title="Nghe phát âm"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="h-8 w-8">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
        </svg>
      </button>

      <div class="mb-10 flex min-h-12 w-full items-center justify-center">
        <button
          v-if="!showRomaji"
          @click="showRomaji = true"
          class="rounded-xl border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-500 transition hover:bg-gray-100 active:scale-95"
        >
          Xem cách đọc
        </button>
        <div
          v-else
          class="animate-[fadeIn_0.2s_ease-out] rounded-xl border border-teal-100 bg-teal-50 px-8 py-2 text-3xl font-bold tracking-widest text-teal-800"
        >
          {{ currentChar?.romaji }}
        </div>
      </div>

      <div class="flex w-full justify-between gap-4">
        <button
          @click="prevChar"
          class="flex-1 rounded-2xl bg-gray-100 py-4 font-bold text-gray-700 transition hover:bg-gray-200 active:scale-95"
        >
          Trước
        </button>
        <button
          @click="nextChar"
          class="flex-1 rounded-2xl bg-[var(--color-accent)] py-4 font-bold text-white shadow-sm transition hover:bg-teal-700 active:scale-95"
        >
          Sau
        </button>
      </div>
    </div>
    
    <div class="mt-8 text-center text-sm font-medium text-gray-500">
      {{ currentIndex + 1 }} / {{ hiraganaData.length }}
    </div>
    
    <div class="mt-8">
      <a href="#/" class="text-teal-600 hover:underline">Quay lại trang chủ</a>
    </div>
  </div>
</template>
