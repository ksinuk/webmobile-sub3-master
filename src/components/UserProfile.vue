<template>
  <div>
    <!-- user profile -->
    <v-layout row mt-5>
      <v-flex md4>
        <v-card flat color="transparent">
          <v-avatar
            size="256"
            class="profileImg"
          >
            <img :src="photoURL ? photoURL:this.$store.state.imgSrc.noImgSrc" alt="avatar">
          </v-avatar>
          <div>
            <v-btn small>My portfolio</v-btn>
            
            <UserProfileBtn :photoURL="photoURL" :displayName="displayName"/>

          </div>
        </v-card>
      </v-flex>
      
      <v-flex md8>
        <v-card>
          <v-card-text>유저 상태정보(권한 등)</v-card-text>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">portfolio 제작 정도</h3>
              <div>내용물</div>
            </div>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>

    <!-- user edit modal -->
  </div>
</template>

<script>
import firebase from 'firebase'
import UserProfileBtn from './UserProfileBtn.vue'
// import UserProfileBtn from './UserProfileTestBtn.vue'

export default {
  name: 'UserProfile',
  components: {
    UserProfileBtn
  },
  data () {
    return {
      dialog: false,
      photoURL: this.$store.state.firebaseUser.photoURL,
    }
  },
  created() {
    this.viewProfile()
  },
  methods: {
    viewProfile: function() {
      this.photoURL = this.$store.state.firebaseUser.photoURL
    }
  }
}
</script>

<style>
.profileImg {
  margin: 10px;
}
</style>
