<script setup lang="ts">
import type { QuizScore } from '@/types/vocabulary'

defineProps<{
  score: QuizScore
  total: number
}>()

const emit = defineEmits<{
  restart: []
}>()
</script>

<template>
  <div
    class="animate-[fadeIn_0.4s_ease-out] rounded-3xl bg-[var(--color-surface)] p-8 text-center shadow-[0_12px_40px_rgba(26,46,53,0.08)] sm:p-10"
  >
    <div
      class="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-teal-50 text-3xl"
    >
      ✨
    </div>

    <h2 class="font-['Source_Serif_4',serif] text-3xl font-bold text-[var(--color-ink)] sm:text-4xl">
      Hoàn thành!
    </h2>

    <div class="mt-8 grid grid-cols-2 gap-4">
      <div class="rounded-2xl bg-emerald-50 px-4 py-5">
        <p class="text-sm font-semibold text-emerald-700">Đúng</p>
        <p class="mt-1 text-3xl font-extrabold text-[var(--color-correct)]">{{ score.correct }}</p>
      </div>
      <div class="rounded-2xl bg-red-50 px-4 py-5">
        <p class="text-sm font-semibold text-red-700">Sai</p>
        <p class="mt-1 text-3xl font-extrabold text-[var(--color-wrong)]">{{ score.incorrect }}</p>
      </div>
    </div>

    <p class="mt-4 text-sm text-[var(--color-muted)]">Tổng {{ total }} từ</p>

    <button
      type="button"
      class="mt-8 w-full rounded-2xl bg-[var(--color-accent)] px-6 py-3.5 text-base font-bold text-white shadow-sm transition hover:bg-teal-700 hover:shadow-md active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2"
      @click="emit('restart')"
    >
      Làm lại
    </button>
  </div>
</template>
