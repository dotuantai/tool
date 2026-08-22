<script setup lang="ts">
// MenuPage — Optimized for iPhone 14 Pro & Modern Mobile
</script>

<template>
  <div class="menu-container">
    <!-- Top Bar / Brand Header -->
    <header class="menu-header">
      <div class="brand-pill">
        <span class="brand-icon">✨</span>
        <span class="brand-badge">LinguaLearn Pro</span>
      </div>
      <h1 class="menu-title">Chọn Chế Độ Học</h1>
      <p class="menu-subtitle">Học ngoại ngữ thông minh & ghi nhớ dài lâu</p>
    </header>

    <!-- Cards List -->
    <main class="menu-list">
      <!-- 1. Tiếng Anh Card -->
      <a href="#/english" class="mode-item english-theme">
        <div class="item-left">
          <div class="icon-avatar en-avatar">
            <span>🇬🇧</span>
          </div>
        </div>
        <div class="item-content">
          <div class="item-meta">
            <span class="category-tag en-tag">TIẾNG ANH</span>
            <span class="type-pill">21 Từ vựng</span>
          </div>
          <h2 class="item-title">Học Từ Vựng & Mẹo Nhớ</h2>
          <p class="item-desc">Trắc nghiệm nghĩa từ kèm mẹo liên tưởng độc đáo.</p>
        </div>
        <div class="item-arrow">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
            <path fill-rule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clip-rule="evenodd" />
          </svg>
        </div>
      </a>

      <!-- 2. Trắc nghiệm Hiragana Card -->
      <a href="#/japanese-quiz" class="mode-item quiz-theme">
        <div class="item-left">
          <div class="icon-avatar jp-avatar">
            <span class="jp-kanji">日</span>
          </div>
        </div>
        <div class="item-content">
          <div class="item-meta">
            <span class="category-tag jp-tag">TIẾNG NHẬT</span>
            <span class="type-pill">46 Ký tự</span>
          </div>
          <h2 class="item-title">Trắc Nghiệm Hiragana</h2>
          <p class="item-desc">Đoán chữ ↔ Romaji với 3 chế độ xáo trộn linh hoạt.</p>
        </div>
        <div class="item-arrow">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
            <path fill-rule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clip-rule="evenodd" />
          </svg>
        </div>
      </a>

      <!-- 3. Trắc nghiệm Katakana Card -->
      <a href="#/katakana-quiz" class="mode-item kata-theme">
        <div class="item-left">
          <div class="icon-avatar kata-avatar">
            <span class="kata-char">ア</span>
          </div>
        </div>
        <div class="item-content">
          <div class="item-meta">
            <span class="category-tag kata-tag">TIẾNG NHẬT</span>
            <span class="type-pill">46 Ký tự</span>
          </div>
          <h2 class="item-title">Trắc Nghiệm Katakana</h2>
          <p class="item-desc">Đoán chữ ↔ Romaji với 3 chế độ xáo trộn linh hoạt.</p>
        </div>
        <div class="item-arrow">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
            <path fill-rule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clip-rule="evenodd" />
          </svg>
        </div>
      </a>
    </main>

    <!-- Bottom Motivational Footer -->
    <footer class="menu-footer">
      <div class="streak-pill">
        <span>🔥</span>
        <span>Mục tiêu: 10 phút luyện tập mỗi ngày</span>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.menu-container {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 480px;
  margin: 0 auto;
  padding: calc(var(--sat) + 1.25rem) 1.25rem calc(var(--sab) + 1.5rem);
  box-sizing: border-box;
}

/* ── Header ── */
.menu-header {
  text-align: center;
  padding-top: 0.5rem;
  padding-bottom: 1.25rem;
  animation: slideDown 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
}

.brand-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.35rem 0.85rem;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.9);
  border-radius: 999px;
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.04);
  margin-bottom: 0.75rem;
}

.brand-icon {
  font-size: 0.9rem;
}

