<template>
    <div>
        <v-card>
            <v-img :src="result.img" height="200px">
            </v-img>

            <v-card-title primary-title>
                <div>
                    <div style="font-weight: 600;">
                        {{ result.title }}
                        <v-icon v-if="result.like" class="mx-2" color="warning" @click="enrollLike(result.pk)">star</v-icon>
                        <v-icon v-else class="mx-2" @click="enrollLike(result.pk)">star</v-icon>
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

export default {
    name:'folioCard',
    components: {
        Loading
    },
    props:{
        result:{type:null},
    },
    methods: {
        // 북마크 아이콘의 색깔 표시 및 데이터베이스 저장
        enrollLike(pk) {
            // for (let result in this.resultList) {
            //     if (this.resultList[result].pk === pk) {
            //         if (this.resultList[result].like === true) {
            //             this.resultList[result].like = false
            //             this.likeList = this.likeList.filter(function(e) { return e !== pk})
            //             // var index = user.bookmark.indexOf(pk)
            //             // user.bookmark.splice(index, 1)
            //         } 
            //         else {
            //             this.resultList[result].like = true
            //             this.likeList.push(pk)
            //         }
            //     }
            // }
            // FirebaseServices.editUser(this.uid, this.likeList);
            console.log("enrollLike(pk) : 준비중")
        },
        onCancel() {
            console.log('User cancelled the loader.')
        }
    }
}
</script>

<style lang="sass" scoped>

</style>


