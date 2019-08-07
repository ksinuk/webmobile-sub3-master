<template>
<div>
    <BackBanner>
        <div slot="pageName">
            <p class="mainBackBanner" v-if="ifsearch"> <span style="color:red;">{{search_input}}</span> Search Results</p>
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
                        <li class="tag-list" v-for="(elem,tag) in tagdict" @click="tagcheck(elem,tag)">
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
                <folioCard :result="user" :me="me" :updateSignal="cardUpdateSignal"/>
            </div>
        </div>

        <!-- 검색 결과가 없을 때 -->
        <div v-if="folios.length == 0 || tagout['num'] == 0 && tagout['size'] != 0" style="height: 50vh;">
            <div>
                <p class="resultOut">검색 결과가 없습니다.</p>
            </div>
        </div>
        
    </div>
    {{me.uid}}<br>
    <newFooter></newFooter>
</div>
</template>

<script>
import BackBanner from '@/components/BackBanner.vue'
import Firebase from '@/services/FirebaseServices.js'
import firebase from 'firebase/app'
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
            me:{},

            folios:[],
            iftag:false,
            tagdict:{},
            tagout:{'size':0,'num':0},
            tagcnt:0,

            ifsort:false,
            sortup:false,

            ifsearch:false,
            search_input:'no search',

            cardUpdateSignal:0,

            prnok:true,
        }
    },
    async created(){
        let th = this

        this.settingMe(th)

        console.log("route : ",this.$route)
        if(this.$route.name == "search"){
            this.search_input = this.$route.params.search_value
            this.ifsearch = true
        }

        this.readFolio(th)     
    },
    methods:{
        settingMe:async function(th){
            await firebase.auth().onAuthStateChanged(function(user) {
                if(user && user.uid){
                    Firebase.getUserData(user.uid).then(function(data){
                        th.me = data
                        th.me['uid'] = user.uid
                        th.cardUpdateSignal += 1
                    })
                }
            })
        },
        readFolio: async function(th){
            await Firebase.getPortfolios(this.ifsearch, this.search_input).then(function(data){
                // console.log(" th.folios data: ", data)
                th.folios = data

                for(let i=0;i<th.folios.length;i++){
                    let post = th.folios[i]
                    for(let ii=0;ii<post.portfolios.length;ii++){
                        let folio = post.portfolios[ii]
                        for(let j=0;j<folio.hashtags.length;j++){
                            let tag = folio.hashtags[j]

                            console.log("make tag : ",tag)

                            if(th.tagdict[tag]){
                                th.tagdict[tag].push(post['id'])
                            }
                            else{
                                th.tagdict[tag] = [post['id']]
                                th.tagdict[tag]['check'] = false
                            }
                        }
                    }
                }


                th.cardUpdateSignal += 1
                this.sortPortfolio(this.sortup)
            })
            .catch(function(error){
                console.log("Firebase.getPortfolios() error : ",error)
            })
        },

        tagcheck:function(elem,tag){
            // console.log("elem: ",elem)
            // console.log("tag : ",tag)
            if(elem['check']){
                elem['check'] = false
                this.tagout['size'] -= 1
                if(this.tagout['size'] == 0){
                    this.tagout = {'size':0,'num':0}
                }
                else{
                    for(let i=0;i<elem.length;i++){
                        let use = this.searchUid(elem[i])
                        let nowtags = searchTagInFolio(use)
                        let inputok = true

                        for(let oktag in this.tagdict){
                            if(oktag.check){
                                let tempok = false
                                for(let k=0;k<nowtags.length;k++){
                                    let thistag = nowtags[k]
                                    if(thistag == oktag){
                                        tempok = true 
                                        break 
                                    }
                                }
                                if(!tempok) {
                                    inputok = false
                                    break
                                }
                            }
                        }

                        if(inputok) {
                            this.tagout[elem[i]]
                        }
                    }
                }   
            }
            else{
                elem['check'] = true
                this.tagout['size'] += 1
                if(this.tagout['size'] == 1){
                    for(let i=0;i<elem.length;i++){
                        let uid = elem[i]
                        if(this.checkFolioUid(uid)){
                            let temp = this.searchUid(uid)

                            this.tagout[uid] = temp
                            this.tagout['num'] += 1 
                        } 
                    }
                }
                else{
                    for(let use in this.tagout){
                        let uid = user.pk
                        if(uid == 'size' || uid == 'num') continue 

                        if(this.checkFolioUid(uid)){
                            let uidtag = searchTagInFolio(use)

                            let delok = true
                            for(let j=0;j<uidtag.length;j++){
                                if(uidtag[j] == tag){
                                    delok = false
                                    break
                                }
                            }

                            if(delok){
                                this.tagout[i] = this.tagout[this.tagout.length-1]
                                i-=1
                                this.tagout.pop()
                                this.tagout['num'] -= 1 
                            }
                        }
                    }
                }  
            }
            this.tagcnt+=1
            this.prnok = false
            this.prnok = true
            // console.log("this.tagout: ",this.tagout)
            this.cardUpdateSignal += 1
        },
        checkFolioUid:function(uid){
            for(let i=0;i<this.folios.length;i++){
                let folio = this.folios[i]
                if(uid == folio.pk) return true
            }
            return false
        },
        searchUid(uid){
            for(let j=0;j<this.folios.length;j++){
                if(this.folios[j].pk == uid) return this.folios[j]
            }
            return false
        },
        searchTagInFolio(post){
            let out = []
            for(let i=0;i<post.portfolios.length;i++){
                let folio = post.portfolios[i]
                for(let j=0;j<folio.hashtags.length;j++){
                    out.push(folio.hashtags[j])
                }
            }
            return out
        },
        // 이름순 정렬 -------------------------------------------------------
        sortPortfolio:function(up){
            // this.folios[2].id
            // this.folios.sort()
            this.folios.sort(this.comparefolio)
            if(!up) this.folios.reverse()
            this.cardUpdateSignal += 1
        },
        comparefolio:function(a,b){
            let str1 = a.pk
            let str2 = b.pk

            return str1.localeCompare(str2)
        },


        // search 페이지에서 가져옴 -----------------------------------------

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
    grid-template-columns: 32% 32% 32%;
}

.folio{
    // height:500px;
    width:90%;
    margin:10px auto;
    border:1px solid blue;
}
.folioLink{
    color:blueviolet;
}

.resultOut{
    text-align: center; 
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

