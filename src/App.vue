<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import QuizPage from '@/pages/QuizPage.vue'
import KatakanaQuizPage from '@/pages/KatakanaQuizPage.vue'
import MenuPage from '@/pages/MenuPage.vue'
import JapaneseQuizPage from '@/pages/JapaneseQuizPage.vue'
import WritingPage from '@/pages/WritingPage.vue'
import HiraganaFlashcardPage from '@/pages/HiraganaFlashcardPage.vue'
import AlphabetChartPage from '@/pages/AlphabetChartPage.vue'

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
  <AlphabetChartPage v-if="currentRoute === '#/alphabet' || currentRoute === '#/characters'" />
  <WritingPage       v-else-if="currentRoute === '#/writing' || currentRoute === '#/hiragana-writing'" />
  <HiraganaFlashcardPage v-else-if="currentRoute === '#/hiragana-flashcards'" />
  <KatakanaQuizPage  v-else-if="currentRoute === '#/katakana-quiz'" />
  <QuizPage          v-else-if="currentRoute === '#/english'" />
  <JapaneseQuizPage  v-else-if="currentRoute === '#/japanese-quiz'" />
  <MenuPage          v-else />
</template>
