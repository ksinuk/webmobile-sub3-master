<!-- css 종류를 유저 디비에 저장-->
<template lang="html">
  <div class="portfolio">
    <!-- <v-layout row justify-center align-center style="min-height: 100vh; position: relative; background-size: cover; background-image: linear-gradient(to top, rgba(255, 255, 255, 0.75), rgba(255, 255, 255, 0.75)), url('');">
        <v-flex>
            <h1 style="color: black; font-size: 3rem; font-weight: 300; letter-spacing: 0.08rem;">{{item.title}}</h1>
            <p style="color: black;">{{item.subtitle}}</p>
        </v-flex>
    </v-layout> -->
    <AboutMe/>
    <PortfolioList/>
    {{item.bannerImg}}
    <Footer/>
  </div>
</template>

<script>
import Banner from '@/components/Banner3.vue'
import AboutMe from '@/components/AboutMe3.vue'
import PortfolioList from '@/components/PortfolioList3.vue'
import Footer from '@/components/Footer3.vue'

import FirebaseServices from '../services/FirebaseServices'
import firebase from 'firebase/app'

export default {

    name: 'portfolio',
    components: {
        Banner,
        AboutMe,
        PortfolioList,
        Footer
    },
    data() {
        return {
            item: [],
            banner: null,
            user: null,
            image: null
        }
    },

    created() {
        this.getPortfolio();
    },
    methods: {
        getPortfolio() {
            let __this = this;
            const tmp = firebase.auth().onAuthStateChanged(function(user) {
                __this.user = user.uid;
                FirebaseServices.getMyPort(user.uid).then(function(res) {
                    __this.item = res;
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
