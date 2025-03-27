<template>
  <div :id="containerId">
    <p>{{ course.name }}</p>
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
          <td align="center"><img width="20" :src="`https://www.mkleaderboards.com/images/flags/${player.country}.png`" /></td>
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
const props = defineProps({
  course: {
    type: Object,
    required: true
  }
})

const emit = defineEmits([
    "playerSelected"
  ])

const flagImg = computed(() => {
  return `https://www.mkleaderboards.com/images/flags/${course.players.country}.png`
})

const containerId = computed(() => {
  return `course-view-${props.course.id}`
})

function onPlayerClicked(player) {
  emit("playerSelected", player)
}
</script>