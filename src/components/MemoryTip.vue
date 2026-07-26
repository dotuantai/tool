<script setup lang="ts">
defineProps<{
  word: string
  meaning: string
  tip: string
}>()
</script>

<template>
  <div
    class="mt-5 animate-[fadeIn_0.35s_ease-out] rounded-2xl border border-amber-200/80 bg-amber-50/90 px-4 py-3.5 text-left"
  >
    <p class="text-sm font-bold text-amber-800">💡 Mẹo nhớ</p>
    <p class="mt-2 font-semibold text-[var(--color-ink)]">{{ word }}</p>
    <p class="my-1 text-center text-amber-600">↓</p>
    <p class="text-sm italic text-amber-900">"{{ tip }}"</p>
    <p class="mt-2 text-sm font-semibold text-[var(--color-correct)]">=> {{ meaning }}</p>
  </div>
</template>
