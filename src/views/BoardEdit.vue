<template>
  <div>
    <BackBanner/>
    <v-container >
      <BoardEditForm/>
    </v-container>
  <Footer/>
  </div>
</template>

<script>
import BackBanner from '@/components/BackBanner.vue'
import BoardEditForm from '@/components/BoardEditForm.vue'
import Footer from '@/components/Footer.vue'

export default {
    name: 'BoardEdit',
    components: {
        BackBanner,
        BoardEditForm,
        Footer
    },
    data() {
      return {
      }
    },
    methods: {
    }
}
</script>

