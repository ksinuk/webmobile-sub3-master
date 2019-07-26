<template>
    <v-layout row justify-center align-center style="min-height: 50vh; position: relative; background-size: cover; background-image: url('img/backBanner.png');">
        <slot name="pageName"/>
    </v-layout>
</template>

<script>
export default {
    name: 'BackBanner',
    data () {
        return {
        }
    }
}
</script>