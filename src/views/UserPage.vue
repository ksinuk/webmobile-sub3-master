<template>
  <div>
    <BackBanner>
      <div slot="pageName">
        <p style="font-size: 3rem; font-weight: 300; letter-spacing: 0.08rem; text-shadow: 2px 2px 2px #103b5b; color: white;">User Page</p>
      </div>
    </BackBanner>
    <div style="display: flex;">
      <!-- <UserDrawer/> -->
      <UserProfile/>
    </div>
    <UserBookMark/>
  </div>
</template>

<script>
import FirebaseServices from '../services/FirebaseServices'
import BackBanner from '../components/BackBanner'
// import UserProfile from '../components/UserProfile'
import UserProfile from '../components/userVues/UserProfile.vue'
import UserDrawer from '../components/userVues/UserDrawer.vue'
import UserBookMark from '../components/userVues/UserBookMark.vue'


export default {
  name: 'userprofile',
  components: {
      BackBanner,
      UserProfile,
      UserDrawer,
      UserBookMark
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

