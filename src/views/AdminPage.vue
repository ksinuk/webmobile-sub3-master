<template>
  <v-container>
    <h1>admin page</h1>

    <AdminUser/>

  </v-container>
</template>

<script>
import AdminUser from '../components/AdminUser'

export default {
  name: 'adminpage',
  components: {
    AdminUser
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style scoped>
  
</style>

