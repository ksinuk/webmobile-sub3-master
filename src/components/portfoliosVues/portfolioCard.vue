<template>
<div v-if="isshow">
    <v-card>
        <div style="height:200px; margin:5px;">
            <img :src="result.banner.img" class="card-img" :alt="result.pk">
        </div>

        <v-card-title primary-title>
            <div>
                <div style="font-weight: 600;">
                    {{ result.pk }}
                    <v-icon v-if="islike" class="mx-2" color="warning" @click="enrollLike()">star</v-icon>
                    <v-icon v-else class="mx-2" @click="enrollLike()">star</v-icon>
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

                </div>
            </div>
        </v-card-title>
        <!-- 해당 포트폴리오 페이지로 이동 -->
        <v-card-actions>
            <v-btn flat color="purple">Explore</v-btn>
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

            taglist:[],
        }
    },
    created(){
        this.checkme()
        this.makeTagList()
    },
    methods: {
        // 북마크 아이콘의 색깔 표시 및 데이터베이스 저장
        enrollLike() {
            // console.log("islike: ",this.islike)
            // console.log("enrollLike result: ",this.result)

            if(this.me){
                FirebaseServices.updateUserBookmark(this.me.uid, this.result.pk,!this.islike)
                this.islike = !this.islike
            }

            this.isshow = false
            this.isshow = true
        },
        onCancel() {
            console.log('User cancelled the loader.')
        },
        checkme(){
            this.islike = false
            if(this.me){
                let mybook = this.me.myBookmark
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
        }
    },
    watch:{
        me:function(){
            this.checkme()
            this.makeTagList()

            this.isshow = false
            this.isshow = true
        },
        updateSignal:function(){
            this.checkme()
            this.makeTagList()

            this.isshow = false
            this.isshow = true
        }
    }
}
</script>

<style lang="scss" scoped>
.card-img{
    height:200px;
    width:auto;
    min-width: 1px;
}
</style>


