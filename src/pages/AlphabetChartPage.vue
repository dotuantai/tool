<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  seionRows,
  dakuonRows,
  yoonRows,
  allKanaItems,
  type FullKanaItem,
  type KanaRowGroup
} from '@/data/fullKanaData'
import { speakJapaneseWord } from '@/utils/speakJapanese'

type DisplayMode = 'hiragana' | 'katakana' | 'both'
type GroupTab = 'seion' | 'dakuon' | 'yoon'

const displayMode = ref<DisplayMode>('hiragana')
const activeGroup = ref<GroupTab>('seion')
const searchQuery = ref('')
const selectedItem = ref<FullKanaItem | null>(null)
const isDetailOpen = ref(false)
const playingChar = ref<string | null>(null)

// Search filter
const isSearching = computed(() => searchQuery.value.trim().length > 0)
const searchResults = computed<FullKanaItem[]>(() => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return []
  return allKanaItems.filter(
    item =>
      item.romaji.toLowerCase().includes(q) ||
      item.hiragana.includes(q) ||
      item.katakana.includes(q)
  )
})

// Active rows depending on tab
const currentRows = computed<KanaRowGroup[]>(() => {
  if (activeGroup.value === 'seion') return seionRows
  if (activeGroup.value === 'dakuon') return dakuonRows
  return yoonRows
})

// Column headers for Seion / Dakuon (5 columns) and Yoon (3 columns)
const columnHeaders = computed(() => {
  if (activeGroup.value === 'yoon') {
    return ['-ya (ャ)', '-yu (ュ)', '-yo (ョ)']
  }
  return ['Cột A (あ)', 'Cột I (い)', 'Cột U (う)', 'Cột E (え)', 'Cột O (お)']
})

function playKana(item: FullKanaItem, e?: Event) {
  if (e) e.stopPropagation()
  const char = displayMode.value === 'katakana' ? item.katakana : item.hiragana
  playingChar.value = char
  speakJapaneseWord(char, item.romaji)
  setTimeout(() => {
    if (playingChar.value === char) playingChar.value = null
  }, 900)
}

function openDetail(item: FullKanaItem) {
  selectedItem.value = item
  isDetailOpen.value = true
  playKana(item)
}

function closeDetail() {
  isDetailOpen.value = false
}

function goToWriting(item: FullKanaItem) {
  const type = displayMode.value === 'katakana' ? 'katakana' : 'hiragana'
  sessionStorage.setItem('lingua_target_kana', JSON.stringify({ type, char: item.hiragana }))
  window.location.hash = '#/writing'
}

function clearSearch() {
  searchQuery.value = ''
}
</script>

