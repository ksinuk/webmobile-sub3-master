<template>
  <v-layout row justify-center>

    <v-flex v-for="item in introText"
      xs12 md3 class="px-3">
        <v-img
          src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
          aspect-ratio="1.75"
        ></v-img>
        <v-card class="mx-auto" wrap light color="light" style="overflow: hidden;">
            <v-card-text id="introIcon">
                <v-icon x-large center color="#64b5f6">{{ item.icon }}</v-icon>
            </v-card-text>
            <v-card-title primary-title>
                <div class="mx-auto">
                    <div class="headline mb-4">{{ item.title }}</div>
                    <p>{{ item.content }}</p>
                </div>
            </v-card-title>
        </v-card>
    </v-flex>

  </v-layout>
</template>

<script>
import FirebaseService from '@/services/FirebaseServices'
export default {
  name: 'Intro',
  props :{
    intro : {type:null}
  },
  data() {
    return {
      introText: [
        {
          imgSrc: '',
          icon: 'build',
          title: '맞춤형 포트폴리오 디자인 구성',
          content: '개발자가 어려움을 느끼는 페이지 디자인을 제안하여, 간편하게 포트폴리오 페이지를 빌드업하고, 관리할 수 있는 툴을 제공합니다.'
        },
        {
          imgSrc: '',
          icon: 'people',
          title: '포트폴리오를 공유하는 커뮤니티',
          content: '개인 간 포트폴리오의 공유를 용이하게 하고, 질의응답하는 Q&A 기능을 제공하여 함께 성장할 수 있는 발판을 마련합니다.'
        },
        {
          imgSrc: '',
          icon: 'cloud_upload',
          title: '개발자를 위한 souce 관리 편의성',
          content: '해당 포트폴리오를 구성하는 코드를 개발자가 선택하고 공유할 수 있도록 합니다. 또한, front-end, back-end, css 등의 카테고리를 설정하여 보다 내용을 파악하기 쉽도록 UI를 제공합니다.'
        }
      ]
    }
  }
}
</script>

<style>
#introIcon {
  padding-bottom: 0px;
}

</style>
