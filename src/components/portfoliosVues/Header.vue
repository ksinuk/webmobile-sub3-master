<template lang="html">
<div>
    <ImageBanner/>
    <Introduce :intro="intros[0]"></Introduce>
</div>
</template>

<script>
import FirebaseService from '@/services/FirebaseServices'
import firebase from 'firebase/app'

import ImageBanner from '@/components/ImageBanner.vue'
import Introduce from '@/components/Introduce.vue'

export default {

    name: 'portfolioHeader',
    components: {
        ImageBanner,
        Introduce
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