<template>
  <div class="alphabet-page">
    <!-- Top Navigation Bar -->
    <header class="top-nav">
      <a href="#/" class="back-pill ios-pressable" aria-label="Về màn hình chính">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
        <span>Menu</span>
      </a>

      <div class="title-badge">
        <span class="badge-dot"></span>
        <span>Bảng Chữ Cái</span>
      </div>

      <div class="char-count-badge">
        {{ activeGroup === 'seion' ? '46 Chữ' : activeGroup === 'dakuon' ? '25 Chữ' : '33 Chữ' }}
      </div>
    </header>

    <!-- Header Intro Banner -->
    <div class="intro-card ios-card">
      <div class="intro-text">
        <h1 class="intro-title">Toàn Bộ Chữ Cái Tiếng Nhật</h1>
        <p class="intro-sub">Chạm vào bất kỳ chữ nào để nghe phát âm chuẩn và xem chi tiết nét viết.</p>
      </div>
      <div class="intro-icon-group" aria-hidden="true">
        <span class="bubble bubble-1">あ</span>
        <span class="bubble bubble-2">ア</span>
      </div>
    </div>

    <!-- Script Type Segmented Switcher (Hiragana vs Katakana vs Cả hai) -->
    <div class="script-segmented-card ios-card">
      <div class="segmented-control">
        <button
          type="button"
          class="seg-btn"
          :class="{ 'seg-btn-active hira-active': displayMode === 'hiragana' }"
          @click="displayMode = 'hiragana'"
        >
          <span class="seg-char">あ</span>
          <span class="seg-label">Hiragana</span>
        </button>

        <button
          type="button"
          class="seg-btn"
          :class="{ 'seg-btn-active kata-active': displayMode === 'katakana' }"
          @click="displayMode = 'katakana'"
        >
          <span class="seg-char">ア</span>
          <span class="seg-label">Katakana</span>
        </button>

        <button
          type="button"
          class="seg-btn"
          :class="{ 'seg-btn-active both-active': displayMode === 'both' }"
          @click="displayMode = 'both'"
        >
          <span class="seg-char">あ/ア</span>
          <span class="seg-label">Song Song</span>
        </button>
      </div>
    </div>

    <!-- Group Filter Tabs (Cơ bản - Âm đục - Ảo âm) -->
    <div class="group-tabs-row">
      <button
        type="button"
        class="group-tab ios-pressable"
        :class="{ 'group-tab-active': activeGroup === 'seion' && !isSearching }"
        @click="activeGroup = 'seion'; searchQuery = ''"
      >
        <span class="tab-emoji">🌸</span>
        <div class="tab-copy">
          <span class="tab-title">Cơ Bản</span>
          <span class="tab-sub">46 Chữ (Seion)</span>
        </div>
      </button>

      <button
        type="button"
        class="group-tab ios-pressable"
        :class="{ 'group-tab-active': activeGroup === 'dakuon' && !isSearching }"
        @click="activeGroup = 'dakuon'; searchQuery = ''"
      >
        <span class="tab-emoji">⚡</span>
        <div class="tab-copy">
          <span class="tab-title">Âm Đục</span>
          <span class="tab-sub">25 Chữ (Dakuon)</span>
        </div>
      </button>

      <button
        type="button"
        class="group-tab ios-pressable"
        :class="{ 'group-tab-active': activeGroup === 'yoon' && !isSearching }"
        @click="activeGroup = 'yoon'; searchQuery = ''"
      >
        <span class="tab-emoji">✨</span>
        <div class="tab-copy">
          <span class="tab-title">Ảo Âm</span>
          <span class="tab-sub">33 Ghép (Yōon)</span>
        </div>
      </button>
    </div>

    <!-- Quick Search Bar -->
    <div class="search-bar-wrap ios-card">
      <span class="search-icon" aria-hidden="true">🔍</span>
      <input
        v-model="searchQuery"
        type="text"
        class="search-input"
        placeholder="Tìm chữ cái (ví dụ: ka, sa, tsu, あ, ア)..."
        autocomplete="off"
        spellcheck="false"
      />
      <button
        v-if="searchQuery"
        type="button"
        class="clear-search-btn"
        aria-label="Xóa tìm kiếm"
        @click="clearSearch"
      >
        ✕
      </button>
    </div>

    <!-- SEARCH RESULTS VIEW -->
    <section v-if="isSearching" class="chart-section" aria-label="Kết quả tìm kiếm">
      <div class="section-meta">
        <span class="section-title">Kết quả tìm kiếm cho "{{ searchQuery }}"</span>
        <span class="count-pill">{{ searchResults.length }} chữ</span>
      </div>

      <div v-if="searchResults.length === 0" class="empty-results ios-card">
        <span class="empty-icon">🍃</span>
        <p class="empty-title">Không tìm thấy chữ cái nào phù hợp</p>
        <p class="empty-sub">Hãy thử tìm bằng Romaji (ví dụ: a, ka, shi, chi, ryo) hoặc ký tự trực tiếp.</p>
        <button type="button" class="reset-btn ios-pressable" @click="clearSearch">Xem lại toàn bộ bảng</button>
      </div>

      <div v-else class="search-grid">
        <button
          v-for="item in searchResults"
          :key="item.romaji + item.hiragana"
          type="button"
          class="kana-cell ios-pressable"
          :class="{ 'is-playing': playingChar === (displayMode === 'katakana' ? item.katakana : item.hiragana) }"
          @click="openDetail(item)"
        >
          <!-- Dual or Single Primary Character -->
          <div class="cell-main-chars">
            <template v-if="displayMode === 'both'">
              <span class="primary-kana kana-hira">{{ item.hiragana }}</span>
              <span class="both-divider">·</span>
              <span class="primary-kana kana-kata">{{ item.katakana }}</span>
            </template>
            <template v-else-if="displayMode === 'katakana'">
              <span class="primary-kana kana-kata">{{ item.katakana }}</span>
              <span class="alt-corner">{{ item.hiragana }}</span>
            </template>
            <template v-else>
              <span class="primary-kana kana-hira">{{ item.hiragana }}</span>
              <span class="alt-corner">{{ item.katakana }}</span>
            </template>
          </div>

          <span class="romaji-label">{{ item.romaji }}</span>

          <button
            type="button"
            class="cell-speaker-btn"
            title="Nghe phát âm"
            @click.stop="playKana(item, $event)"
          >
            🔊
          </button>
        </button>
      </div>
    </section>

    <!-- NORMAL MATRIX CHART VIEW -->
    <section v-else class="chart-section" aria-label="Bảng chữ cái">
      <!-- 5-Column Grid Header Guide -->
      <div class="matrix-header" :class="{ 'yoon-header': activeGroup === 'yoon' }">
        <span
          v-for="(header, hIdx) in columnHeaders"
          :key="hIdx"
          class="header-col-label"
        >
          {{ header }}
        </span>
      </div>

      <!-- Rows of Kana -->
      <div class="rows-container">
        <div
          v-for="row in currentRows"
          :key="row.rowName"
          class="kana-row-group ios-card"
        >
          <div class="row-header">
            <span class="row-title">{{ row.rowName }}</span>
          </div>

          <div class="row-grid" :class="{ 'yoon-grid': activeGroup === 'yoon' }">
            <template v-for="(item, itemIdx) in row.items" :key="item ? item.romaji : `empty-${itemIdx}`">
              <!-- Empty Slot in Traditional Matrix -->
              <div v-if="!item" class="empty-cell" aria-hidden="true">
                <span class="empty-dot"></span>
              </div>

              <!-- Filled Kana Tile -->
              <button
                v-else
                type="button"
                class="kana-cell ios-pressable"
                :class="{ 'is-playing': playingChar === (displayMode === 'katakana' ? item.katakana : item.hiragana) }"
                @click="openDetail(item)"
              >
                <!-- Character Display -->
                <div class="cell-main-chars">
                  <template v-if="displayMode === 'both'">
                    <span class="primary-kana kana-hira">{{ item.hiragana }}</span>
                    <span class="both-divider">·</span>
                    <span class="primary-kana kana-kata">{{ item.katakana }}</span>
                  </template>
                  <template v-else-if="displayMode === 'katakana'">
                    <span class="primary-kana kana-kata">{{ item.katakana }}</span>
                    <span class="alt-corner">{{ item.hiragana }}</span>
                  </template>
                  <template v-else>
                    <span class="primary-kana kana-hira">{{ item.hiragana }}</span>
                    <span class="alt-corner">{{ item.katakana }}</span>
                  </template>
                </div>

                <span class="romaji-label">{{ item.romaji }}</span>

                <button
                  type="button"
                  class="cell-speaker-btn"
                  title="Nghe phát âm"
                  @click.stop="playKana(item, $event)"
                >
                  🔊
                </button>
              </button>
            </template>
          </div>
        </div>
      </div>
    </section>

    <!-- CHARACTER DETAIL BOTTOM SHEET MODAL -->
    <Teleport to="body">
      <div v-if="isDetailOpen && selectedItem" class="detail-backdrop" @click="closeDetail">
        <div class="detail-sheet" @click.stop>
          <div class="drag-bar"></div>

          <div class="sheet-top-row">
            <div class="sheet-badge">
              <span>{{ selectedItem.row }}</span>
              <span class="badge-dot-small"></span>
              <span>{{ selectedItem.group === 'seion' ? 'Âm cơ bản' : selectedItem.group === 'dakuon' ? 'Âm đục' : 'Ảo âm' }}</span>
            </div>
            <button type="button" class="sheet-close-btn" @click="closeDetail">✕</button>
          </div>

          <!-- Giant Characters Side-by-Side -->
          <div class="giant-chars-box">
            <div class="char-pair-item">
              <span class="giant-kana kana-hira">{{ selectedItem.hiragana }}</span>
              <span class="char-type-pill">Hiragana</span>
            </div>

            <div class="char-vs">⇌</div>

            <div class="char-pair-item">
              <span class="giant-kana kana-kata">{{ selectedItem.katakana }}</span>
              <span class="char-type-pill">Katakana</span>
            </div>
          </div>

          <!-- Pronounce and Romaji Bar -->
          <div class="romaji-banner">
            <div class="romaji-info">
              <span class="romaji-big">{{ selectedItem.romaji }}</span>
              <span class="romaji-sub">Phiên âm Latin chuẩn</span>
            </div>
            <button
              type="button"
              class="giant-audio-btn ios-pressable"
              @click="playKana(selectedItem)"
            >
              <span>🔊</span>
              <span>Nghe Phát Âm</span>
            </button>
          </div>

          <!-- Example Vocabulary Word (if available) -->
          <div v-if="selectedItem.example" class="example-box">
            <div class="example-header">
              <span class="example-tag">VÍ DỤ TỪ VỰNG</span>
              <span v-if="selectedItem.strokeCount" class="stroke-tag">✍️ {{ selectedItem.strokeCount }} nét viết</span>
            </div>
            <div class="example-content">
              <span class="example-emoji">{{ selectedItem.example.emoji }}</span>
              <div class="example-text">
                <div class="example-jp">
                  <strong>{{ selectedItem.example.word }}</strong>
                  <span class="example-romaji">({{ selectedItem.example.romaji }})</span>
                </div>
                <div class="example-vn">{{ selectedItem.example.meaning }}</div>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="sheet-actions">
            <button
              type="button"
              class="action-btn-primary ios-pressable"
              @click="goToWriting(selectedItem)"
            >
              <span>✍️ Luyện Viết Chữ Này</span>
            </button>
            <a
              href="#/hiragana-flashcards"
              class="action-btn-secondary ios-pressable"
            >
              <span>🃏 Học Thẻ Flashcard</span>
            </a>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.alphabet-page {
  min-height: 100dvh;
  max-width: 520px;
  margin: 0 auto;
  padding: calc(var(--sat) + 0.75rem) 0.85rem calc(var(--sab) + 1.75rem);
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  box-sizing: border-box;
}

