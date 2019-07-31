<template>
  <v-container :class="{css1:cssArr[0], xs6:cssArr[0], css2:cssArr[1], xs12:cssArr[1]}">
    <v-layout class="aboutMeBody">
      <!-- about my self -->
      <v-flex :class="{xs6:cssArr[0], xs12:cssArr[1], aboutMe_about: true}">
        <v-container class="aboutContainer">
          <div class="title_line"></div>
          <h3>
            <span class="aboutMe_title">Intro</span>
            <span class="aboutMe_subTitle">About myself.</span>
          </h3>
          <p v-for="item in (userAbout.mySelf || '').split('.')" >{{ item }}</p>
        </v-container>
      </v-flex>

      <!-- about my skill -->
      <v-flex :class="{xs6:cssArr[0], xs12:cssArr[1], aboutMe_skills: true}">
        <v-container class="aboutContainer">
          <div class="title_line"></div>
          <h3>
            <span class="aboutMe_title">skills</span>
            <span class="aboutMe_subTitle">What I can do.</span>
          </h3>
          <ul>
            <li v-for="item in userAbout.mySkill">{{ item }}</li>
          </ul>
        </v-container>
      </v-flex>
      <div>
        <v-switch
          v-model="cssArr[0]"
          :label="`Switch: ${cssArr[0].toString()}`"
        ></v-switch>
        <v-switch
          v-model="cssArr[1]"
          :label="`Switch: ${cssArr[1].toString()}`"
        ></v-switch>
      </div>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      cssArr:[true, false],
      userAbout: {
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
  }
}
</script>

<style lang="scss" scoped>
.css1{
  @import "./scss/aboutMe_1.scss";
}
.css2{
  @import "./scss/aboutMe_2.scss";
}

</style>
