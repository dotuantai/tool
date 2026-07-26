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

// Auto-speak whenever a new word appears
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
    <h2
      class="font-['Source_Serif_4',serif] text-4xl font-bold tracking-tight text-[var(--color-ink)] sm:text-5xl"
    >
      {{ word }}
    </h2>

    <p class="mt-2 text-base text-[var(--color-muted)]">{{ pronunciation }}</p>

    <button
      type="button"
      class="mt-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-teal-50 text-2xl text-[var(--color-accent)] transition hover:bg-teal-100 hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
      :aria-label="`Phát âm từ ${word}`"
      @click="onSpeak(word)"
    >
      🔊
    </button>

    <p class="mt-4 text-sm font-semibold text-[var(--color-muted)]">
      Câu {{ questionNumber }} / {{ total }}
    </p>
  </div>
</template>
