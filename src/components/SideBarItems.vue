<template>
  <v-container id="sideCtn">
    <!-- sidebar에서 제공되는 검색 기능 -->

    <v-flex>
      <v-text-field label="Search" v-model="searchItem" v-on:keyup.enter="findItem"></v-text-field>
    </v-flex>

    <!-- vuex에서 유저 이름을 가져와서 router로 연결 -->
    <!-- 로그인 상태확인 해서 보여줌 -->
    <div v-show="this.$store.state.firebaseUser.inUser">
      <v-btn @click="logoutUser">로그아웃</v-btn>
      <h1>{{ this.$store.state.firebaseUser.name }}</h1>
      <router-link :to="{name: 'userpage', params: { userId: this.$store.state.firebaseUser.name }}">My Page</router-link>
    </div>
    
    <div v-for="item in routeItems">
      <v-btn flat :to="item.path">{{ item.name }}</v-btn>
    </div>
  </v-container>
</template>

<script>
import FirebaseServices from "../services/FirebaseServices";

export default {
  name: "sideBarItems",
  data() {
    return {
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
  methods: {
    findItem: function() {
      console.log(this.searchItem)
      this.$router.push("/search/" + this.searchItem)
      window.location.reload()
    },
    logoutUser() {
      FirebaseServices.logoutUser()
    },
  }
};
</script>

<style scoped>
#sideCtn {
  margin-top: 70px;
}
</style>
