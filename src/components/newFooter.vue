<template>
  <v-layout>
  <v-footer
    dark
    padless
   style="height: 100%;">
    <v-card
      flat
      tile
      class="dark white--text text-xs-center"
    >
      <v-card-text>
        <v-btn
          v-for="(icon,index) in icons"
          :key="icon"
          class="mx-3 white--text"
          icon
        >
          <a :href="location[index]" target="_blank"><v-icon size="24px">{{ icon }}</v-icon></a>
        </v-btn>
      </v-card-text>

      <v-card-text class="white--text pt-0">
        대전광역시 유성구 덕명동 124  |  Tel. 02-1111-2222  |  Fax. 02-1111-2222</br>
        Copyright ©2019 FOLIOU Inc Co., Ltd. All rights reserved.
      </v-card-text>

      <v-divider></v-divider>
      <v-card-title primary-title>
          <div style="width:33%;">
            <h3 class="headline mb-0">회사소개</h3>
            <ul>
              <a href="#"><li>CEO</li></a>
              <a href="#"><li>연혁</li></a>
              <a href="#"><li>찾아오시는길</li></a>
            </ul>
          </div>
          <div style="width:33%;">
            <h3 class="headline mb-0">서비스</h3>
            <ul>
              <a href="/portfolio"><li>플랫폼1</li></a>
              <a href="/portfolio2"><li>플랫폼2</li></a>
              <a href="/portfolio3"><li>플랫폼3</li></a>
              <a href="/writeport"><li>플랫폼4</li></a>
            </ul>
          </div>
          <div style="width:33%;">
            <h3 class="headline mb-0">고객문의</h3>
            <ul>
              <a href="/board"><li>공지사항</li></a>
              <a href="#"><li>이메일</li></a>
              <a href="#"><li>QnA</li></a>
            </ul>
          </div>
        </v-card-title>

  <v-divider></v-divider>
      <v-card-text class="white--text">
        {{ new Date().getFullYear() }} — <strong>BangKok</strong></br>
        <strong>Made by</strong></br><strong>황여진 전영진 서지훈 강신욱</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</v-layout>
</template>

<script>
  import firebase from 'firebase/app'

  export default {
    name : 'newFooter',
    computed:{
      test (){
        return this.$store.getters.searchItem;
      }
    },
    data() {
      return {
        icons: [
          'fab fa-facebook',
          'fab fa-twitter',
          'fab fa-google-plus',
          'fab fa-linkedin',
          'fab fa-instagram',
        ],
        location:[
          'https://www.facebook.com/',
          'https://www.twitter.com/',
          'https://www.google.com/',
          'https://www.Linkedin.com/',
          'https://www.instagram.com/'],
        user: null
      }
    }
  }
</script>

<style >


  .sitemap div {
    float: left;
  }
  a:link { color: white; text-decoration: none;}
  a:visited { color: white; text-decoration: none;}
  a:hover { color: white; text-decoration: none;}
  .headline {
    margin-left:20px;
  }
  .v-card {
    width: 100%;

  }

  .v-footer {
    width: 100%;

  }
  li {
    list-style: none;
  }
</style>

<codepen-resources lang="json">
  {
  "js": ["https://use.fontawesome.com/releases/v5.0.6/js/all.js"]
  }
</codepen-resources>
