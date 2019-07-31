<template>
  <v-container id="sideCtn">
    <!-- vuex에서 유저 이름을 가져와서 router로 연결 -->
    <!-- 로그인 상태확인 해서 보여줌 -->
    <div v-show="this.$store.state.firebaseUser.inUser">
      <v-btn @click="logoutUser">로그아웃</v-btn>
      <h1>{{ this.$store.state.firebaseUser.name }}</h1>
      <v-btn flat :to="{name: 'userpage', params: { userId: this.$store.state.firebaseUser.name }}">My Page</v-btn>
    </div>

    <div>
      <!-- 로그인 되어 있으면 가림 -->
      <v-btn v-show="!this.$store.state.firebaseUser.inUser" flat to="/login">loginpage</v-btn>
      
      <v-btn flat to="/board">board</v-btn>
      <v-btn flat to="/write_portfolio">write_portfolio</v-btn>
    </div>
  </v-container>
</template>

<script>
import FirebaseServices from "../services/FirebaseServices";

export default {
  name: "sideBarItems",
  data() {
    return {

    }
  },
  methods: {
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
