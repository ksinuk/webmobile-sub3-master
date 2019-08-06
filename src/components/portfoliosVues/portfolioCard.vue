<template>
    <div v-if="isshow">
        <v-card>
            <div style="height:200px;">
                <img :src="result.img" class="card-img" :alt="result.pk">
            </div>

            <v-card-title primary-title>
                <div>
                    <div style="font-weight: 600;">
                        {{ result.title }}
                        <v-icon v-if="islike" class="mx-2" color="warning" @click="enrollLike()">star</v-icon>
                        <v-icon v-else class="mx-2" @click="enrollLike()">star</v-icon>
                    </div>
                    <div>
                        <tr>
                            <td v-for="hashtag in result.hashtags">
                                <v-chip color="teal" text-color="white">
                                    <v-avatar>
                                        <v-icon>check_circle</v-icon>
                                    </v-avatar>
                                    {{ hashtag }}
                                </v-chip>
                            </td>
                        </tr>
                    </div>
                </div>
            </v-card-title>
            <!-- 해당 포트폴리오 페이지로 이동 -->
            <v-card-actions>
                <v-btn flat color="purple">Explore</v-btn>
                <v-spacer></v-spacer>
            </v-card-actions>
        </v-card>
        <div class="vld-parent">
            <loading :active.sync="isLoading" :can-cancel="true" :on-cancel="onCancel" :is-full-page="fullPage">
            </loading>
        </div>
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
        }
    },
    cearted(){
        this.checkme()
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
        },
        onCancel() {
            console.log('User cancelled the loader.')
        },
        checkme(){
            if(this.me){
                let mybook = this.me.myBookmark
                // console.log("mybook : ",mybook)
                // console.log("result.pk : ",this.result.pk)
                for(let i=0; i<mybook.length; i++){
                    let to = mybook[i]
                    if(to == this.result.pk) {
                        this.islike = true
                        break
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
        },
        updateSignal:function(){
            this.checkme()
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


