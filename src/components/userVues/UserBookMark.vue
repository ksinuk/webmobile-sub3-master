<template>
  <div>
    <h1>북마크</h1>
    <div v-for="item in bookmarks">
      <h1>{{ item }}</h1>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import FirebaseServices from '../../services/FirebaseServices'

export default {
  name: 'UserBookMark',
  components: {

  },
  data () {
    return {
      // 북마크 저장용
      bookmarks: []
    }
  },
  created() {
    this.getBookmarks()
  },
  methods: {
    getBookmarks:  function() {
      let _this = this
      firebase.auth().onAuthStateChanged(async function(user){
        _this.bookmarkList = await FirebaseServices.getBookMarkFromUid(user.uid) 
        console.log("UserProfile _this.bookmarkList: ", _this.bookmarkList)           
      })
    },
  }
}
</script>

<style scoped>
  
</style>

