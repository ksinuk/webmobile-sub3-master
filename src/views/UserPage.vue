<template>
  <v-container>
    <UserProfile/>
  </v-container>
</template>

<script>
import FirebaseServices from '../services/FirebaseServices'
import UserProfile from '../components/UserProfile'

export default {
  name: 'userprofile',
  components: {
      UserProfile
  },
  data () {
    return {
    }
  },
  created() {
    this.getState()
  },
  methods: {
    getState() {
      FirebaseServices.userState()
    }
  }
}
</script>

<style scoped>
  
</style>

