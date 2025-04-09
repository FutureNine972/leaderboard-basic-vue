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
        <div class="flex flex-col gap-y-3 bg-blue-700 hover:bg-blue-500 text-white font-bold rounded">
          <button @click="load" class=" py-2 px-4 h-full w-full snap-center hover:cursor-pointer"><Arrow-PathIcon class="size-6 text-yellow-300" /></button>
        </div>
        <div class="p-5">
          <PlayerDetails v-if="currentPlayer" :player="currentPlayer" />
        </div>
        <button class="py-2 bg-blue-700 hover:bg-blue-500 text-white font-bold rounded hover:cursor-pointer w-full" @click="showCourseMenu">Add Course</button>
        <div class="size-16 px-1 py-1.5" :class="currentColor">
          <h2>Courses Loaded</h2>
        </div>
      </div>

      <!-- Add -->
      <div v-if="mode === 'add'">
        <AddCourseView
        @returnToMainMenu="mode='default'"
        />
      </div>

      <!-- Edit -->
      <div v-if="mode === 'edit'">
        <EditCourseView @returnToMainMenu="mode='default'":courseId="editId"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, inject} from 'vue'
import CourseView from './components/CourseView.vue'
import PlayerDetails from './components/PlayerDetails.vue'
import AddCourseView from './components/AddCourseView.vue'
import EditCourseView from './components/EditCourseView.vue'
import { ArrowPathIcon } from '@heroicons/vue/24/solid'

const courseStore = inject("course_store")

const colors = [
  'text-red-400',
  'text-orange-400',
  'text-yellow-400',
  'text-green-400',
  'text-blue-400',
  'text-purple-400',
]

const currentPlayer = ref(null)

const courseData = computed(() => courseStore.courses)

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
  await courseStore.load()
  
  loadNewColor()
}

</script>