<template>
  <div class="home">
    <MainBanner/>
    <div class="mx-auto" style="min-height: 100vh; background-color: white;">
      <h3 id="introAbout" class="small-heading pb-2">ABOUT US</h3>
      <h2 class="headline pb-2">The best way to make portfolio</h2>
      <p class="subheading pb-3">다음과 같은 서비스를 제공합니다.</p>
      <Intro/>
    </div>
    <SearchItems/>
    <div class="mx-auto py-5" style="background-color: white;">
      <h2 class="headline py-5">당신을 위한 추천 포트폴리오</h2>
      <RankList/>
    </div>
    <newFooter></newFooter>
  </div>
</template>

<script>
// @ is an alias to /src
import RankList from '@/components/RankList.vue'
import MainBanner from '@/components/MainBanner.vue'
import Intro from '@/components/Intro.vue'
import SearchItems from '@/components/SearchItems'
import Footer from '@/components/Footer.vue'
import newFooter from '@/components/newFooter.vue'

export default {
  name: 'home',
  components: {
    Intro,
    RankList,
    MainBanner,
    SearchItems,
    newFooter,
  }
}
</script>

<style scoped>
.small-heading {
  color: #bfbfbf;
  font-weight: 600;
}
.headline {
  font-weight: 600;
}
#introAbout {
  padding-top: 80px;
  padding-bottom: 100px;
}
</style>