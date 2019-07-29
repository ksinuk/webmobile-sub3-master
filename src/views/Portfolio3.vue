<!-- css 종류를 유저 디비에 저장-->
<template lang="html">
  <div class="portfolio">
    <Banner v-bind:title="item.title" v-bind:subtitle="item.subtitle" v-bind:banner="banner" v-bind:user="user"/>
    <AboutMe/>
    <PortfolioList/>
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
            user: null
        }
    },

    created() {
        this.getPortfolio();
    },
    methods: {
        async getPortfolio() {
            this.user = await firebase.auth().currentUser;
            console.log(this.user); 
            this.item = await FirebaseServices.getMyPort(this.user.uid);
            this.banner = this.item.bannerImg[0];

        }
    }
}
</script>
