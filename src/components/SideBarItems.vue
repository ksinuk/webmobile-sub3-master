<template>
  <v-container id="sideCtn">
    <!-- sidebar에서 제공되는 검색 기능 -->

    <v-flex>
      <v-text-field label="Search" v-model="searchItem" v-on:keyup.enter="findItem"></v-text-field>
    </v-flex>

    <!-- <h1>{{ this.$store.state.firebaseUser.name }}</h1> -->
    <h1>{{ userName }}</h1>

    <v-btn @click="logoutUser">로그아웃</v-btn>


    <!-- <router-link :to="{name: 'userpage', params: {userId: this.$store.state.firebaseUser.name }}">League</router-link> -->
    <router-link :to="{name: 'userpage', params: {userId: userName }}">League</router-link>

    <div v-for="item in routeItems">
      <v-btn flat :to="item.path">{{ item.name }}</v-btn>
    </div>
  </v-container>
</template>

<script>
import FirebaseServices from "../services/FirebaseServices";
import firebase from "firebase";

export default {
  name: "sideBarItems",
  data() {
    return {
      userName: '123',
      routeItems: [],
      searchItem: null
    };
  },
  created() {
    this.$router.options.routes.forEach(route => {
      this.routeItems.push({
        name: route.name,
        path: route.path
      })
    })
  },
  computed: {
    getName() {
      return console.log(this.$store.state.firebaseUser.name)
    }
  },
  methods: {
    findItem: function() {
      console.log(this.searchItem)
      this.$router.push("/search/" + this.searchItem)
      window.location.reload();
    },
    logoutUser() {
      FirebaseServices.logoutUser()
    }
  }
};
</script>

<style scoped>
#sideCtn {
  margin-top: 70px;
}
</style>