/* ── Top Nav ── */
.top-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}

.back-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--color-ink);
  text-decoration: none;
  padding: 0.45rem 0.85rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.9);
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.05);
}

.title-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 0.85rem;
  border-radius: 999px;
  background: rgba(250, 245, 255, 0.9);
  border: 1px solid #e9d5ff;
  color: #7e22ce;
  font-size: 0.78rem;
  font-weight: 800;
}

.badge-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #a855f7;
  box-shadow: 0 0 6px #a855f7;
}

.char-count-badge {
  font-size: 0.75rem;
  font-weight: 800;
  color: #475569;
  background: rgba(241, 245, 249, 0.9);
  padding: 0.38rem 0.75rem;
  border-radius: 999px;
  border: 1px solid #e2e8f0;
}

/* ── Intro Banner ── */
.intro-card {
  padding: 1.1rem 1.15rem;
  border-radius: 22px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.96) 0%, rgba(250, 245, 255, 0.92) 100%);
  border: 1.5px solid rgba(233, 213, 255, 0.6);
  box-shadow: 0 6px 20px rgba(126, 34, 206, 0.06);
}

.intro-title {
  font-size: 1.15rem;
  font-weight: 800;
  color: #1e1b4b;
  margin: 0 0 0.25rem;
  line-height: 1.25;
}

