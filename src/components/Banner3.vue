<template>
  <v-layout row justify-center align-center style="min-height: 100vh; position: relative; background-size: cover; background-image: linear-gradient(to top, rgba(255, 255, 255, 0.75), rgba(255, 255, 255, 0.75)), url('');">
    <v-flex>
        <h1 style="color: black; font-size: 3rem; font-weight: 300; letter-spacing: 0.08rem;" v-model="title"></h1>
        <p style="color: black;" v-model="subtitle"></p>
    </v-flex>
  </v-layout>
</template>

<script>
import firebase from 'firebase/app'

export default {
  name: 'Banner3',
  data() {
      return {
          image: null
      }
  },
  props: {
      banner: {type: String},
      title: {type: String},
      subtitle: {type: String},
      user: {type: String}
  },
  created() {
      this.getSrc();
  },
  methods: {
      getSrc: function() {
          var storage = firebase.storage();
          console.log(this.banner);
          var storageRef = storage.ref(this.user + '/' + this.banner);
          this.image = storageRef.child(this.user + '/' + this.banner).getDownloadURL().then(function(url) {
              console.log(url);
              return url
          })
      }
  }
}
</script>