.brand-badge {
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  background: linear-gradient(135deg, #0d9488 0%, #0284c7 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.menu-title {
  font-family: 'Source Serif 4', serif;
  font-size: clamp(1.75rem, 6.5vw, 2.25rem);
  font-weight: 700;
  color: var(--color-ink);
  margin: 0 0 0.35rem;
  letter-spacing: -0.02em;
  line-height: 1.2;
}

.menu-subtitle {
  font-size: 0.875rem;
  color: var(--color-muted);
  margin: 0;
  font-weight: 500;
}

/* ── List Layout ── */
.menu-list {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  flex: 1;
  justify-content: center;
  padding: 0.25rem 0;
}

/* ── Mode Item Card ── */
.mode-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.15rem 1.15rem;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1.5px solid rgba(255, 255, 255, 0.85);
  border-radius: 24px;
  text-decoration: none;
  color: inherit;
  box-shadow: 0 8px 24px -4px rgba(15, 23, 42, 0.05), 0 2px 6px -1px rgba(15, 23, 42, 0.02);
  transition: transform 0.18s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.18s ease, border-color 0.18s ease;
  user-select: none;
  -webkit-user-select: none;
  position: relative;
  overflow: hidden;
  animation: fadeUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
}

.mode-item:nth-child(1) { animation-delay: 0.08s; }
.mode-item:nth-child(2) { animation-delay: 0.16s; }
.mode-item:nth-child(3) { animation-delay: 0.24s; }

.mode-item:active {
  transform: scale(0.97);
  box-shadow: 0 4px 12px -2px rgba(15, 23, 42, 0.04);
}

/* ── Left Avatar ── */
.icon-avatar {
  width: 54px;
  height: 54px;
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  flex-shrink: 0;
  box-shadow: 0 6px 16px -2px rgba(0, 0, 0, 0.06);
}

.en-avatar {
  background: linear-gradient(140deg, #dbeafe 0%, #bfdbfe 100%);
}

.jp-avatar {
  background: linear-gradient(140deg, #f3e8ff 0%, #e9d5ff 100%);
}

.kata-avatar {
  background: linear-gradient(140deg, #cffafe 0%, #a5f3fc 100%);
}

.jp-kanji {
  font-family: 'M PLUS Rounded 1c', sans-serif;
  font-size: 1.85rem;
  font-weight: 900;
  color: #7e22ce;
}

.kata-char {
  font-family: 'M PLUS Rounded 1c', sans-serif;
  font-size: 2rem;
  font-weight: 900;
  color: #0e7490;
}

/* ── Content ── */
.item-content {
  flex: 1;
  min-width: 0;
}

.item-meta {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: 0.25rem;
}

.category-tag {
  font-size: 0.65rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  padding: 0.15rem 0.45rem;
  border-radius: 6px;
}

.en-tag {
  background: #eff6ff;
  color: #1d4ed8;
}

.jp-tag {
  background: #faf5ff;
  color: #7e22ce;
}

.kata-tag {
  background: #ecfeff;
  color: #0e7490;
}

.type-pill {
  font-size: 0.65rem;
  font-weight: 600;
  color: var(--color-muted);
}

.item-title {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--color-ink);
  margin: 0 0 0.15rem;
  line-height: 1.3;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.item-desc {
  font-size: 0.78rem;
  color: var(--color-muted);
  margin: 0;
  line-height: 1.35;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* ── Right Arrow ── */
.item-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(241, 245, 249, 0.8);
  color: #94a3b8;
  flex-shrink: 0;
  transition: transform 0.15s ease, background 0.15s ease, color 0.15s ease;
}

.mode-item:active .item-arrow {
  transform: translateX(2px);
  background: #e2e8f0;
  color: var(--color-ink);
}

/* Specific theme highlights on active */
.english-theme:active { border-color: #93c5fd; }
.quiz-theme:active { border-color: #d8b4fe; }
.kata-theme:active { border-color: #67e8f9; }

/* ── Footer ── */
.menu-footer {
  text-align: center;
  padding-top: 1rem;
  padding-bottom: 0.25rem;
  animation: fadeUp 0.5s 0.3s cubic-bezier(0.16, 1, 0.3, 1) both;
}

.streak-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.78rem;
  font-weight: 600;
  color: #475569;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.8);
  padding: 0.4rem 0.9rem;
  border-radius: 999px;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.03);
}

/* ── Animations ── */
@keyframes slideDown {
  from { opacity: 0; transform: translateY(-16px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}
</style>