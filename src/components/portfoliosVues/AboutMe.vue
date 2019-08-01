<template>
  <v-container :class="{css1:cssArr[0], xs6:cssArr[0], css2:cssArr[1], xs12:cssArr[1]}">
    <v-btn large flat color="grey" @click="Aboutdrawer = !Aboutdrawer" id="AboutBtn">사이드바</v-btn>
    <div :themeColor="this.$store.state.theme" class="aboutMeBody">
      <!-- about my self -->
      <div class="contentSize aboutMe_about">
        <v-container class="aboutContainer">
          <div class="title_line"></div>
          <h4>
            <span class="aboutMe_title">Intro</span>
            <span class="aboutMe_subTitle">About myself.</span>
          </h4>
          <p v-for="item in (userAbout.mySelf || '').split('.')" >{{ item }}</p>
        </v-container>
      </div>

      <!-- about my skill -->
      <div class="contentSize aboutMe_skills">
        <v-container class="aboutContainer">
          <div class="title_line"></div>
          <h4>
            <span class="aboutMe_title">skills</span>
            <span class="aboutMe_subTitle">What I can do.</span>
          </h4>
          <ul>
            <li v-for="item in userAbout.mySkill">{{ item }}</li>
          </ul>
        </v-container>
      </div>

      <!-- about profile image -->
      <div class="contentSize aboutMe_images">
        <v-container class="aboutContainer">
          <div class="title_line"></div>
          <h4>
            <span class="aboutMe_title">skills</span>
            <span class="aboutMe_subTitle">profile</span>
          </h4>
        </v-container>
        <v-img
          class="aboutMe_image"
          :src="userAbout.url"
          lazy-src="https://static.wixstatic.com/media/2a925f_a902eb9026754fc4911fb781ac5f885f~mv2.gif"
        ></v-img>
      </div>


    </div>
    <!-- sidebar items -->
    <!-- 동작 -->
    <!-- <v-radio-group v-model="radioGroup">
      <v-radio
        v-for="n in 2" :key="n"
        :label="`layout ${n}`" :value="n"
        @change="switchCss(n)"
      ></v-radio>
    </v-radio-group> -->
    <v-navigation-drawer v-model="Aboutdrawer" fixed left dark>
      <v-list>
        <!-- layout select -->
        <v-list-group
          v-for="item in layoutItems" :key="item.title" v-model="item.active"
          :prepend-icon="item.action" no-action>
          <template v-slot:activator>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>

          <v-list-tile
            v-for="subItem in item.items"
            :key="subItem.title"
            @click="switchCss(item, subItem.value)"
          >
            <v-list-tile-content>
              <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
            </v-list-tile-content>
            
            <v-list-tile-action v-show="subItem.selected">
              <v-icon small color="green darken-2">fas fa-check</v-icon>
            </v-list-tile-action>

          </v-list-tile>
        </v-list-group>

        <!-- theme select -->
        <v-list-group
          v-for="item in themeItems" :key="item.title" v-model="item.active"
          :prepend-icon="item.action" no-action>
          <template v-slot:activator>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>

          <v-list-tile
            v-for="subItem in item.items"
            :key="subItem.title"
            @click="switchTheme(subItem.title)"
          >
            <v-list-tile-content>
              <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
            </v-list-tile-content>
            
            <v-list-tile-action v-show="subItem.selected">
              <v-icon small color="green darken-2">fas fa-check</v-icon>
            </v-list-tile-action>

          </v-list-tile>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
      
  </v-container>
</template>

<script>
// theme 설정을 위해서 store에 저장
import store from '../../store'

export default {
  name: '',
  data() {
    return {
      Aboutdrawer: false,
      cssArr: [true, false],
      themeArr: [true, false, false],
      radioGroup: 1,
      // modal
      layoutItems: [
        {
          action: 'fas fa-drafting-compass',
          title: 'Layout',
          items: [
            { title: 'layout1', value: 1, selected: true},
            { title: 'layout2', value: 2, selected: false}
          ]
        },
      ],
      themeItems: [
        {
          action: 'fas fa-palette',
          title: 'Color',
          items: [
            { title: 'default', value: 1, selected: true},
            { title: 'mint', value: 2, selected: false},
            { title: 'simple_cookie', value: 3, selected: false},
          ]
        },
      ],
      // firebase insert
      userAbout: {
        url: 'https://www.opticalexpress.co.uk/media/1065/lady-with-glasses-smiling.jpg',
        // myIntro
        mySelf: '싸피 수강생 서지훈입니다. 저는 아카데믹한 수단으로 지식을 쌓는 대신, 본인의 실제적인 필요에 의해 웹사이트를 제작하면서 다년간 다양한 기술을 터득해 왔습니다. 스스로 생산자이자 동시에 소비자로서 쌓아올린 경험은, 클라이언트에게 보다 섬세하고 직접적이며, 실용적인 서비스를 제공할 것입니다',
        // mySkills
        mySkill: {
          css: ['css3'],
          html: ['html5'],
          js: ['vanilla']
        }
      }
    }
  },
  methods: {
    switchTheme(theme) {
      store.commit('changeTheme', theme)
    },
    // CSS 변환시 배열 교체용
    switchCss(item, num) {
      let boolArr = []
      for (let i=0; i < this.cssArr.length; i++) {
        if (num == (i+1)) {
          boolArr.push(true)
          item.items[i].selected = true
        } else {
          boolArr.push(false)
          item.items[i].selected = false
        }
      }
      this.cssArr = boolArr
    },
    checkLog(n, m) {
      n.selected = true
      console.log(n, m)
    }
  }
}
</script>

<style lang="scss" scoped>
// layout selector
.css1{
  @import "./scss/aboutMe_1.scss";
}
.css2{
  @import "./scss/aboutMe_2.scss";
}
// sidebar button
#AboutBtn {
  display: fixed;
  left: 650px;
  top: 500px;
}
</style>
