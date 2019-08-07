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
                      v-model="careerData.selected.career" :items="selectItems.경력여부"
                      label="Add some tags" multiple small-chips hide-selected
                    ></v-combobox>
                  </div>
                  <!-- 채용 -->
                  <div>
                    <p>채용</p>
                    <v-combobox
                      v-model="careerData.selected.recruit" :items="selectItems.채용분야"
                      label="Add some tags" multiple small-chips hide-selected
                    ></v-combobox>
                  </div>
                  <!-- 활동 -->
                  <div>
                    <p>활동</p>
                    <v-combobox
                      v-model="careerData.selected.tool" :items="selectItems.활동분야"
                      label="Add some tags" multiple small-chips hide-selected
                    ></v-combobox>
                  </div>
                  <v-btn color="blue darken-1" flat @click="saveCareerHandler()">Save</v-btn>
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
          
          <v-card flat v-show="!edit">
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex>
                    <v-avatar tile size="256" class="profileImg">
                      <img :src="careerData.userImg" alt="avatar">
                    </v-avatar>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field v-model="user.name" label="User name*" disabled></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field label="Password*" type="password" disabled></v-text-field>
                  </v-flex>
                </v-layout>
                <v-btn color="blue darken-1" flat @click="edit = true">Edit</v-btn>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
            </v-card-actions>
          </v-card>

          <v-card flat v-show="edit">
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex>
                    <v-avatar tile size="256" class="profileImg">
                      <img :src="careerData.userImg" alt="avatar">
                    </v-avatar>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field v-model="user.name" label="User name*"></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field label="Password*" type="password" required></v-text-field>
                  </v-flex>
                </v-layout>
                <v-btn color="blue darken-1" flat @click="saveUserHandler()">save</v-btn>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click="saveUserHandler()">Close</v-btn>
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
  props: ['careerData'],
  data () {
    return {
      dialog: false,
      // 정보수정
      edit: false,
      user: {
        name: this.$store.state.firebaseUser.name,
        password: ''
      },
      // tab items
      tab: null,
      items: ['content', 'account'],
      // comboBox save Data
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
  methods: {
    // btn handler
    saveCareerHandler() {
      this.dialog = false
      this.updateCareer()
    },
    saveUserHandler() {
      this.dialog = false
      this.edit = false
    },
    // career 저장
    async updateCareer() {
      let result = await FirebaseServices.updateUserCareer(this.$store.state.firebaseUser.uid, this.selected)
      console.log('save career')
    },
  }
}
</script>

<style scoped>
.selectForm {
  display: flex;
}
</style>