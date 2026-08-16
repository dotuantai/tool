<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import QuizPage from '@/pages/QuizPage.vue'
import HiraganaPage from '@/pages/HiraganaPage.vue'

const currentRoute = ref(window.location.hash)

function onHashChange() {
  currentRoute.value = window.location.hash
}

onMounted(() => {
  window.addEventListener('hashchange', onHashChange)
})

onUnmounted(() => {
  window.removeEventListener('hashchange', onHashChange)
})
</script>

<template>
  <div v-if="currentRoute === '#/hiragana'">
    <HiraganaPage />
  </div>
  <div v-else>
    <div class="absolute right-4 top-4 z-10">
      <a href="#/hiragana" class="rounded-full bg-teal-50 px-4 py-2 text-sm font-bold text-teal-700 shadow-sm transition hover:bg-teal-100 hover:shadow-md">
        Học Hiragana &rarr;
      </a>
    </div>
    <QuizPage />
  </div>
</template>