.intro-sub {
  font-size: 0.78rem;
  color: #64748b;
  margin: 0;
  line-height: 1.35;
}

.intro-icon-group {
  display: flex;
  align-items: center;
  position: relative;
  width: 68px;
  height: 48px;
  flex-shrink: 0;
}

.bubble {
  position: absolute;
  width: 38px;
  height: 38px;
  border-radius: 14px;
  display: grid;
  place-items: center;
  font-family: 'M PLUS Rounded 1c', sans-serif;
  font-weight: 800;
  font-size: 1.25rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.bubble-1 {
  left: 0;
  top: 4px;
  background: linear-gradient(135deg, #7e22ce, #a855f7);
  color: #fff;
  z-index: 1;
}

.bubble-2 {
  right: 0;
  bottom: 4px;
  background: linear-gradient(135deg, #0284c7, #38bdf8);
  color: #fff;
  z-index: 2;
}

/* ── Segmented Control (Hiragana / Katakana / Song song) ── */
.script-segmented-card {
  padding: 0.35rem;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.88);
}

.segmented-control {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.35rem;
}

.seg-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0.45rem 0.3rem;
  border: 1.5px solid transparent;
  border-radius: 14px;
  background: transparent;
  color: #64748b;
  cursor: pointer;
  transition: all 0.18s ease;
  font-family: inherit;
}

.seg-char {
  font-family: 'M PLUS Rounded 1c', sans-serif;
  font-size: 1.15rem;
  font-weight: 800;
  line-height: 1.1;
}

.seg-label {
  font-size: 0.68rem;
  font-weight: 800;
  margin-top: 0.15rem;
}

.seg-btn-active {
  background: #ffffff;
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.08);
}

