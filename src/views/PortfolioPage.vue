<template lang="html">
<div class="portfolio">
    <Header :uid="uid"/>
    <AboutMe :uid="uid"/>
    <PortfolioList :uid="uid" :css="css"/>


</div>
</template>

<script>
import Header from '@/components/portfoliosVues/Header.vue'
import AboutMe from '@/components/portfoliosVues/AboutMe.vue'
import PortfolioList from '@/components/portfoliosVues/PortfolioList.vue'

import FirebaseService from '../services/FirebaseServices'
import firebase from 'firebase/app'

export default {

    name: 'portfolio',
    components: {
        Header,
        AboutMe,
        PortfolioList
    },
    created(){
        let th = this
        if(!this.$route.params.uid){
            this.getUserID();
        }
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

        if (!user) {
          alert('로그인이 필요합니다!');

          return __this.$router.push('/login');
        }
        const tmp = firebase.auth().onAuthStateChanged(function(user) {
            __this.user = user.uid;


            FirebaseServices.getMyPort(user.uid).then(function(res) {
                __this.item = res;
                console.log("test"+res);
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
