<template>
  <v-layout row justify-center>
      <v-flex>
        <v-avatar
          v-show="photoURL"
          size="256"
          class="profileImg"
        >
          <img 
          id=image
          :src="photoURL" alt="avatar">
        </v-avatar>

        <v-avatar
          v-show="!photoURL"
          size="256"
          class="profileImg"
        >
          <img 
          id=image
          :src="this.$store.state.imgSrc.noImgSrc" alt="avatar">
        </v-avatar>

        <input id=file type=file @change="uploadImage">
      </v-flex>
  </v-layout>
</template>

<script>
import FirebaseServices from '../services/FirebaseServices'

export default {
  name: 'UserProfileBtn',
  components: {
  },
  data () {
    return {
      dialog: false,
      photoURL: this.$store.state.firebaseUser.photoURL,
    }
  },
  created() {
  },
  methods: {
    uploadImage() {
      let file = document.getElementById('file')
      let image = document.getElementById('image')

      let target = event.currentTarget
      let xmlHttpRequest = new XMLHttpRequest()
      xmlHttpRequest.open('POST', 'https://api.imgur.com/3/image/', true)
      xmlHttpRequest.setRequestHeader("Authorization", this.$store.state.imgurID)
      xmlHttpRequest.send(target.files[0])

      xmlHttpRequest.onreadystatechange = () => {
        if (xmlHttpRequest.readyState == 4) {
          if (xmlHttpRequest.status == 200) {
            let result = JSON.parse(xmlHttpRequest.responseText)
            this.photoURL = result.data.link
            console.log(this.photoURL)
            // console.log(thisCopy.photoURL)
          } else {
            alert("업로드 실패")
            this.photoURL = "http://dy.gnch.or.kr/img/no-image.jpg"
          }
        }
      }
    }
  }
}
</script>

<style>

</style>
