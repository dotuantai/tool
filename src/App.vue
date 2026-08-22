<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import QuizPage from '@/pages/QuizPage.vue'
import KatakanaQuizPage from '@/pages/KatakanaQuizPage.vue'
import MenuPage from '@/pages/MenuPage.vue'
import JapaneseQuizPage from '@/pages/JapaneseQuizPage.vue'

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
  <KatakanaQuizPage  v-if="currentRoute === '#/katakana-quiz'" />
  <QuizPage          v-else-if="currentRoute === '#/english'" />
  <JapaneseQuizPage  v-else-if="currentRoute === '#/japanese-quiz'" />
  <MenuPage          v-else />
</template>
