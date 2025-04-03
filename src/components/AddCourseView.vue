<template>
    <div class="flex flex-col gap-y-8 border-blue-700 bg-transparent px-4 py-2 rounded-md border-4">
        <h1>Add Course</h1>
        <div class="flex flex-col gap-y-2">
            <span>Name</span>
            <input v-model="newCourse.name" placeholder="Name" class=" placeholder-blue-200" />
            <span>Lap Count</span>
            <input v-model="newCourse.lapCount" placeholder="Lap Count" class=" placeholder-blue-200" />
        </div>
        <div class="flex gap-x-30 w-full justify-center">
            <button @click="onAddClick">Add</button>
            <button @click="emit('onCancelClick')">Cancel</button>
        </div>
    </div>
</template>

<script setup>

import { ref } from 'vue'
import axios from 'axios'

const emit = defineEmits([
    "onCancelClick"
])

const newCourse = ref({})

async function onAddClick() {
    const response = await axios.post(
        "http://localhost:5174/courses",
        newCourse.value
    )
    console.log(response)
    if (response.status == 201) {
        alert(`${newCourse.value.name} has been successfully created with ${newCourse.value.lapCount} laps!`)
    } else {
        console.error("Failed to add course")
    }
}

</script>