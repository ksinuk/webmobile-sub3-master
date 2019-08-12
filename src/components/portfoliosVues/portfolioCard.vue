<template>
<div v-if="isshow">
    <v-card class="card-body">
        <div>
            <v-img class="white--text" :src="result.banner.img" :alt="result.pk" style="width: 100%; height: 100%;">
                <v-container fill-height fluid>
                    <v-layout fill-height>
                    <v-flex xs12 align-end flexbox>
                        <span class="headline">{{ result.title.content }}</span>
                    </v-flex>
                    </v-layout>
                </v-container>
            </v-img>
        </div>

        <v-card-title primary-title>
            <div>
                <div style="font-weight: 600;">
                    <p style="color: ">{{ userData.displayName }}</p>
                    <v-icon v-if="islike && isbookmark" class="mx-2" color="warning" @click="enrollLike()">star</v-icon>
                    <v-icon v-if="!islike && isbookmark" class="mx-2" @click="enrollLike()">star</v-icon>
                </div>
                <div>
                    <span v-for="hashtag in taglist">
                        <v-chip color="teal" text-color="white">
                            <v-avatar>
                                <v-icon>check_circle</v-icon>
                            </v-avatar>
                            {{ hashtag }}
                        </v-chip>
                    </span>

                    <span v-if="result.userData.selected">
                        <span v-for="career in result.userData.selected.career">
                            <v-chip color="red" text-color="white">
                                <v-avatar>
                                    <v-icon>check_circle</v-icon>
                                </v-avatar>
                                {{ career }}
                            </v-chip>
                        </span>
                        <span v-for="recruit in result.userData.selected.recruit">
                            <v-chip color="blue" text-color="white">
                                <v-avatar>
                                    <v-icon>check_circle</v-icon>
                                </v-avatar>
                                {{ recruit }}
                            </v-chip>
                        </span>
                        <span v-for="tool in result.userData.selected.tool">
                            <v-chip color="black" text-color="white">
                                <v-avatar>
                                    <v-icon>check_circle</v-icon>
                                </v-avatar>
                                {{ tool }}
                            </v-chip>
                        </span>
                    </span>
                </div>
            </div>
        </v-card-title>
        <!-- 해당 포트폴리오 페이지로 이동 -->
        <v-card-actions>
            <v-btn flat color="purple" :to="userAddr">Explore</v-btn>
            <v-spacer></v-spacer>
        </v-card-actions>
    </v-card>
    <!-- <div class="vld-parent">
        <loading :active.sync="isLoading" :can-cancel="true" :on-cancel="onCancel" :is-full-page="fullPage">
        </loading>
    </div> -->
</div>
</template>


<script>
import FirebaseService from '@/services/FirebaseServices'
import Loading from 'vue-loading-overlay';
import FirebaseServices from '../../services/FirebaseServices';

export default {
    name:'folioCard',
    components: {
        Loading
    },
    props:{
        result:{type:null},
        me:{type:null},
        updateSignal:{type:null},
    },
    data(){
        return{
            islike:false,
            isshow:true,
            isbookmark:true,

            taglist:[],
            userAddr:'/portfoliopage/',
            userData: null
        }
    },
    created(){
        this.reboot()
    },
    methods: {
        async reboot(){
            console.log("card route : ",this.$route)
            if(this.$route.name == 'home') this.isbookmark = false
            this.userData = await FirebaseServices.getVisitView(this.result.uid)
            console.log(this.userData.displayName);
            this.checkme()
            this.makeTagList()
            this.makeAddr()

            this.isshow = false
            this.isshow = true
        },
        // 북마크 아이콘의 색깔 표시 및 데이터베이스 저장
        enrollLike() {
            // console.log("islike: ",this.islike)
            // console.log("enrollLike result: ",this.result)

            if(this.me && this.me.uid != this.result.pk){
                FirebaseServices.updateUserBookmark(this.me.uid, this.result.pk,!this.islike)
                this.islike = !this.islike

                this.isshow = false
                this.isshow = true
            }
        },
        onCancel() {
            console.log('User cancelled the loader.')
        },
        checkme(){
            this.islike = false
            if(this.me){
                let mybook = this.me.bookmarks
                if(mybook){
                    for(let i=0; i<mybook.length; i++){
                        let to = mybook[i]
                        if(to == this.result.pk) {
                            this.islike = true
                            break
                        }
                    }
                }
                    
            }
            this.isshow = false
            this.isshow = true
        },
        makeTagList:function(){
            this.taglist = []

            if(this.result && this.result.portfolios){
                let foliolist = this.result.portfolios
                for(let i=0;i<foliolist.length;i++){
                    let tags = foliolist[i].hashtags
                    for(let j=0;j<tags.length;j++){
                        let isok = true
                        for(let k=0;k<this.taglist.length;k++){
                            if(this.taglist[k] == tags[j]){
                                isok = false
                                break
                            }
                        }
                        if(isok) this.taglist.push(tags[j])
                    }
                }
            }
            this.isshow = false
            this.isshow = true
        },
        makeAddr:function(){
            this.userAddr = '/user/' + this.result.pk
            this.isshow = false
            this.isshow = true
        },
        emptySelectData:function(){
            if(!this.result.userData) this.result.userData = {'selected':{'career':[] , 'recruit':[] , 'tool':[]}}
            else if(!this.result.userData.selected) this.result.userData.selected = {'career':[] , 'recruit':[] , 'tool':[]}
            else if(!this.result.userData.selected.career) this.result.userData.selected.career = []
            else if(!this.result.userData.selected.recruit) this.result.userData.selected.recruit = []
            else if(!this.result.userData.selected.tool) this.result.userData.selected.tool = []
        },
    },
    watch:{
        me:function(){
            this.reboot()
        },
        updateSignal:function(){
            this.reboot()
        }
    }
}
</script>

<style lang="scss" scoped>
.card-body{
    height:100%;
}
.card-img{
    height:200px;
    width:auto;
    min-width: 1px;
}
</style>


