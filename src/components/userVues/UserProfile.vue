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
            <v-layout my-3>

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
    }
  },
  created() {
     this.setProfile();
  },
  methods: {
    setProfile() {
      if (this.$store.state.firebaseUser.photoURL === null) {
        this.userImg = this.$store.state.imgSrc.noImgSrc;
      } else {
        this.userImg = this.$store.state.firebaseUser.photoURL;
      }
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
</style>