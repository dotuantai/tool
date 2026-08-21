<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import QuizPage from '@/pages/QuizPage.vue'
import HiraganaPage from '@/pages/HiraganaPage.vue'
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
  <HiraganaPage    v-if="currentRoute === '#/hiragana'" />
  <QuizPage        v-else-if="currentRoute === '#/english'" />
  <JapaneseQuizPage v-else-if="currentRoute === '#/japanese-quiz'" />
  <MenuPage        v-else />
</template>
