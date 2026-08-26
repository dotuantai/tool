<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import type { KanaWritingItem, StrokePosition } from '@/data/hiraganaWriting'

interface Point {
  x: number
  y: number
}

interface Stroke {
  points: Point[]
  color: string
  width: number
}

const props = withDefaults(
  defineProps<{
    item: KanaWritingItem
    showGhost?: boolean
    showGrid?: boolean
    showStrokeOrder?: boolean
    isBlindTest?: boolean
  }>(),
  {
    showGhost: true,
    showGrid: true,
    showStrokeOrder: true,
    isBlindTest: false
  }
)

const emit = defineEmits<{
  (e: 'stroke-added', count: number): void
  (e: 'cleared'): void
}>()

const canvasRef = ref<HTMLCanvasElement | null>(null)
const containerRef = ref<HTMLDivElement | null>(null)

// Brush state
const inkColors = [
  { name: 'Mực đen', value: '#1e293b', label: '⚫' },
  { name: 'Xanh mực', value: '#2563eb', label: '🔵' },
  { name: 'Đỏ son', value: '#e11d48', label: '🔴' },
  { name: 'Xanh ngọc', value: '#0d9488', label: '🟢' },
  { name: 'Tím hoa', value: '#7e22ce', label: '🟣' }
]

const brushSizes = [
  { name: 'Mảnh', value: 4 },
  { name: 'Vừa', value: 7 },
  { name: 'Đậm', value: 11 }
]

const currentColor = ref('#1e293b')
const currentWidth = ref(7)
const strokes = ref<Stroke[]>([])
const isDrawing = ref(false)
const currentStroke = ref<Point[]>([])
const isAnimating = ref(false)
const animProgress = ref(0)

let ctx: CanvasRenderingContext2D | null = null
let dpr = 1
let cssSize = 320

function initCanvas() {
  const canvas = canvasRef.value
  const container = containerRef.value
  if (!canvas || !container) return

  dpr = window.devicePixelRatio || 1
  const rect = container.getBoundingClientRect()
  cssSize = Math.min(rect.width, 360) || 320

  canvas.width = cssSize * dpr
  canvas.height = cssSize * dpr
  canvas.style.width = `${cssSize}px`
  canvas.style.height = `${cssSize}px`

  ctx = canvas.getContext('2d')
  if (ctx) {
    ctx.scale(dpr, dpr)
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
  }
  redrawAll()
}

function redrawAll() {
  if (!ctx) return
  ctx.clearRect(0, 0, cssSize, cssSize)

  for (const stroke of strokes.value) {
    if (stroke.points.length === 0) continue
    ctx.strokeStyle = stroke.color
    ctx.lineWidth = stroke.width
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.beginPath()

    if (stroke.points.length === 1) {
      const p = stroke.points[0]!
      ctx.arc(p.x, p.y, stroke.width / 2, 0, Math.PI * 2)
      ctx.fillStyle = stroke.color
      ctx.fill()
    } else {
      ctx.moveTo(stroke.points[0]!.x, stroke.points[0]!.y)
      for (let i = 1; i < stroke.points.length - 1; i++) {
        const xc = (stroke.points[i]!.x + stroke.points[i + 1]!.x) / 2
        const yc = (stroke.points[i]!.y + stroke.points[i + 1]!.y) / 2
        ctx.quadraticCurveTo(stroke.points[i]!.x, stroke.points[i]!.y, xc, yc)
      }
      const last = stroke.points[stroke.points.length - 1]!
      ctx.lineTo(last.x, last.y)
      ctx.stroke()
    }
  }
}

function getPointerPos(e: PointerEvent): Point {
  const canvas = canvasRef.value
  if (!canvas) return { x: 0, y: 0 }
  const rect = canvas.getBoundingClientRect()
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  }
}

function onPointerDown(e: PointerEvent) {
  if (isAnimating.value) return
  const canvas = canvasRef.value
  if (!canvas) return
  canvas.setPointerCapture(e.pointerId)

  isDrawing.value = true
  const pos = getPointerPos(e)
  currentStroke.value = [pos]

  if (ctx) {
    ctx.strokeStyle = currentColor.value
    ctx.lineWidth = currentWidth.value
    ctx.beginPath()
    ctx.arc(pos.x, pos.y, currentWidth.value / 2, 0, Math.PI * 2)
    ctx.fillStyle = currentColor.value
    ctx.fill()
  }
}

function onPointerMove(e: PointerEvent) {
  if (!isDrawing.value || !ctx) return
  const pos = getPointerPos(e)
  currentStroke.value.push(pos)

  const pts = currentStroke.value
  if (pts.length > 2) {
    const p1 = pts[pts.length - 3]!
    const p2 = pts[pts.length - 2]!
    const p3 = pts[pts.length - 1]!
    const xc = (p2.x + p3.x) / 2
    const yc = (p2.y + p3.y) / 2

    ctx.strokeStyle = currentColor.value
    ctx.lineWidth = currentWidth.value
    ctx.beginPath()
    ctx.moveTo((p1.x + p2.x) / 2, (p1.y + p2.y) / 2)
    ctx.quadraticCurveTo(p2.x, p2.y, xc, yc)
    ctx.stroke()
  }
}

