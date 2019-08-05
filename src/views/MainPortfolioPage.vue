<template>
<div>
    <BackBanner>
        <div slot="pageName">
            <p class="mainBackBanner">MAIN Portfolio Page</p>
        </div>
    </BackBanner>
    
    <div style="display:flex; position:relative;">
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
        <div class="foliolist">
            <div class="folio" v-for="user in folios" v-if="tagout[user.id] || !tagout.size">
                <p><a class="folioLink" :href="user.addr">{{user.id}}</a></p>
            </div>
        </div>
        
    </div>
</div>
</template>

<script>
import BackBanner from '@/components/BackBanner.vue'
import Firebase from '@/services/FirebaseServices.js'

export default {
    name:'mainPortfolioPage',
    components:{
        BackBanner,
        Firebase
    },
    data(){
        return{
            folios:[],
            iftag:false,
            taglist:{},
            tagout:{'size':0},
            tagcnt:0,

            ifsort:false,
            sortup:false,
        }
    },
    created(){
        let th = this
        Firebase.getUserDataAll().then(function(data){
            th.folios = data
            console.log(" th.folios: ", th.folios)
            this.sortPortfolio(this.sortup)
        })
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
                            this.tagout['size'] -= 1
                        }
                    }
                }
            }
            else{
                elem['check'] = true
                for(let i=0;i<elem.length;i++){
                    let uid = elem[i]
                    if(this.tagout[uid]){
                        this.tagout[uid].push(tag)
                    }
                    else{
                        this.tagout[uid] = [tag]
                        this.tagout['size'] += 1
                    }
                }
            }
            this.tagcnt+=1
            // console.log("this.tagout: ",this.tagout)
        },
        sortPortfolio:function(up){
            // this.folios[2].id
            // this.folios.sort()
            this.folios.sort(this.comparefolio)
            if(!up) this.folios.reverse()
        },
        comparefolio:function(a,b){
            let str1 = a.id
            let str2 = b.id
            return str1.localeCompare(str2)
        }
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
    width:60%;
    border:2px solid black;
    grid-template-columns: auto auto auto;
}

.folio{
    height:200px;
    width:90%;
    margin:10px auto;
    border:1px solid blue;
}
.folioLink{
    color:blueviolet;
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

