<template lang="html">
  <div class="portfolio">
    <Header/>
    <AboutMe/>
    <PortfolioList/>
  </div>
</template>

<script>
import Header from '@/components/portfoliosVues/Header.vue'
import AboutMe from '@/components/portfoliosVues/AboutMe.vue'
import PortfolioList from '@/components/portfoliosVues/PortfolioList.vue'

import FirebaseServices from '../services/FirebaseServices'
import firebase from 'firebase/app'

export default {

    name: 'portfolio',
    components: {
        Header,
        AboutMe,
        PortfolioList
    },
    data() {
        return {
            //
        }
    }
}
</script>