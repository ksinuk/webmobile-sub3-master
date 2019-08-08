<template>
  <v-container id="sideCtn">
    <!-- vuex에서 유저 이름을 가져와서 router로 연결 -->
    <!-- 로그인 상태확인 해서 보여줌 -->
    <div v-show="this.$store.state.firebaseUser.inUser">
      <img :src="this.$store.state.firebaseUser.photoURL" style="border-radius: 50%; height: 8rem; width: 8rem;">
      <h1 style="padding-top: 1rem; color: white;">{{ this.$store.state.firebaseUser.name }}</h1>
      <v-btn small @click="logoutUser" color="error">Logout</v-btn>
      <v-divider/>
      <v-btn active-class="active" flat block :to="{name: 'userpage', params: { userId: this.$store.state.firebaseUser.name }}">My Page</v-btn>
    </div>
    <div v-show="!this.$store.state.firebaseUser.inUser">
      <!-- 로그인 되어 있으면 가림 -->
      <v-btn small color="info" to="/login">Login</v-btn>
      <v-divider/>
    </div>
    <div>
      <v-btn active-class="active" flat block to="/board">board</v-btn>
      <v-btn active-class="active" flat block to="/portfoliopage">my portfolio</v-btn>
      <v-btn active-class="active" flat block to="/mainPortfoliopage">other portfolio</v-btn>
      <!-- 제공되는 검색 기능 -->
      <v-flex>
        <v-text-field
          label="Search"
          v-model="searchItem"
          v-on:keyup.enter="findItem"
          color="white"
          ></v-text-field>
      </v-flex>
      <div>
        <v-btn round depressed small>임베디드</v-btn>
      </div>
    </div>
  </v-container>
</template>

<script>
import FirebaseServices from "../services/FirebaseServices";

export default {
  name: "sideBarItems",
  data() {
    return {
      userImg: null,
      searchItem: null
    }
  },
  methods: {
    closeDrawer(trigger) {
      this.$EventBus.$emit(trigger)
    },
    logoutUser() {
      FirebaseServices.logoutUser()
      this.closeDrawer('Logout')
    },
    findItem: function() {
      console.log(this.searchItem)
      this.$router.push("/search/" + this.searchItem)
      window.location.reload()
    }
  }
};
</script>

<style scoped>
#sideCtn {
  margin-top: 70px;
}
.active {
  background-color: #4caf50;
}
</style>
