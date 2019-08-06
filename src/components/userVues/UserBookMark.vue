<template>
  <div>
    bookmark
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
    getBookmarks: function() {
      console.log(this.$store.state.firebaseUser.uid)
      // this.bookmarks = FirebaseServices.getBookMarkFromUid(this.$store.state.firebaseUser.uid)
      console.log("UserProfile th.bookmarkList: ", this.bookmarks)
    }
  }
}
</script>

<style scoped>
  
</style>

