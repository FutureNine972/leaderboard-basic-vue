<template>
  <div class="flex h-full">
    <div class="flex-1 bg-amber-300 grid grid-cols-1 lg:grid-cols-2 gap-5 p-10">
      <CourseView @playerSelected="onPlayerSelected" v-for="course in courseData" :course="course" />
    </div>
    <div class="w-1/3 bg-cyan-300 p-10">
      <PlayerDetails v-if="currentPlayer" :player="currentPlayer" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CourseView from './components/CourseView.vue'
import PlayerDetails from './components/PlayerDetails.vue'
import { courseData } from './utils/constants.js'

const currentPlayer = ref(null)

function onPlayerSelected(player) {
  currentPlayer.value = player
}

</script>