.hira-active {
  border-color: #7e22ce;
  color: #7e22ce;
}

.kata-active {
  border-color: #0284c7;
  color: #0284c7;
}

.both-active {
  border-color: #0d9488;
  color: #0d9488;
}

/* ── Group Tabs (Cơ bản / Âm đục / Ảo âm) ── */
.group-tabs-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.45rem;
}

.group-tab {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.55rem 0.5rem;
  border: 1.5px solid #e2e8f0;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.85);
  cursor: pointer;
  transition: all 0.18s ease;
  font-family: inherit;
  text-align: left;
}

.tab-emoji {
  font-size: 1.05rem;
  flex-shrink: 0;
}

.tab-copy {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.tab-title {
  font-size: 0.76rem;
  font-weight: 800;
  color: var(--color-ink);
  white-space: nowrap;
}

.tab-sub {
  font-size: 0.62rem;
  color: #94a3b8;
  font-weight: 700;
  white-space: nowrap;
}

.group-tab-active {
  border-color: #7e22ce;
  background: linear-gradient(135deg, #7e22ce, #9333ea);
  box-shadow: 0 4px 14px rgba(126, 34, 206, 0.25);
}

.group-tab-active .tab-title,
.group-tab-active .tab-sub {
  color: #ffffff;
}

/* ── Search Bar ── */
.search-bar-wrap {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.85rem;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.95);
}

.search-icon {
  font-size: 0.95rem;
  color: #94a3b8;
}

.search-input {
  flex: 1;
  border: none;
  background: transparent;
  font-family: inherit;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-ink);
  outline: none;
}

.search-input::placeholder {
  color: #94a3b8;
  font-weight: 500;
}

.clear-search-btn {
  border: none;
  background: #f1f5f9;
  color: #64748b;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-size: 0.72rem;
  cursor: pointer;
}

