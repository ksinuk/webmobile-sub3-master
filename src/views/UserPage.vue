<template>
  <div>
    <BackBanner>
      <div slot="pageName">
        <p style="font-size: 3rem; font-weight: 300; letter-spacing: 0.08rem; text-shadow: 2px 2px 2px #103b5b; color: white;">User Page</p>
      </div>
    </BackBanner>
    <v-container>
      <UserProfile/>
    </v-container>
  </div>
</template>

<script>
import FirebaseServices from '../services/FirebaseServices'
import BackBanner from '../components/BackBanner'
import UserProfile from '../components/UserProfile'


export default {
  name: 'userprofile',
  components: {
      BackBanner,
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

