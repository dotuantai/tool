<script setup lang="ts">
defineProps<{
  current: number
  total: number
}>()
</script>

<template>
  <div class="w-full space-y-2">
    <div class="flex items-center justify-between text-sm font-semibold text-[var(--color-muted)]">
      <span>Tiến độ</span>
      <span>{{ current }} / {{ total }}</span>
    </div>
    <div
      class="h-2.5 w-full overflow-hidden rounded-full bg-teal-100/80"
      role="progressbar"
      :aria-valuenow="current"
      :aria-valuemin="0"
      :aria-valuemax="total"
    >
      <div
        class="h-full rounded-full bg-[var(--color-accent)] transition-all duration-500 ease-out"
        :style="{ width: `${total === 0 ? 0 : (current / total) * 100}%` }"
      />
    </div>
  </div>
</template>
