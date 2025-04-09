<template>
    <div class="flex flex-col gap-y-8 border-blue-700 bg-transparent px-4 py-2 rounded-md border-4">
        <h1>Add Course</h1>
        <div class="flex flex-col gap-y-2">
            <span>Name</span>
            <input v-model="newCourse.name" placeholder="Name" class=" placeholder-blue-200" />
            <span>Lap Count</span>
            <input v-model="newCourse.lapCount" placeholder="Lap Count" class=" placeholder-blue-200" />
        </div>
        <div class="flex py-5 gap-x-10 rounded">
            <button @click="onAddClick" class="bg-blue-700 hover:bg-blue-500 text-white font-bold w-full h-full">Add</button>
            <button @click="emit('returnToMainMenu')" class="bg-red-700 hover:bg-red-500 text-white font-bold w-full h-full ml-2">Cancel</button>
        </div>
    </div>
</template>

<script setup>

import { ref, inject } from 'vue'

const newCourse = ref({})

const courseStore = inject("course_store")

const emit = defineEmits([
    "returnToMainMenu"
])

async function onAddClick() {
    const createdCourse = await courseStore.add(newCourse.value)
    emit('returnToMainMenu')
    if (createdCourse !== null) {
        // alert(`${createdCourse.name} has been successfully created with ID: ${createdCourse.id}`)
    }
}

</script>