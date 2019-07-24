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
              <div>{{percent}}</div>
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


/*
import FirebaseService from '@/services/FirebaseServices'
import PortfolioList from '@/components/PortfolioList.vue'
import Introduce from '@/components/Introduce.vue'

export default {

    name: 'portfolio',
    components: {
        ImageBanner,
        PortfolioList,
        Introduce
    },
    data(){
        return {
            portfolios:[],
            intros:[],
            introp:[],
            css:1,

        }
    },

    mounted(){
        this.getMyPortfolio()
        this.getMyIntro()
    },
    methods :{
        async getMyPortfolio(){
      //  var user = FirebaseService.auth().currentUser;
        //유저정보에 따라 구현
        this.portfolios = await FirebaseService.getPortfolios()



      },
*/
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
      bookmarkList: [],
      percent: 0
    }
  },
  created() {
    this.viewProfile()
    this.viewBookmark()

  },
  mounted(){
      this.getPortfolio()
  }
  ,
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
    },
    async getPortfolio(){
      console.log('test')
      var user = await FirebaseServices.currentUser();
      if(user){
        console.log(user.uid);
      }
      else{
        console.log('유저정보 가져오기 실패');
      }
      let portfolio = await FirebaseServices.getPortfolio(user.uid);
      console.log("test"+portfolio.type)
      let count =0;
      let totalCount =3;
      totalCount+= (8*portfolio.portfolios.length);
      totalCount+= (3*portfolio.skills.length);
      if(portfolio.aboutme!='') count++;
      if(portfolio.hashtags.length!=0) count++;
      if(portfolio.type!=0) count++;
      let temp = portfolio.portfolios;
      for(let i=0; i<portfolio.portfolios.length;i++){
        if(temp[i].content!='') count++;
        if(temp[i].demo_url!='') count++;
        if(temp[i].git.length!=0) count++;
        if(temp[i].ie_support!='') count++;
        if(temp[i].img!='') count++;
        if(temp[i].repos_url!='') count++;
        if(temp[i].title!='') count++;
        if(temp[i].viewport!='') count++;
      }
      let temp2 = portfolio.skills;
      for(let i=0; i<temp2.length;i++){
        if(temp2[i].description !='') count++;
        if(temp2[i].level !=0) count++;
        if(temp2[i].skillname !='') count++;
      }
      console.log(count);
      console.log(totalCount);
      this.percent = (count/totalCount)*100;
      console.log(this.percent);
    }

  }
}
</script>

<style>
.profileImg {
  margin: 10px;
}
</style>
