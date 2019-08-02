<template lang="html">

</template>

<script>

import FirebaseServices from '../services/FirebaseServices'
import firebase from 'firebase/app'
export default {
  name:'checkport',
  data() {
      return {
          item: [],
          banner: null,
          user: null,
          image: null
      }
  },

  methods : {
    getUserID() {
        let __this = this;
        const tmp = firebase.auth().onAuthStateChanged(function(user) {
            __this.user = user.uid;
    
        });
    }
  }
}
</script>

<style lang="css" scoped>
</style>
