<template>
  <div class=" h-fit border-blue-300 bg-transparent px-4 py-2 rounded-md border-4">
    <div class="flex grid-cols-2 gap-35">
      <p>{{ course.name }}</p>
      <div class=" bg-blue-700 hover:bg-blue-500 text-white font-bold px-10 rounded">
        <button @click="onEditClicked" class=""><Pencil-Icon class="size-6 text-yellow-300" /></button>
      </div>
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
          <td class='m-10' align="center"><img width="20" :src="`https://www.mkleaderboards.com/images/flags/${player.country}.png`" /></td>
          <td>{{ player.name }}</td>
          <td>{{ player.finalTime }}</td>
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
import { computed } from 'vue'
import { PencilIcon } from '@heroicons/vue/24/solid'
const props = defineProps({
  course: {
    type: Object,
    required: true
  }
})

const emit = defineEmits([
    "playerSelected",
    "onEditModeActivate"
  ])

const flagImg = computed(() => {
  return `https://www.mkleaderboards.com/images/flags/${course.players.country}.png`
})

function onEditClicked() {
  emit("onEditModeActivate", props.course.id)
}

function onPlayerClicked(player) {
  emit("playerSelected", player)
}
</script>