function onPointerUp(e: PointerEvent) {
  if (!isDrawing.value) return
  isDrawing.value = false
  if (currentStroke.value.length > 0) {
    strokes.value.push({
      points: [...currentStroke.value],
      color: currentColor.value,
      width: currentWidth.value
    })
    currentStroke.value = []
    redrawAll()
    emit('stroke-added', strokes.value.length)
  }
}

function onPointerCancel(e: PointerEvent) {
  isDrawing.value = false
  currentStroke.value = []
}

function clearCanvas() {
  strokes.value = []
  redrawAll()
  emit('cleared')
}

function undoStroke() {
  if (strokes.value.length > 0) {
    strokes.value.pop()
    redrawAll()
  }
}

let animTimer: number | null = null
function playStrokeAnimation() {
  if (isAnimating.value) return
  isAnimating.value = true
  animProgress.value = 0

  const totalSteps = props.item.strokeCount * 25
  let step = 0

  if (animTimer) clearInterval(animTimer)
  animTimer = window.setInterval(() => {
    step++
    animProgress.value = (step / totalSteps) * 100
    if (step >= totalSteps) {
      if (animTimer) clearInterval(animTimer)
      setTimeout(() => {
        isAnimating.value = false
        animProgress.value = 0
      }, 500)
    }
  }, 40)
}

watch(
  () => props.item.character,
  () => {
    clearCanvas()
  }
)

onMounted(() => {
  nextTick(() => {
    initCanvas()
    window.addEventListener('resize', initCanvas)
  })
})

onUnmounted(() => {
  window.removeEventListener('resize', initCanvas)
  if (animTimer) clearInterval(animTimer)
})

defineExpose({
  clearCanvas,
  undoStroke,
  playStrokeAnimation,
  getStrokesCount: () => strokes.value.length
})
</script>

<template>
  <div class="writing-board-wrapper">
    <!-- Main Drawing Box -->
    <div ref="containerRef" class="canvas-outer-card">
      <!-- 2x2 Japanese Genkouyoushi Practice Grid -->
      <div v-if="showGrid" class="genkouyoushi-grid">
        <div class="grid-cross horizontal"></div>
        <div class="grid-cross vertical"></div>
        <div class="grid-diagonal diag-1"></div>
        <div class="grid-diagonal diag-2"></div>
      </div>

      <!-- Ghost / Reference Character -->
      <div
        v-if="showGhost && !isBlindTest"
        class="ghost-character-layer"
        :class="{ 'ghost-animating': isAnimating }"
      >
        <span class="ghost-char">{{ item.character }}</span>
      </div>

      <!-- Stroke Order Number Indicators (①, ②, ③) -->
      <div
        v-if="showStrokeOrder && !isBlindTest && item.strokePositions && !isAnimating"
        class="stroke-order-markers"
      >
        <div
          v-for="pos in item.strokePositions"
          :key="pos.label"
          class="stroke-marker"
          :style="{ left: `${pos.x}%`, top: `${pos.y}%` }"
        >
          <span class="marker-number">{{ pos.label }}</span>
        </div>
      </div>

      <!-- Drawing Canvas -->
      <canvas
        ref="canvasRef"
        class="drawing-canvas"
        @pointerdown="onPointerDown"
        @pointermove="onPointerMove"
        @pointerup="onPointerUp"
        @pointercancel="onPointerCancel"
      ></canvas>

      <!-- Drawing Progress Bar for animation -->
      <div v-if="isAnimating" class="anim-progress-bar">
        <div class="anim-bar-fill" :style="{ width: `${animProgress}%` }"></div>
      </div>
    </div>

    <!-- Quick Tools Bar -->
    <div class="canvas-toolbar">
      <!-- Undo & Clear -->
      <div class="action-btn-group">
        <button
          type="button"
          class="tool-btn ios-pressable"
          title="Hoàn tác nét vẽ"
          :disabled="strokes.length === 0"
          @click="undoStroke"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
          </svg>
          <span>Lùi lại</span>
        </button>

        <button
          type="button"
          class="tool-btn ios-pressable delete-btn"
          title="Xóa trắng bảng vẽ"
          :disabled="strokes.length === 0"
          @click="clearCanvas"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
          </svg>
          <span>Xóa bảng</span>
        </button>
      </div>

      <!-- Color Selector -->
      <div class="color-palette">
        <button
          v-for="c in inkColors"
          :key="c.value"
          type="button"
          class="color-dot ios-pressable"
          :class="{ 'color-dot-active': currentColor === c.value }"
          :style="{ backgroundColor: c.value }"
          :title="c.name"
          @click="currentColor = c.value"
        ></button>
      </div>

      <!-- Brush Width Selector -->
      <div class="brush-size-group">
        <button
          v-for="b in brushSizes"
          :key="b.value"
          type="button"
          class="size-btn ios-pressable"
          :class="{ 'size-btn-active': currentWidth === b.value }"
          @click="currentWidth = b.value"
        >
          <span class="size-circle" :style="{ width: `${b.value + 4}px`, height: `${b.value + 4}px` }"></span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.writing-board-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.85rem;
  width: 100%;
}

