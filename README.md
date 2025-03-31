My Intro to Vue
======

### Introduction
This is one of the many repos used to display my progress on web dev, as well as the frontend for my basic leaderboard learning project.

![(Preview)](images/preview.png)

These are the top three times on two tracks in Mario Kart 8 Deluxe (full leaderboards can be found at [MKLeaderboards](https://www.mkleaderboards.com/mk8dx)), you click on a row and their splits for each lap will show for the track the player is listed under.

#### Strong practice with core language
This was completed using:

* Vue
* JavaScript
* Tailwind CSS
* HTML

Updates:

* Axios GET Request
* A button that resends that request and changes the color of the "Courses Loaded" text to confirm status 200.

This will not function correctly alone; don't forget about the [backend](https://github.com/FutureNine972/leaderboard-basic-flask) repo. Stick them both in one parent folder and then complete the necessary tasks for the backend virtual environment and frontend npm startup.

###### JavaScript - Axios GET Request

```js
onMounted(async () => {
  await load()
})

async function load() {
  const { data, status } = await axios.get(
    "http://localhost:5174/courses"
  )
  if (status == 200) {
    courseData.value = data
    loadNewColor() // Changes the color of the "Courses Loaded" text element, just to show the button and request both work.
  } else {
    console.error("Failed to load data")
  }
}
```