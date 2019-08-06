<template>
<div>
    <BackBanner>
        <div slot="pageName">
            <p class="mainBackBanner" v-if="ifsearch">Search Results</p>
            <p class="mainBackBanner" v-if="!ifsearch">MAIN Portfolio Page</p>
        </div>
    </BackBanner>
    
    <div style="display:flex; position:relative;" v-if="prnok">
        <!-- ---- side bar ---------------------------- -->
        <div class="sidebar">
            <br>
            <div class="sidebar-part">
                <h3 class="tag-title">tag</h3>
                <btn class="open-btn" @click="iftag = !iftag" v-if="!iftag">+</btn>
                <btn class="open-btn" @click="iftag = !iftag" v-if="iftag">-</btn>
                <div v-if="iftag">
                    <ul>
                        <li class="tag-list" v-for="(elem,tag) in taglist" @click="tagcheck(elem,tag)">
                            {{tag}} <span v-show="elem['check']"><i class="fas fa-check" style="color:Crimson;"></i></span>
                        </li>
                    </ul>
                </div>
            </div>
            <hr>
            <br>
            <div class="sidebar-part">
                <h3 class="tag-title">정렬</h3>
                <btn class="open-btn" @click="ifsort = !ifsort" v-if="!ifsort">+</btn>
                <btn class="open-btn" @click="ifsort = !ifsort" v-if="ifsort">-</btn>
                <div v-if="ifsort">
                    <ul>
                        <li class="tag-list" @click="sortup = true">
                            이름 : 오름차순 <span v-show="sortup"><i class="fas fa-check" style="color:Crimson;"></i></span>
                        </li>
                        <li class="tag-list" @click="sortup = false">
                            이름 : 내림차순 <span v-show="!sortup"><i class="fas fa-check" style="color:Crimson;"></i></span>
                        </li>
                    </ul>
                </div>
            </div>

        </div>
        <!-- ----- list --------------------------- -->
        <div class="foliolist" v-if="folios.length != 0 && tagout['num'] != 0 || tagout['size'] == 0">
            <div class="folio" v-for="user in folios" v-if="tagout[user.pk] || !tagout.size">
                <!-- <p><a class="folioLink" :href="user.addr">{{user.pk}}</a></p> -->
                <folioCard :result="user"/>
            </div>
        </div>

        <!-- 검색 결과가 없을 때 -->
        <div v-if="folios.length == 0 || tagout['num'] == 0 && tagout['size'] != 0" style="height: 50vh;">
            <div>
                <p class="resultOut">"{{ query }}"의 검색 결과가 없습니다.</p>
            </div>
        </div>
        
    </div>
    <newFooter></newFooter>
</div>
</template>

<script>
import BackBanner from '@/components/BackBanner.vue'
import Firebase from '@/services/FirebaseServices.js'
import newFooter from '@/components/newFooter.vue'
import folioCard from '@/components/portfoliosVues/portfolioCard.vue'

