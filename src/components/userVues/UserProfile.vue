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
                    <img :src="userImg" alt="avatar">
                  </v-avatar>
                </div>
            </v-layout>
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
                <div>{{ this.userData.userData.visitCnt }}</div>
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

export default {
  name: 'UserProfile',
  components: {
  },
  props: ['userData'],
  data () {
    return {
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
  },
  methods: {
    setProfile() {
      if (this.$store.state.firebaseUser.photoURL === null) {
        this.userImg = this.$store.state.imgSrc.noImgSrc;
      } else {
        this.userImg = this.$store.state.firebaseUser.photoURL;
      }
    },
    setSpark() {
      if (this.userData.spark.labels.length < 3) {
        this.spark = false
      }
    }
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