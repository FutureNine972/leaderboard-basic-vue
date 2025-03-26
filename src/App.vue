<template>
  <div id="course-container" align="center">
    <CourseView @playerSelected="onPlayerSelected" v-for="course in courseData" :course="course" />
    <PlayerDetails v-if="currentPlayer" :player="currentPlayer" />
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