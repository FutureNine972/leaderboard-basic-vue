<template>
  <div class="flex h-full">
    <div class="flex-1 bg-gray-800 text-white grid grid-cols-1 lg:grid-cols-2 gap-5 p-10">
      <CourseView
      @onEditModeActivate="showEditMenu"
      @playerSelected="onPlayerSelected"
      v-for="course in courseData"
      :course="course"
      />
    </div>
    <div class="w-1/3 bg-gray-600 text-white p-10">
      <!-- Default -->
      <div v-if="mode === 'default'">
        <div class="flex flex-col gap-y-3 bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded">
          <button @click="load" class="px-40"><Arrow-PathIcon class="size-6 text-yellow-300" /></button>
        </div>
        <div class="p-5">
          <PlayerDetails v-if="currentPlayer" :player="currentPlayer" />
        </div>
        <div class="size-16 px-1 py-1.5" :class="currentColor">
          <h2>Courses Loaded</h2>
        </div>
        <button class="py-2 bg-blue-700 hover:bg-blue-500 text-white font-bold rounded hover:cursor-pointer w-full" @click="showCourseMenu">Add Course</button>
      </div>

      <!-- Add -->
      <div v-if="mode === 'add'">
        <AddCourseView
        @onCancelClick="mode='default'"
        />
      </div>

      <!-- Edit -->
      <div v-if="mode === 'edit'">
        <div class="flex flex-col gap-y-3 bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded">
          <button @click="mode='default'">Cancel</button>
        </div>
        <p>{{ editId }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref, onMounted, computed } from 'vue'
import CourseView from './components/CourseView.vue'
import PlayerDetails from './components/PlayerDetails.vue'
import AddCourseView from './components/AddCourseView.vue'
import { ArrowPathIcon } from '@heroicons/vue/24/solid'

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

const editId = ref(null)

const mode = ref('default')

const colorSelected = ref(colors.length - 1)
const currentColor = computed(() => colors[colorSelected.value % colors.length])
function loadNewColor() {
  colorSelected.value = colorSelected.value + 1
}

function showCourseMenu() {
  mode.value='add'
}
function showEditMenu(courseId) {
  mode.value='edit'
  editId.value = courseId
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