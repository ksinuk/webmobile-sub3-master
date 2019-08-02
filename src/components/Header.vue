<template>
  <nav>
    <v-flex>
      <v-toolbar absolute dark flat class="py-2" style="background: none;">
        <router-link :to="'/'" id="title">DevFolio</router-link>
      <v-spacer></v-spacer>
      <!-- 제공되는 검색 기능 -->
      <v-flex>
        <v-text-field
          label="Search"
          v-model="searchItem"
          v-on:keyup.enter="findItem"
          ></v-text-field>
      </v-flex>
      </v-toolbar>
      <!-- sidebar -->
      <v-navigation-drawer v-model="drawer" fixed stateless=true right class="grey lighten-3">
        <!-- sidebar list -->
        <SideBarItems/>
      </v-navigation-drawer>
      <!-- sidebar Btn -->
      <v-btn large flat color="grey" @click="drawer = !drawer" id="sideIcon">
        <div v-show="!drawer">
          <v-icon>fas fa-bars</v-icon>
        </div>
        <div v-show="drawer">
          <v-icon>fas fa-times</v-icon>
        </div>
      </v-btn>
    </v-flex>
  </nav>
</template>

<script>
import SideBarItems from './SideBarItems'
export default {
  name: 'Header',
  data() {
    return {
       drawer: false,
       searchItem: null,
    }
  },
  components: {
    SideBarItems
  },
  methods: {
    findItem: function() {
      console.log(this.searchItem)
      this.$router.push("/search/" + this.searchItem)
      window.location.reload()
    },
  }
}
</script>

<style scoped>
#title {
  padding-left: 10%;
  object-fit: cover;
  font-weight: 900; 
  text-transform: uppercase; 
  text-shadow: 2px 2px 2px #103b5b; 
  letter-spacing: .2em; 
  font-size: 3rem; 
  font-family: 'Passion One', cursive;
}
/* sideBtn 고정용 */
#sideIcon {
position: fixed;
z-index: 99;
top: 10px;
right: 10px;
}
</style>

