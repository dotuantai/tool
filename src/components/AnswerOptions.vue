<script setup lang="ts">
import type { AnswerState } from '@/types/vocabulary'

const props = defineProps<{
  options: string[]
  correctMeaning: string
  selectedMeaning: string | null
  answerState: AnswerState
}>()

const emit = defineEmits<{
  select: [meaning: string]
}>()

function optionClass(meaning: string): string {
  const base =
    'w-full rounded-2xl border px-4 py-3.5 text-left text-base font-semibold transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400'

  if (props.answerState === 'idle') {
    return `${base} border-slate-200 bg-white text-[var(--color-ink)] hover:border-teal-300 hover:bg-teal-50/60`
  }

  const isCorrect = meaning === props.correctMeaning
  const isSelected = meaning === props.selectedMeaning

  if (isCorrect) {
    return `${base} border-emerald-400 bg-[var(--color-correct-bg)] text-[var(--color-correct)]`
  }

  if (isSelected && props.answerState === 'incorrect') {
    return `${base} border-red-400 bg-[var(--color-wrong-bg)] text-[var(--color-wrong)]`
  }

  return `${base} border-slate-100 bg-slate-50 text-slate-400 opacity-70`
}

function isDisabled(): boolean {
  return props.answerState !== 'idle'
}
</script>

<template>
  <div class="flex flex-col gap-3" role="listbox" aria-label="Đáp án">
    <button
      v-for="(meaning, index) in options"
      :key="`${index}-${meaning}`"
      type="button"
      role="option"
      :aria-selected="selectedMeaning === meaning"
      :disabled="isDisabled()"
      :class="optionClass(meaning)"
      @click="emit('select', meaning)"
    >
      <span class="mr-3 inline-block text-[var(--color-muted)]">○</span>
      {{ meaning }}
    </button>
  </div>
</template>