/* ── Chart Layout ── */
.chart-section {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.matrix-header {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.4rem;
  padding: 0 0.4rem;
}

.matrix-header.yoon-header {
  grid-template-columns: repeat(3, 1fr);
}

.header-col-label {
  text-align: center;
  font-size: 0.65rem;
  font-weight: 800;
  color: #64748b;
  letter-spacing: 0.02em;
}

.rows-container {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.kana-row-group {
  padding: 0.65rem 0.65rem 0.75rem;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  background: rgba(255, 255, 255, 0.92);
}

.row-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.row-title {
  font-size: 0.72rem;
  font-weight: 800;
  color: #475569;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.row-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.4rem;
}

.row-grid.yoon-grid {
  grid-template-columns: repeat(3, 1fr);
}

/* ── Kana Cell Tile ── */
.kana-cell {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0.6rem 0.2rem 0.45rem;
  min-height: 68px;
  background: #f8fafc;
  border: 1.5px solid #e2e8f0;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.15s ease;
  font-family: inherit;
  box-shadow: 0 2px 6px rgba(15, 23, 42, 0.02);
}

.kana-cell:hover {
  border-color: #c084fc;
  background: #faf5ff;
  transform: translateY(-1px);
}

.kana-cell:active {
  transform: scale(0.96);
}

.kana-cell.is-playing {
  border-color: #7e22ce;
  background: #f3e8ff;
  box-shadow: 0 0 0 3px rgba(126, 34, 206, 0.2);
}

.cell-main-chars {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.2rem;
  position: relative;
  width: 100%;
}

.primary-kana {
  font-family: 'M PLUS Rounded 1c', sans-serif;
  font-size: 1.45rem;
  font-weight: 900;
  line-height: 1.15;
}

.kana-hira {
  color: #7e22ce;
}

.kana-kata {
  color: #0284c7;
}

.both-divider {
  font-size: 1rem;
  font-weight: 800;
  color: #94a3b8;
}

.alt-corner {
  position: absolute;
  top: -4px;
  right: 2px;
  font-family: 'M PLUS Rounded 1c', sans-serif;
  font-size: 0.65rem;
  font-weight: 800;
  color: #94a3b8;
}

.romaji-label {
  font-size: 0.72rem;
  font-weight: 800;
  color: #475569;
  margin-top: 0.15rem;
}

.cell-speaker-btn {
  position: absolute;
  bottom: 3px;
  right: 3px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: none;
  background: transparent;
  font-size: 0.62rem;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.5;
  cursor: pointer;
}

.kana-cell:hover .cell-speaker-btn {
  opacity: 1;
}

.empty-cell {
  min-height: 68px;
  border-radius: 16px;
  border: 1.5px dashed #e2e8f0;
  display: grid;
  place-items: center;
  background: rgba(248, 250, 252, 0.4);
}

.empty-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #cbd5e1;
}

/* ── Search Grid View ── */
.search-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
}

.section-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.35rem;
}

.section-title {
  font-size: 0.78rem;
  font-weight: 800;
  color: #475569;
}

.count-pill {
  font-size: 0.7rem;
  font-weight: 800;
  background: #e0e7ff;
  color: #4338ca;
  padding: 0.2rem 0.55rem;
  border-radius: 999px;
}

.empty-results {
  padding: 2rem 1rem;
  text-align: center;
  border-radius: 20px;
}

.empty-icon {
  font-size: 2.2rem;
  display: block;
  margin-bottom: 0.5rem;
}

.empty-title {
  font-size: 0.92rem;
  font-weight: 800;
  color: var(--color-ink);
  margin: 0 0 0.35rem;
}

.empty-sub {
  font-size: 0.78rem;
  color: #64748b;
  margin: 0 0 1rem;
}

.reset-btn {
  padding: 0.5rem 1rem;
  border-radius: 999px;
  border: none;
  background: #7e22ce;
  color: #fff;
  font-weight: 800;
  font-size: 0.8rem;
  cursor: pointer;
}

/* ── Bottom Sheet Detail Modal ── */
.detail-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.5);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  z-index: 999;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  animation: fadeIn 0.2s ease-out both;
}

