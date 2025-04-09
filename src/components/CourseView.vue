<template>
  <div class=" flex flex-col h-fit border-blue-300 bg-gray-700 px-4 py-2 gap-y-4 rounded-md border-4">
    <div class="flex w-full items-center gap-x-4">
      <span class="flex grow">{{ course.name }}</span>
      <button @click="onEditClicked"
        class=" p-1.5 bg-blue-700 hover:bg-blue-500 hover:cursor-pointer rounded-sm"><Pencil-Icon class="h-6 w-6 text-yellow-300" /></button>
      <button @click="onDeleteClicked"
        class=" p-1.5 bg-red-700 hover:bg-red-500 hover:cursor-pointer rounded-sm"><Trash-Icon
          class="h-6 w-6 text-yellow-300" /></button>
    </div>
    <table>
      <thead>
        <tr>
          <th>Country</th>
          <th>Player</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>
        <tr @click="onPlayerClicked(player)" v-for="player in course.players">
          <td align="center"><img width="20"
              :src="`https://www.mkleaderboards.com/images/flags/${player.country}.png`" /></td>
          <td align="center" class=' px-5 py-0.5'>{{ player.name }}</td>
          <td align="center">{{ player.finalTime }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {

  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>

<script setup>
import { PencilIcon, TrashIcon } from '@heroicons/vue/24/solid'
import { inject } from 'vue'
const props = defineProps({
  course: {
    type: Object,
    required: true
  }
})

const courseStore = inject("course_store")

const emit = defineEmits([
  "playerSelected",
  "onEditModeActivate"
])

function onEditClicked() {
  emit("onEditModeActivate", props.course.id)
}

function onPlayerClicked(player) {
  emit("playerSelected", player)
}

async function onDeleteClicked() {
  await courseStore.remove(props.course.id)
}
</script>