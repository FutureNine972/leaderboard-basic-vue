<template>
    <div class=" border-blue-600 bg-emerald-500 px-4 py-2 rounded-md border-4">
        <p>Run Details</p>
        <table>
            <thead>
                <tr>
                    <th  class="px-5 py-0.5" ><img width="20" :src="`https://www.mkleaderboards.com/images/flags/${player.country}.png`" />
                    </th>
                    <th>{{ player.name }}</th>
                    <th>{{ player.finalTime }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="lap in player.lapTimes">
                    <td colspan="2" align="center">Lap {{ lap.order }}</td>
                    <td class="px-5 py-0.5" colspan="1">{{ lap.time }}</td>
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