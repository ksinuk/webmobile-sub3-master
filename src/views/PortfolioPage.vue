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
    data() {
        return {
            uid:'',
            user:'',
            mybookmark:false,
            iscontrol:false,
            css:0,
            visitNum:0,
            toBookMarkNum:0,
        }
    },
    created(){
        let th = this
    },
    methods :{

    },
}
</script>

