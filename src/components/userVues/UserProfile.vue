<template>
  <v-container>
    <v-flex xs12>
      <!-- 투명색 지정 -->
      <v-card flat color="rgb(0, 0, 0, 0)">
        <v-layout row>
          <v-flex>
            <v-layout my-3>
                <div style="margin: auto;">
                  <v-avatar tile size="256" class="profileImg">
                    <img :src="careerData.userImg" alt="avatar">
                  </v-avatar>
                </div>
            </v-layout>
            <!-- 수정페이지 -->
            <div>
              {{ careerData.selected.career }}
              {{ careerData.selected.recruit }}
              {{ careerData.selected.tool }}
            </div>
            <UserDialog v-bind:careerData="careerData"/>
          </v-flex>
          
          <v-flex xs8>
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
                  <p class="sparkP">정보가 없어요</p>
                </div>
              </v-card>
              
            </v-layout>

            <!-- icon group -->
            <div class="userCard">
              <div class="cardIcon">
                <v-icon>far fa-eye</v-icon>
                <div class="headline">view</div>
                <div>{{ this.userData.spark.cnt }}</div>
              </div>

              <div class="cardIcon">
                <v-icon>far fa-calendar-check</v-icon>
                <div class="headline">created_at</div>
                <div>{{ this.userData.userData.created_at }}</div>
              </div>
            </div>
          
          </v-flex>
          
        </v-layout>
      </v-card>
    </v-flex>
  </v-container>
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