<template>
    <div class="flex flex-col gap-y-8 border-blue-700 bg-transparent px-4 py-2 rounded-md border-4">
        <h1>Edit Course</h1>
        <div class="flex flex-col gap-y-2">
            <span>Name</span>
            <input v-model="editCourse.name" placeholder="Name" class=" placeholder-blue-200 opacity-75" />
            <span>Lap Count</span>
            <input v-model="editCourse.lapCount" placeholder="Lap Count" class=" placeholder-blue-200 opacity-75" />
        </div>
        <div class="flex py-5 gap-x-10 rounded">
            <button class="bg-blue-700 hover:bg-blue-500 text-white font-bold w-full h-full" @click="onSaveClick">Save</button>
            <button class="bg-red-700 hover:bg-red-500 text-white font-bold w-full h-full ml-2" @click="emit('returnToMainMenu')">Cancel</button>
        </div>
    </div>
</template>

<script setup>
import { ref, inject, watchEffect } from 'vue'

const props = defineProps({
    courseId: {
        type: Number,
        required: true
    }
})

const emit = defineEmits([
    "returnToMainMenu"
])

const courseStore = inject("course_store")

const editCourse = ref({})

watchEffect(
    () => {
        const existingCourse = courseStore.getCourseById(props.courseId)
        
        if (existingCourse !== null) {
            editCourse.value = {
                ...existingCourse
            }
        }
    }
)

async function onSaveClick() {
    const savedCourse = await courseStore.update(editCourse.value)
    emit('returnToMainMenu')
    if (savedCourse !== null) {
        // alert(`${createdCourse.name} has been successfully created with ID: ${createdCourse.id}`)
    }
}


</script>