.detail-sheet {
  width: 100%;
  max-width: 480px;
  background: #ffffff;
  border-radius: 28px 28px 0 0;
  padding: 0.75rem 1.25rem calc(var(--sab) + 1.25rem);
  box-shadow: 0 -10px 40px rgba(0, 0, 0, 0.16);
  display: flex;
  flex-direction: column;
  gap: 0.95rem;
  animation: slideUp 0.28s cubic-bezier(0.16, 1, 0.3, 1) both;
}

.drag-bar {
  width: 36px;
  height: 4px;
  border-radius: 999px;
  background: #cbd5e1;
  align-self: center;
}

.sheet-top-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.sheet-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.75rem;
  font-weight: 800;
  color: #64748b;
  background: #f1f5f9;
  padding: 0.25rem 0.65rem;
  border-radius: 999px;
}

.badge-dot-small {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #94a3b8;
}

.sheet-close-btn {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #f1f5f9;
  border: none;
  color: #64748b;
  font-weight: 800;
  cursor: pointer;
  display: grid;
  place-items: center;
}

.giant-chars-box {
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 1.15rem 0.5rem;
  background: linear-gradient(135deg, #faf5ff 0%, #f0fdf4 100%);
  border-radius: 22px;
  border: 1px solid #e9d5ff;
}

.char-pair-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
}

.giant-kana {
  font-family: 'M PLUS Rounded 1c', sans-serif;
  font-size: 3.6rem;
  font-weight: 900;
  line-height: 1;
}

.char-type-pill {
  font-size: 0.72rem;
  font-weight: 800;
  color: #64748b;
  background: rgba(255, 255, 255, 0.85);
  padding: 0.15rem 0.55rem;
  border-radius: 999px;
  border: 1px solid #e2e8f0;
}

.char-vs {
  font-size: 1.5rem;
  color: #94a3b8;
  font-weight: 700;
}

.romaji-banner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  background: #f8fafc;
  border: 1.5px solid #e2e8f0;
  border-radius: 18px;
}

.romaji-big {
  font-size: 1.45rem;
  font-weight: 900;
  color: #1e293b;
  display: block;
}

.romaji-sub {
  font-size: 0.68rem;
  font-weight: 700;
  color: #64748b;
}

.giant-audio-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.6rem 1rem;
  border-radius: 999px;
  border: none;
  background: linear-gradient(135deg, #7e22ce, #9333ea);
  color: #fff;
  font-size: 0.82rem;
  font-weight: 800;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(126, 34, 206, 0.25);
}

.example-box {
  padding: 0.85rem 1rem;
  border-radius: 18px;
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.example-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.example-tag {
  font-size: 0.65rem;
  font-weight: 900;
  color: #15803d;
  letter-spacing: 0.04em;
}

.stroke-tag {
  font-size: 0.68rem;
  font-weight: 800;
  color: #047857;
}

.example-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.example-emoji {
  font-size: 1.9rem;
}

.example-jp {
  font-size: 1.05rem;
  color: #0f172a;
}

.example-jp strong {
  font-family: 'M PLUS Rounded 1c', sans-serif;
  margin-right: 0.35rem;
}

.example-romaji {
  font-size: 0.8rem;
  color: #64748b;
  font-weight: 700;
}

.example-vn {
  font-size: 0.82rem;
  color: #166534;
  font-weight: 700;
}

.sheet-actions {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 0.25rem;
}

.action-btn-primary {
  width: 100%;
  padding: 0.85rem;
  border-radius: 16px;
  border: none;
  background: linear-gradient(135deg, #0d9488, #0284c7);
  color: #fff;
  font-size: 0.92rem;
  font-weight: 800;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(13, 148, 136, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
}

.action-btn-secondary {
  width: 100%;
  padding: 0.75rem;
  border-radius: 16px;
  border: 1.5px solid #e2e8f0;
  background: #ffffff;
  color: #475569;
  font-size: 0.85rem;
  font-weight: 800;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
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
