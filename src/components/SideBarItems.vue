<template>
  <v-container id="sideCtn">
    <!-- sidebar에서 제공되는 검색 기능 -->
    <v-flex>
      <v-text-field
        label="Search"
        v-model="searchItem"
        v-on:keyup.enter="findItem"
      ></v-text-field>
    </v-flex>

    <v-btn @click="logoutUser">로그아웃</v-btn>
    <div v-for="item in routeItems">
      <!-- <v-btn
        v-if="item.name == 'userpage'"
        flat
        :to="{ name: 'userpage', params: { userId: }}">
        {{ item.name }}
      </v-btn> -->
      <v-btn
      flat
      :to="item.path">
        {{ item.name }}
      </v-btn>
    </div>
  </v-container>
</template>

<script>
import FirebaseServices from '../services/FirebaseServices'
import firebase from 'firebase'

export default {
  name: 'sideBarItems',
  data() {
    return {
      userId: null,
      routeItems: [],
      searchItem: null
    }
  },
  created() {
    this.$router.options.routes.forEach(route => {
      this.routeItems.push({
        name: route.name,
        path: route.path
      })
    })
  },
  methods: {
    findItem: function() {
      console.log(this.searchItem)
      this.$router.push('/search/' + this.searchItem)
      window.location.reload()
    },
    // getUser() {
    //   let _user = firebase.auth().currentUser
    //   this.userId = _user.displayName
    // },
    logoutUser() {
      FirebaseServices.logoutUser()
      alert('bye')
    }
  }
}
</script>

<style scoped>
#sideCtn {
  margin-top: 70px;
}
</style>

