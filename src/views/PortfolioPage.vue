<template lang="html">
<div class="portfolio">
  <NavPortfolio v-if="user === item.uid"/>
  <Header id="customHeader" :uid="uid"/>
  <AboutMe id="customAbout" :uid="uid"/>
  <PortfolioList id="customPortfolio" :uid="uid" :css="css"/>
</div>
</template>

<script>
import Header from '@/components/portfoliosVues/Header.vue'
import AboutMe from '@/components/portfoliosVues/AboutMe.vue'
import PortfolioList from '@/components/portfoliosVues/PortfolioList.vue'
import NavPortfolio from '@/components/portfoliosVues/navPortfolio.vue'
import FirebaseServices from '../services/FirebaseServices'
import firebase from 'firebase/app'

export default {

    name: 'portfolio',
    components: {
        Header,
        AboutMe,
        PortfolioList,
        NavPortfolio
    },
    created() {
      this.getUserID();
      let th = this;
    },
    data() {
        return {
          item: [],
          banner: null,
          user: null,
          image: null,
          uid:'',
          user:'',
          mybookmark:false,
          iscontrol:false,
          css:0,
          visitNum:0,
          toBookMarkNum:0,
        }
    },

    methods : {
      getUserID() {
        let __this = this;
        var user = firebase.auth().currentUser;

        // user login 정보가 없을 때 로그인 페이지로 redirect
        if (!user) {
          alert('로그인이 필요합니다!');

          return __this.$router.push('/login');
        }
        const tmp = firebase.auth().onAuthStateChanged(function(user) {
            __this.user = user.uid;
            console.log(__this.user);

            FirebaseServices.getMyPort(user.uid).then(function(res) {
                __this.item = res;
                console.log(__this.item);

                // 저장된 portfolio 페이지가 없을 때에 포트폴리오 입력 페이지로 redirect
                if(res==null){
                  alert('저장된 포트폴리오 정보가 없습니다!')

                  return   __this.$router.push('/write_portfolio');
                }
                var storage = firebase.storage();
                var storageRef = storage.ref(__this.user + '/' + __this.item.bannerImg[0]);
                __this.image = storageRef.child(__this.user + '/' + __this.item.bannerImg[0]).getDownloadURL().then(function(url) {
                    __this.image = url;
                    console.log(url);
                    return url
                }).catch(function(error) {
                    console.log('error');
                })
                console.log("imageurl:" + __this.image);
            })
        });

      }
    }
}
</script>
