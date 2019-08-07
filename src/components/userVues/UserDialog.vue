<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">Edit</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">User Profile</span>
        </v-card-title>

        <v-tabs v-model="tab" vertical grow>
          <v-tab v-for="item in items" :key="item">
            <!-- <v-icon left>mdi-account</v-icon> -->
            {{ item }}
          </v-tab>
        </v-tabs>
      </v-card>

      <v-tabs-items v-model="tab">

        <!-- 유저 추가정보 -->
        <v-tab-item>
          <v-card flat>
            <v-card-text>
              <v-container grid-list-md>
                <div>
                  <!-- 경력 -->
                  <div>
                    <p>경력</p>
                    <v-combobox
                      v-model="selected.career" :items="selectItems.경력여부"
                      label="Add some tags" multiple small-chips hide-selected
                    ></v-combobox>
                  </div>
                  <!-- 채용 -->
                  <div>
                    <p>채용</p>
                    <v-combobox
                      v-model="selected.recruit" :items="selectItems.채용분야"
                      label="Add some tags" multiple small-chips hide-selected
                    ></v-combobox>
                  </div>
                  <!-- 활동 -->
                  <div>
                    <p>활동</p>
                    <v-combobox
                      v-model="selected.tool" :items="selectItems.활동분야"
                      label="Add some tags" multiple small-chips hide-selected
                    ></v-combobox>
                  </div>
                  <v-btn color="blue darken-1" flat @click="saveHandler()">Save</v-btn>
                </div>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
            </v-card-actions>
          </v-card>
        </v-tab-item>

        <!-- 유저 name, password -->
        <v-tab-item>
          <v-card flat>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex>
                    <v-avatar tile size="256" class="profileImg">
                      <img :src="userImg" alt="avatar">
                    </v-avatar>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field label="User name*" required></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field label="Password*" type="password" required></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
              <v-btn color="blue darken-1" flat @click="dialog = false">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-tab-item>
      </v-tabs-items>

    </v-dialog>
  </v-layout>
</template>

<script>
import FirebaseServices from '../../services/FirebaseServices'

export default {
  props: ['userImg'],
  data () {
    return {
      dialog: false,
      // tab items
      tab: null,
      items: ['content', 'account'],
      // comboBox saveData
      // 선택된 것 저장
      selected: {
        recruit: [],
        tool: [],
        career: [],
      },
      selectItems: {
        채용분야: ['SW 개발', 'HW 개발', '게임 개발', '디자인', '기획/PM', '마케팅', '운영', '경영지원'],
        활동분야: [ 'Android', 'iOS', 'C#', 'C++', 'Java', 'PHP', 'Python', 'Ruby', 'JSP', 'Node.js', 'AngularJS', 'jQuery'],
        경력여부: ['신입', '인턴', '경력'],
      }
    }
  },
  created() {
    this.getCareer()
  },
  methods: {
    // btn handler
    saveHandler() {
      this.dialog = false
      this.updateCareer()
    },
    // career 가져오기
    async getCareer() {
      let result = await FirebaseServices.getUserCareer(this.$store.state.firebaseUser.uid)
      this.selected = result
      console.log('get user career success')
    },
    // career 저장
    async updateCareer() {
      let result = await FirebaseServices.updateUserCareer(this.$store.state.firebaseUser.uid, this.selected)
      console.log('save career')
    }
  }
}
</script>

<style scoped>
.selectForm {
  display: flex;
}
</style>