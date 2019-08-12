<template>
  <div>
    <v-layout id="userBanner">
      <v-container>
        <v-layout style="margin-top: 9rem; margin-bottom: 1rem;">
          <v-flex>
            <v-avatar tile size="256" class="profileImg">
              <img :src="careerData.userImg" alt="avatar" style="border-radius: 50%;">
            </v-avatar>
          </v-flex>
          <!-- 수정페이지 -->
          <v-flex style="margin-bottom: 1rem; text-align: left;">
            <p style="color: #2c3e50; font-size: 3.5rem; font-family: 'Jua', sans-serif;">{{ this.userData.userData.displayName }}</p>
            <p style="font-size: 1.5rem; font-family: 'Jua', sans-serif;"><span style="color: #D3D3D3; padding-right: 1rem;">경력</span><span style="color: white;">{{ careerData.selected.career[0] }}</span></p>
            <p style="font-size: 1.5rem; font-family: 'Jua', sans-serif;"><span style="color: #D3D3D3; padding-right: 1rem;">직군</span><span style="color: white;">{{ careerData.selected.recruit[0] }}</span></p>
            <p style="font-size: 1.5rem; font-family: 'Jua', sans-serif;"><span style="color: #D3D3D3; padding-right: 1rem;">기술</span><span style="color: white;">{{ careerData.selected.tool[0] }}</span></p>
          </v-flex>
        </v-layout>
        <v-layout class="my-4" style="padding-bottom: 3rem;">
          <UserDialog v-bind:careerData="careerData"/>
        </v-layout>
      </v-container>
    </v-layout>
    <v-container>
      <v-card elevation="15" style="margin-top: -5.5rem;">
        <v-card-text>
          <v-layout>
            <v-flex>
              <v-icon>far fa-eye</v-icon>
              <p>페이지 조회수</p>
              <p style="color: #7883B2; font-size: 2rem; margin-bottom: 0; font-weight: bolder;">{{ this.userData.spark.cnt }}</p>
            </v-flex>
            <v-flex>
              <v-icon>far fa-calendar-check</v-icon>
              <p>계정 생성</p>
              <p style="color: #7883B2; font-size: 2rem; margin-bottom: 0; font-weight: bolder;">{{ this.userData.userData.created_at }}</p>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-container>
    <v-container>
      <v-flex>
        <!-- 투명색 지정 -->
        <v-card flat color="rgb(0, 0, 0, 0)">
          <v-layout row style="margin-top: 3rem;">
            <v-flex>
              <p style="color: #2c3e50; font-size: 3rem; font-family: 'Jua', sans-serif;">ACTIVITIES</p>
              <!-- 뷰 길이가 3 이상 -->
              <v-layout v-show="spark" my-3>
                <v-card flat>
                  <v-sheet
                    color="green"
                    max-width="calc(100%)"
                  >
                    <v-sparkline
                      :labels="this.userData.spark.labels"
                      :value="this.userData.spark.value"
                      color="white"
                      line-width="1"
                      padding="16"
                    ></v-sparkline>
                  </v-sheet>
                </v-card>
              </v-layout>
              <!-- 뷰 길이가 3 이하 -->
              <v-layout v-show="!spark" my-3>
                <v-card flat>
                  <v-sheet
                    color="green"
                    max-width="calc(100%)"
                  >
                    <v-sparkline
                      :labels="this.examSpark.labels"
                      :value="this.examSpark.value"
                      color="white"
                      line-width="1"
                      padding="16"
                    ></v-sparkline>
                  </v-sheet>
                  <div id="sparkOverlay">
                    <p class="sparkP" style="margin-top: 2.5rem; font-size: 3rem; font-family: 'Jua', sans-serif;">아직 활동 정보가 없어요 :(</p>
                  </div>
                </v-card>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-container>
  </div>
</template>

<script>
import FirebaseServices from '../../services/FirebaseServices'
import UserDialog from './UserDialog.vue'
import { constants } from 'crypto';

export default {
  name: 'UserProfile',
  components: {
    UserDialog
  },
  props: ['userData'],
  data () {
    return {
      careerData: {
        userImg: null,
        selected: {
          recruit: [],
          tool: [],
          career: [],
        },
      },
      userImg: null,
      spark: true,
      examSpark: {
        labels: ['none', 'none', 'none'],
        value: [222, 222, 222]
      },
    }
  },
  created() {
    this.setProfile()
    this.setSpark()
    this.getCareer()
    console.log('userProfile load Data')
    console.log(this.userData.userData)
  },
  mounted() {
    this.$EventBus.$on('changePhoto', (URL) => {
      this.careerData.userImg = URL
    })
  },
  methods: {
    setProfile() {
      if (this.userData.userData.photoURL === null) {
        this.careerData.userImg = this.$store.state.imgSrc.noImgSrc
      } else {
        this.careerData.userImg = this.userData.userData.photoURL
      }
    },
    setSpark() {
      if (this.userData.spark.labels.length < 3) {
        this.spark = false
      }
    },
    // career 가져오기
    getCareer() {
      // let result = await FirebaseServices.getUserCareer(this.$store.state.firebaseUser.uid)
      // props 로 받은 데이터 뿌리기
      let result = this.userData.userData.selected
      this.careerData.selected = result
      // 다른 유저일 경우 false
      if (this.userData.userData.inUser == false) {
        this.careerData.selected.inUser = false
      } else {
        this.careerData.selected.inUser = true
      }
      console.log('get user career success')
    },
  }
}
</script>

<style scoped>
#userBanner {
  min-height: 50vh;
  position: relative;
  background-size: cover;
  background-position: 50% 30%;
  background-image: url('../../../public/img/background.png');
}
.userCard {
  display: flex;
}
.card1, .card2 {
  height: 20vh;
  margin: auto;
}
.userIcon {
  margin: auto;
}
/* 정보가 없을 경우 보여주는 overlay */
#sparkOverlay {
  position: absolute;
  top: 15%;
  left: 15%;
  min-width: 70%; 
  min-height: 70%;
  width: auto; 
  height: auto; 
  background: rgba(0, 0, 0, .7);
}
.sparkP {
  color: #ffffff;
  font-size: 4em;
  line-height: 210%;
}
</style>