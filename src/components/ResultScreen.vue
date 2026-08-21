<script setup lang="ts">
import { computed } from 'vue'
import type { QuizScore } from '@/types/vocabulary'

const props = defineProps<{
  score: QuizScore
  total: number
}>()

const emit = defineEmits<{
  restart: []
}>()

const accuracy = computed(() => {
  const done = props.score.correct + props.score.incorrect
  return done === 0 ? 0 : Math.round((props.score.correct / done) * 100)
})
</script>

<template>
  <div
    class="animate-[fadeUp_0.4s_ease-out] rounded-3xl ios-card p-6 sm:p-8 text-center"
  >
    <div
      class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-50 text-3xl shadow-sm"
    >
      {{ accuracy >= 80 ? '🎉' : accuracy >= 50 ? '🌟' : '💪' }}
    </div>

    <h2 class="font-['Source_Serif_4',serif] text-2xl sm:text-3xl font-extrabold text-[var(--color-ink)]">
      {{ accuracy >= 80 ? 'Xuất Sắc!' : accuracy >= 50 ? 'Hoàn Thành Tốt!' : 'Cố Gắng Lần Sau!' }}
    </h2>

    <p class="mt-1 text-xs sm:text-sm font-medium text-slate-500">
      Đã hoàn thành toàn bộ {{ total }} câu hỏi từ vựng
    </p>

    <div class="mt-6 grid grid-cols-3 gap-2 sm:gap-3">
      <div class="rounded-2xl bg-emerald-50/90 border border-emerald-100 p-3 sm:p-4 text-center">
        <p class="text-2xl font-black text-emerald-600">{{ score.correct }}</p>
        <p class="text-[0.65rem] font-extrabold uppercase tracking-wider text-emerald-700 mt-0.5">Đúng</p>
      </div>
      <div class="rounded-2xl bg-rose-50/90 border border-rose-100 p-3 sm:p-4 text-center">
        <p class="text-2xl font-black text-rose-600">{{ score.incorrect }}</p>
        <p class="text-[0.65rem] font-extrabold uppercase tracking-wider text-rose-700 mt-0.5">Sai</p>
      </div>
      <div class="rounded-2xl bg-teal-50/90 border border-teal-100 p-3 sm:p-4 text-center">
        <p class="text-2xl font-black text-teal-600">{{ accuracy }}%</p>
        <p class="text-[0.65rem] font-extrabold uppercase tracking-wider text-teal-700 mt-0.5">Tỉ lệ</p>
      </div>
    </div>

    <button
      type="button"
      class="mt-6 w-full min-h-[52px] rounded-2xl bg-gradient-to-r from-teal-600 to-cyan-600 px-6 py-3.5 text-base font-extrabold text-white shadow-lg shadow-teal-500/25 transition-all ios-pressable flex items-center justify-center gap-2"
      @click="emit('restart')"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-5 h-5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
      </svg>
      Làm lại từ vựng
    </button>
  </div>
</template>

