<template>
    <div>
        <p>Run Details</p>
        <table>
            <thead>
                <tr>
                    <th><img width="20" :src="`https://www.mkleaderboards.com/images/flags/${player.country}.png`" />
                    </th>
                    <th>{{ player.name }}</th>
                    <th>{{ player.finalTime }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="lap in player.lapTimes">
                    <td colspan="2" align="center">Lap {{ lap.order }}</td>
                    <td colspan="1">{{ lap.time }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
const props = defineProps({
    player: {
        type: Object,
        required: true
    }
})
</script>