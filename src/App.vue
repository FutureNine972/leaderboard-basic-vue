<template>
  <div class="flex h-full">
    <div class="flex-1 bg-amber-300 grid grid-cols-1 lg:grid-cols-2 gap-5 p-10">
      <CourseView @playerSelected="onPlayerSelected" v-for="course in courseData" :course="course" />
    </div>
    <div class="w-1/3 bg-cyan-300 p-10">
      <div class="flex flex-col gap-y-3 bg-purple-700 hover:bg-purple-500 text-white font-bold py-2 px-4 rounded">
        <button @click="load">Refresh</button>
      </div>
      <div class="p-5">
        <PlayerDetails v-if="currentPlayer" :player="currentPlayer" />
      </div>
      <div class="size-16 px-1 py-1.5" :class="currentColor">
        <h2>Courses Loaded</h2>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref, onMounted, computed } from 'vue'
import CourseView from './components/CourseView.vue'
import PlayerDetails from './components/PlayerDetails.vue'

const colors = [
  'text-red-400',
  'text-orange-400',
  'text-yellow-400',
  'text-green-400',
  'text-blue-400',
  'text-purple-400',
]

const currentPlayer = ref(null)

const courseData = ref([])

const colorSelected = ref(colors.length - 1)
const currentColor = computed(() => colors[colorSelected.value % colors.length])
function loadNewColor() {
  colorSelected.value = colorSelected.value + 1
}

function onPlayerSelected(player) {
  currentPlayer.value = player
}

onMounted(async () => {
  await load()
})

async function load() {
  const { data, status } = await axios.get(
    "http://localhost:5174/courses"
  )
  if (status == 200) {
    courseData.value = data
    loadNewColor()
  } else {
    console.error("Failed to load data")
  }
}

</script>