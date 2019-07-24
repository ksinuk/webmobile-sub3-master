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
    <!-- user book mark list-->
    <div class="my-5">
      <p style="font-size: 2rem;">BOOKMARK</p>
      <v-layout row wrap>
          <v-flex>
              <carousel per-page="3">
                  <slide v-for="bookmark in bookmarkList" class="px-2">
                      <v-card>
                          <v-img
                          :src="bookmark.img"
                          height="200px"
                          >
                          </v-img>

                          <v-card-title primary-title>
                          <div>
                              <div class="headline">{{ bookmark.title }}</div>
                              <div>
                                <tr>
                                  <td v-for="hashtag in bookmark.hashtags">
                                    <v-chip color="teal" text-color="white">
                                      <v-avatar>
                                          <v-icon>check_circle</v-icon>
                                      </v-avatar>
                                      {{ hashtag }}
                                    </v-chip>
                                  </td>
                                </tr>
                              </div>
                          </div>
                          </v-card-title>
                          <v-card-actions>
                              <v-btn flat color="purple">Explore</v-btn>
                              <v-spacer></v-spacer>
                          </v-card-actions>
                      </v-card>
                  </slide>
              </carousel>
          </v-flex>
      </v-layout>
    </div>
    <!-- user edit modal -->
  </div>
</template>

<script>
import firebase from 'firebase'
import FirebaseServices from '../services/FirebaseServices'
import UserProfileBtn from './UserProfileBtn.vue'
import { Carousel, Slide } from 'vue-carousel';

// import UserProfileBtn from './UserProfileTestBtn.vue'

export default {
  name: 'UserProfile',
  components: {
    UserProfileBtn,
    Carousel,
    Slide
  },
  data () {
    return {
      dialog: false,
      photoURL: this.$store.state.firebaseUser.photoURL,
      bookmarkList: []
    }
  },
  created() {
    this.viewProfile()
    this.viewBookmark()
  },
  methods: {
    viewProfile: function() {
      this.photoURL = this.$store.state.firebaseUser.photoURL
    },
    async viewBookmark() {
      var bookmarks = await FirebaseServices.getPortfolios();
      var user = await FirebaseServices.currentUser();
      for (let book in bookmarks) {
        if (user.bookmark.includes(bookmarks[book].pk)) {
          this.bookmarkList.push(bookmarks[book])
        }
      }
      console.log(this.bookmarkList)
    }
  }
}
</script>

<style>
.profileImg {
  margin: 10px;
}
</style>
