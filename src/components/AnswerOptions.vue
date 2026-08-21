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
    'w-full min-h-[54px] rounded-2xl border-2 px-4 py-3 text-left text-base font-bold transition-all duration-150 flex items-center gap-3 ios-pressable'

  if (props.answerState === 'idle') {
    return `${base} border-slate-200/90 bg-white/90 text-[var(--color-ink)] shadow-sm hover:border-teal-400 hover:bg-teal-50/50`
  }

  const isCorrect = meaning === props.correctMeaning
  const isSelected = meaning === props.selectedMeaning

  if (isCorrect) {
    return `${base} border-emerald-500 bg-emerald-50 text-emerald-800 shadow-md`
  }

  if (isSelected && props.answerState === 'incorrect') {
    return `${base} border-rose-500 bg-rose-50 text-rose-800 shadow-md`
  }

  return `${base} border-slate-100 bg-slate-50 text-slate-400 opacity-50`
}

function isDisabled(): boolean {
  return props.answerState !== 'idle'
}
</script>

<template>
  <div class="flex flex-col gap-2.5" role="listbox" aria-label="Đáp án">
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
      <span
        class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs font-bold transition-colors"
        :class="
          answerState !== 'idle' && meaning === correctMeaning
            ? 'border-emerald-500 bg-emerald-500 text-white'
            : answerState === 'incorrect' && meaning === selectedMeaning
              ? 'border-rose-500 bg-rose-500 text-white'
              : 'border-slate-300 bg-slate-100 text-slate-500'
        "
      >
        {{ String.fromCharCode(65 + index) }}
      </span>
      <span class="flex-1 leading-snug">{{ meaning }}</span>
    </button>
  </div>
</template>