export default {
    name:'mainPortfolioPage',
    components:{
        BackBanner,
        Firebase,
        newFooter,
        folioCard,
    },
    data(){
        return{
            folios:[],
            iftag:false,
            taglist:{},
            tagout:{'size':0,'num':0},
            tagcnt:0,

            ifsort:false,
            sortup:false,

            ifsearch:false,

            prnok:true,
        }
    },
    created(){
        let th = this
        Firebase.getPortfolios().then(function(data){
            // console.log(" th.folios data: ", data)
            th.folios = data
            
            this.sortPortfolio(this.sortup)
        })
        .catch(function(error){
            console.log("Firebase.getPortfolios() error : ",error)
        })
        // console.log("Firebase.getTagAll() start!")
        Firebase.getTagAll().then(function(datas){
            for(let i=0;i<datas.length;i++){
                let elem = datas[i]
                for(let j=0;j<elem.length;j++){
                    let tag = elem[j]
                    if(th.taglist[tag]){
                        th.taglist[tag].push(elem['id'])
                    }
                    else{
                        th.taglist[tag] = [elem['id']]
                        th.taglist[tag]['check'] = false
                    }
                }
            }
        })
    },
    methods:{
        tagcheck:function(elem,tag){
            // console.log("elem: ",elem)
            // console.log("tag : ",tag)
            if(elem['check']){
                elem['check'] = false
                this.tagout['size'] -= 1
                for(let i=0;i<elem.length;i++){
                    let uid = elem[i]
                    if(this.tagout[uid]){
                        for(let i=0;i<this.tagout[uid].length;i++){
                            if(this.tagout[uid][i] == tag){
                                this.tagout[uid][i] = this.tagout[uid][this.tagout[uid].length-1]
                                this.tagout[uid].pop()
                                break
                            }
                        }

                        if(this.tagout[uid].length ==0 ){
                            delete this.tagout[uid]
                            this.tagout['num'] -= 1
                        }
                    }
                }
            }
            else{
                elem['check'] = true
                this.tagout['size'] += 1
                for(let i=0;i<elem.length;i++){
                    let uid = elem[i]
                    if(this.checkFolioUid(uid)){
                        if(this.tagout[uid]){
                            this.tagout[uid].push(tag)
                        }
                        else{
                            this.tagout[uid] = [tag]
                            this.tagout['num'] += 1
                        }
                    } 
                }
            }
            this.tagcnt+=1
            this.prnok = false
            this.prnok = true
            // console.log("this.tagout: ",this.tagout)
        },
        checkFolioUid:function(uid){
            for(let i=0;i<this.folios.length;i++){
                let folio = this.folios[i]
                if(uid == folio.pk) return true
            }
            return false
        },
        // 이름순 정렬 -------------------------------------------------------
        sortPortfolio:function(up){
            // this.folios[2].id
            // this.folios.sort()
            this.folios.sort(this.comparefolio)
            if(!up) this.folios.reverse()
        },
        comparefolio:function(a,b){
            let str1 = a.pk
            let str2 = b.pk
            return str1.localeCompare(str2)
        },


        // search 페이지에서 가져옴 -----------------------------------------
        // async getItems() {
        //     // variable routing 통해 넘어온 검색단어를 가져옴
        //     this.query = this.$route.params.search_value
        //     var target = this.query
        //     var tmp = await FirebaseServices.getPortfolios()
        //     for (let idx in tmp) {
        //         if (tmp[idx].hashtags.includes(target)) {
        //             this.resultList.push(tmp[idx])
        //         }
        //         else if (tmp[idx].title.includes(target)) {
        //             this.resultList.push(tmp[idx])
        //         }
        //     }
        //     var user = await FirebaseServices.currentUser();
        //     this.resultList.forEach(function(result) {
        //         if (user.bookmark.includes(result.pk)) {
        //             result.like = true;
        //         }
        //     })
        //     this.likeList = user.bookmark
        //     this.uid = user.uid
        // },

        // // 북마크 아이콘의 색깔 표시 및 데이터베이스 저장
        // enrollLike(pk) {
        //     for (let result in this.resultList) {
        //         if (this.resultList[result].pk === pk) {
        //             if (this.resultList[result].like === true) {
        //                 this.resultList[result].like = false
        //                 this.likeList = this.likeList.filter(function(e) { return e !== pk})
        //                 // var index = user.bookmark.indexOf(pk)
        //                 // user.bookmark.splice(index, 1)
        //             } 
        //             else {
        //                 this.resultList[result].like = true
        //                 this.likeList.push(pk)
        //             }
        //         }
        //     }
        //     FirebaseServices.editUser(this.uid, this.likeList);
        // },
        // doAjax() {
        //     this.isLoading = true;
        //     // simulate AJAX
        //     setTimeout(() => {
        //         this.isLoading = false
        //     },1000)
        // },
        // onCancel() {
        //     console.log('User cancelled the loader.')
        // }
    },
    watch:{
         sortup:function(){
             this.sortPortfolio(this.sortup)
         }
    }

}
</script>

<style lang="scss" scoped>
.mainBackBanner{
    font-size: 3rem; 
    font-weight: 300; 
    letter-spacing: 0.08rem; 
    text-shadow: 2px 2px 2px #103b5b; 
    color: white;
}

.foliolist{
    display: grid;
    margin:30px 0 30px 40px;
    width:70%;
    border:2px solid black;
    grid-template-columns: auto auto auto;
}

.folio{
    // height:200px;
    width:90%;
    margin:10px auto;
    border:1px solid blue;
}
.folioLink{
    color:blueviolet;
}

.resultOut{
    align: center; 
    font-size: 2rem; 
    font-weight: 300; 
    margin-top: 3rem; 
    margin-bottom: 5rem;
}

.sidebar{
    // position: absolute;
    width:300px;
    min-height:200px;
    border:1px solid red;
    background-color: white;
    top:20%;
    left:0;
}
.sidebar-part{
    position: relative;
    min-height: 4em;
    text-align: left;
}
.tag-title{
    display: inline-block;
    font-size:2em;
    margin-left: 2em;
    
}
.open-btn{
    float: right;
    padding:0 1em;
    margin-right:1em;
    font-size:2em;
    cursor:pointer
}
.tag-list{
    font-size: 1.3em;
    cursor:pointer
}

</style>

