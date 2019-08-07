<template>
<div>
    <BackBanner>
    </BackBanner>
    <template>
        
    </template>
</div>
</template>

<script>
import FirebaseServices from '../services/FirebaseServices'
// @ is an alias to /src
import BackBanner from '@/components/BackBanner.vue'
import Loading from 'vue-loading-overlay';
   // Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
    name: 'SearchResult',
    components: {
        BackBanner,
        Loading
    },
    data() {
        return {
            query: null,
            resultList: [],
            likeList: [],
            uid: null,
            like: false,
            isLoading: false,
            fullPage: true
        }
    },
    mounted(){
        this.doAjax();
    },
    created() {
        this.getItems()
    },
    methods: {
        async getItems() {
            // variable routing 통해 넘어온 검색단어를 가져옴
            this.query = this.$route.params.search_value
            var target = this.query
            var tmp = await FirebaseServices.getPortfolios()
            for (let idx in tmp) {
                if (tmp[idx].hashtags.includes(target)) {
                    this.resultList.push(tmp[idx])
                }
                else if (tmp[idx].title.includes(target)) {
                    this.resultList.push(tmp[idx])
                }
            }
            var user = await FirebaseServices.currentUser();
            this.resultList.forEach(function(result) {
                if (user.bookmark.includes(result.pk)) {
                    result.like = true;
                }
            })
            this.likeList = user.bookmark
            this.uid = user.uid
        },

        // 북마크 아이콘의 색깔 표시 및 데이터베이스 저장
        enrollLike(pk) {
            for (let result in this.resultList) {
                if (this.resultList[result].pk === pk) {
                    if (this.resultList[result].like === true) {
                        this.resultList[result].like = false
                        this.likeList = this.likeList.filter(function(e) { return e !== pk})
                        // var index = user.bookmark.indexOf(pk)
                        // user.bookmark.splice(index, 1)
                    } 
                    else {
                        this.resultList[result].like = true
                        this.likeList.push(pk)
                    }
                }
            }
            FirebaseServices.editUser(this.uid, this.likeList);
        },
        doAjax() {
            this.isLoading = true;
            // simulate AJAX
            setTimeout(() => {
                this.isLoading = false
            },1000)
        },
        onCancel() {
            console.log('User cancelled the loader.')
        }
    }
}
</script>

<style scoped>
</style>
