<script setup lang="ts">
import { computed } from 'vue'
import type { KanaWritingItem } from '@/data/hiraganaWriting'

const props = defineProps<{
  isOpen: boolean
  characters: KanaWritingItem[]
  currentIdx: number
  practicedIndices: Set<number>
  title: string
}>()

const emit = defineEmits<{
  (e: 'select', index: number): void
  (e: 'close'): void
}>()

// Group characters by row
const groupedRows = computed(() => {
  const map = new Map<string, { item: KanaWritingItem; index: number }[]>()
  props.characters.forEach((item, index) => {
    if (!map.has(item.row)) {
      map.set(item.row, [])
    }
    map.get(item.row)!.push({ item, index })
  })
  return Array.from(map.entries()).map(([rowName, items]) => ({
    rowName,
    items
  }))
})

function onSelect(index: number) {
  emit('select', index)
  emit('close')
}
</script>

<template>
  <Teleport to="body">
    <div v-if="isOpen" class="modal-backdrop" @click="emit('close')">
      <div class="modal-sheet" @click.stop>
        <!-- Modal Header -->
        <div class="sheet-header">
          <div class="drag-handle"></div>
          <div class="header-main">
            <div>
              <h2 class="sheet-title">{{ title }}</h2>
              <p class="sheet-sub">Đã luyện tập: {{ practicedIndices.size }}/{{ characters.length }} ký tự</p>
            </div>
            <button type="button" class="close-btn ios-pressable" @click="emit('close')">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Sheet Body / Rows Grid -->
        <div class="sheet-body">
          <div v-for="group in groupedRows" :key="group.rowName" class="row-group">
            <div class="row-badge">{{ group.rowName }}</div>
            <div class="chars-grid">
              <button
                v-for="{ item, index } in group.items"
                :key="item.character"
                type="button"
                class="char-tile ios-pressable"
                :class="{
                  'char-tile-active': currentIdx === index,
                  'char-tile-done': practicedIndices.has(index) && currentIdx !== index
                }"
                @click="onSelect(index)"
              >
                <span class="tile-char">{{ item.character }}</span>
                <span class="tile-romaji">{{ item.romaji }}</span>
                <span v-if="practicedIndices.has(index)" class="tile-check">✓</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.45);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  z-index: 999;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  animation: fadeIn 0.2s ease-out both;
}

.modal-sheet {
  width: 100%;
  max-width: 500px;
  max-height: 85dvh;
  background: #ffffff;
  border-radius: 28px 28px 0 0;
  display: flex;
  flex-direction: column;
  box-shadow: 0 -10px 40px rgba(0, 0, 0, 0.15);
  animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) both;
  overflow: hidden;
  padding-bottom: calc(var(--sab) + 1rem);
}

.sheet-header {
  padding: 0.75rem 1.25rem 0.85rem;
  border-bottom: 1px solid #f1f5f9;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.drag-handle {
  width: 36px;
  height: 4px;
  background: #cbd5e1;
  border-radius: 999px;
  margin-bottom: 0.75rem;
}

.header-main {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.sheet-title {
  font-size: 1.15rem;
  font-weight: 800;
  color: var(--color-ink);
  margin: 0 0 0.15rem;
}

.sheet-sub {
  font-size: 0.78rem;
  font-weight: 600;
  color: #0d9488;
  margin: 0;
}

.close-btn {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: #f1f5f9;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
  cursor: pointer;
}

/* ── Body ── */
.sheet-body {
  flex: 1;
  overflow-y: auto;
  padding: 1rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1.15rem;
  -webkit-overflow-scrolling: touch;
}

.row-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.row-badge {
  font-size: 0.72rem;
  font-weight: 800;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.chars-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.5rem;
}

.char-tile {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0.6rem 0.25rem;
  background: #f8fafc;
  border: 1.5px solid #e2e8f0;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.15s ease;
}

.tile-char {
  font-family: 'M PLUS Rounded 1c', sans-serif;
  font-size: 1.4rem;
  font-weight: 800;
  color: #1e293b;
  line-height: 1.2;
}

.tile-romaji {
  font-size: 0.72rem;
  font-weight: 600;
  color: #64748b;
}

.char-tile-active {
  background: #f0fdf4;
  border-color: #0d9488;
  box-shadow: 0 0 0 2px rgba(13, 148, 136, 0.2);
}

.char-tile-active .tile-char {
  color: #0d9488;
}

.char-tile-done {
  background: #f0fdfa;
  border-color: #99f6e4;
}

.tile-check {
  position: absolute;
  top: 3px;
  right: 4px;
  font-size: 0.65rem;
  font-weight: 800;
  color: #0d9488;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
}
</style>
