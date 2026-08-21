<script setup lang="ts">
import { watch } from 'vue'
import { speakWord } from '@/utils/speakWord'

const props = defineProps<{
  word: string
  pronunciation: string
  questionNumber: number
  total: number
}>()

function onSpeak(word: string) {
  speakWord(word)
}

watch(
  () => props.word,
  (word) => {
    if (word) speakWord(word)
  },
  { immediate: true },
)
</script>

<template>
  <div class="text-center">
    <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-xs font-bold text-slate-500 mb-2">
      <span>Từ vựng #{{ questionNumber }}</span>
    </div>

    <h2 class="font-['Source_Serif_4',serif] text-4xl sm:text-5xl font-extrabold tracking-tight text-[var(--color-ink)]">
      {{ word }}
    </h2>

    <p class="mt-1 text-sm sm:text-base font-semibold text-slate-400 tracking-wide font-mono">{{ pronunciation }}</p>

    <button
      type="button"
      class="mt-3.5 inline-flex h-12 w-12 items-center justify-center rounded-full bg-teal-50 border border-teal-100 text-teal-600 text-xl shadow-sm transition-all hover:bg-teal-100 active:scale-95"
      :aria-label="`Phát âm từ ${word}`"
      @click="onSpeak(word)"
    >
      🔊
    </button>
  </div>
</template>

