<template lang="html">
<div>
    <div></div>
</div>
</template>

<script>
import FirebaseService from '@/services/FirebaseServices'
import firebase from 'firebase/app'

import Introduce from '@/components/Introduce.vue'

export default {

    name: 'portfolioHeader',
    components: {
    },
    props:{
        uid: {type: null},
    },
    data() {
        return {
            intros:[],
        }
    },
    created(){
        let th = this

        this.getMyIntro()
    },
    methods:{
        async getMyIntro(){
            //  var user = FirebaseService.auth().currentUser;
            this.intros = await FirebaseService.getIntroduce();
        },
    }
}
</script>