/* ── Outer Canvas Card ── */
.canvas-outer-card {
  position: relative;
  width: 100%;
  max-width: 340px;
  aspect-ratio: 1 / 1;
  background: #ffffff;
  border-radius: 28px;
  border: 2px solid #e2e8f0;
  box-shadow:
    0 12px 36px -8px rgba(15, 23, 42, 0.08),
    0 4px 12px -2px rgba(15, 23, 42, 0.04),
    inset 0 0 0 1px rgba(255, 255, 255, 0.6);
  overflow: hidden;
  touch-action: none;
  user-select: none;
  -webkit-user-select: none;
}

/* ── Genkouyoushi Practice Grid ── */
.genkouyoushi-grid {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
}

.grid-cross {
  position: absolute;
  background: #cbd5e1;
}

.grid-cross.horizontal {
  top: 50%;
  left: 5%;
  right: 5%;
  height: 1.5px;
  transform: translateY(-50%);
  background-image: linear-gradient(to right, #94a3b8 40%, rgba(255,255,255,0) 0%);
  background-position: top;
  background-size: 8px 1.5px;
  background-repeat: repeat-x;
  background-color: transparent;
}

.grid-cross.vertical {
  left: 50%;
  top: 5%;
  bottom: 5%;
  width: 1.5px;
  transform: translateX(-50%);
  background-image: linear-gradient(to bottom, #94a3b8 40%, rgba(255,255,255,0) 0%);
  background-position: left;
  background-size: 1.5px 8px;
  background-repeat: repeat-y;
  background-color: transparent;
}

.grid-diagonal {
  position: absolute;
  inset: 12%;
  border: 1px dashed rgba(203, 213, 225, 0.6);
  border-radius: 12px;
}

/* ── Ghost Character Overlay ── */
.ghost-character-layer {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  z-index: 2;
}

.ghost-char {
  font-family: 'M PLUS Rounded 1c', 'Yu Gothic', 'Hiragino Sans', sans-serif;
  font-size: clamp(8.5rem, 42vw, 13rem);
  font-weight: 800;
  color: rgba(148, 163, 184, 0.28);
  line-height: 1;
  transform: translateY(-4%);
  transition: opacity 0.3s ease, transform 0.3s ease, color 0.3s ease;
}

.ghost-animating .ghost-char {
  color: rgba(13, 148, 136, 0.65);
  animation: pulseGhost 1.2s infinite ease-in-out;
}

@keyframes pulseGhost {
  0%, 100% { transform: translateY(-4%) scale(1); opacity: 0.8; }
  50% { transform: translateY(-4%) scale(1.03); opacity: 1; }
}

/* ── Stroke Order Markers ── */
.stroke-order-markers {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 3;
}

.stroke-marker {
  position: absolute;
  transform: translate(-50%, -50%);
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: #0d9488;
  color: #ffffff;
  font-size: 0.72rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 6px rgba(13, 148, 136, 0.4), 0 0 0 2px #ffffff;
  animation: popIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) both;
}

@keyframes popIn {
  from { transform: translate(-50%, -50%) scale(0); opacity: 0; }
  to { transform: translate(-50%, -50%) scale(1); opacity: 1; }
}

/* ── Drawing Canvas ── */
.drawing-canvas {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 4;
  cursor: crosshair;
  touch-action: none;
}

/* ── Animation Progress Bar ── */
.anim-progress-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: rgba(13, 148, 136, 0.15);
  z-index: 5;
}

.anim-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #0d9488, #0284c7);
  transition: width 0.05s linear;
}

/* ── Canvas Toolbar ── */
.canvas-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 340px;
  padding: 0.4rem 0.6rem;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  box-shadow: 0 4px 16px -2px rgba(15, 23, 42, 0.05);
}

.action-btn-group {
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

.tool-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.4rem 0.65rem;
  background: #f1f5f9;
  border: none;
  border-radius: 12px;
  font-size: 0.76rem;
  font-weight: 700;
  color: #475569;
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease, opacity 0.15s ease;
}

.tool-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.delete-btn {
  color: #e11d48;
  background: #ffe4e6;
}

.delete-btn:disabled {
  background: #f1f5f9;
  color: #94a3b8;
}

/* ── Color Palette ── */
.color-palette {
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

.color-dot {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #ffffff;
  cursor: pointer;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.color-dot-active {
  transform: scale(1.25);
  box-shadow: 0 0 0 2px #0d9488, 0 2px 6px rgba(0, 0, 0, 0.2);
}

/* ── Brush Sizes ── */
.brush-size-group {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.size-btn {
  width: 26px;
  height: 26px;
  border-radius: 8px;
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.size-btn-active {
  background: #e2e8f0;
}

.size-circle {
  border-radius: 50%;
  background: #475569;
}
</style>
