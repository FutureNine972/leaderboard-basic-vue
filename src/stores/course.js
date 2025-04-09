import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useCourseStore = defineStore('course', () => {
  const courses = ref([])

  async function load() {
    const { data, status } = await axios.get(
      "http://localhost:5174/courses"
    )
    if (status == 200) {
      courses.value = data
    } else {
      console.error("Failed to load data")
    }
  }

  async function add(payload) {
    const response = await axios.post(
      "http://localhost:5174/courses",
      payload
    )

    if (response.status == 201) {
      const newCourse = response.data

      courses.value.push(newCourse)

      return newCourse      
    }
    
    console.error("Failed to add course")

    return null
  }

  async function update(payload) {
    const response = await axios.patch(
      `http://localhost:5174/courses/${payload.id}/`,
      payload
    )

    if (response.status == 200) {
      const savedCourse = response.data
      const index = courses.value.findIndex(c => c.id === savedCourse.id);
      courses.value[index] = savedCourse
    }
    
    console.error("Failed to save course")

    return null
  }

  async function remove(courseId) {
    const response = await axios.delete(
      `http://localhost:5174/courses/${courseId}/`
    )

    if (response.status == 200) {
      courses.value = courses.value.filter(c => c.id !== courseId)
      return true
    }
    
    console.error("Failed to delete course")

    return false
  }

  function getCourseById(rawCourseId) {
    const courseId = parseInt(rawCourseId)
    const matches = courses.value.filter(
      (c) => c.id === courseId
    )

    return matches.length === 1 ? matches[0] : null
  }

  return {
    courses,
    load,
    add,
    update,
    remove,
    getCourseById
  }
})