My Intro to Vue
======

### Introduction
This is one of the many repos used to display my progress on web dev, as well as the frontend for my basic leaderboard learning project.

![(Preview)](images/preview.png)

These are the top three times on two tracks in Mario Kart 8 Deluxe (full leaderboards can be found at [MKLeaderboards](https://www.mkleaderboards.com/mk8dx)), you click on a row and their splits for each lap will show for the track the player is listed under. You can also create your own boards and modify the names (although you can't add player information or laps at the moment).

![(Preview)](images/preview2.png)

When you create a board, you will be automatically returned to the main menu with the new board in place.

#### Strong practice with core language
This was completed using:

* Vue
* JavaScript
* Pinia  *NEW!*
* Tailwind CSS
* HTML

Updates:

* Axios PATCH and DELETE Requests
* Finished menus for adding, updating, and deleting courses
  * Name and Lap Count text input in the form submission (although for now the Lap Count doesnt mean anything)
* Color theme was already established, but made the course views give off a more structured feel with a non-transparent but still grayish blue background.

This will not function correctly alone; don't forget about the [backend](https://github.com/FutureNine972/leaderboard-basic-flask) repo. Stick them both in one parent folder and then complete the necessary tasks for the backend virtual environment and frontend npm startup.

###### JavaScript - EditCourseView
```js
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
```

###### Pinia
```js
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
```