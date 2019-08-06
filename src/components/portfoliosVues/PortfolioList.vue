<template lang="html">
<div>
    <section role="region" id="foliolist" class="l-section">
        <div class="l-section-holder">
            <h1 class="section-heading is-init is-animated" data-animation="fade-up">
                <span class="secondary">Portfolio</span>
                <span class="primary">My works</span>
            </h1>
            <div id="portfolio" class="section-content gallery alternate">
                <v-flex v-for="portfolio in portfolios.portfolios">
                    <PortfolioList :ports="portfolio" :cssmod="css" :change="cssChange" :user="user"></PortfolioList>
                </v-flex>
            </div>
        </div>
    </section>
    
    <v-navigation-drawer v-model="portfolioDrawer" fixed temporary disable-route-watcher>
      <v-list class="pt-0" dense>
        <v-expansion-panel>

            <!-- layout selector -->
            <v-expansion-panel-content>
                <template v-slot:header>
                <div><i class="fas fa-image pr-3"></i>Layout</div>
                </template>
                <v-card>
                <v-card-text>
                    <div>

                        <div style="display: flex;">
                            <v-checkbox label="modal" @change="changeCss(1,true)"></v-checkbox>
                            <v-checkbox label="grid" @change="changeCss(2,true)"></v-checkbox>
                        </div>

                    </div>
                    <v-divider style="width: 20rem; margin-left: 0;"></v-divider>

                    <div class="px-1">
                    <p style="font-weight: bold; font-size: 1.2rem; letter-spacing: 0.05rem;">Color</p>
                    <div>
                        <v-radio-group v-model="tmp.color">
                            <v-radio label="white" value="portColor1" @change="changeCss(0,1)"></v-radio>
                            <v-radio label="black" value="portColor2" @change="changeCss(0,2)"></v-radio>
                            <v-radio label="blue" value="portColor3" @change="changeCss(0,3)"></v-radio>
                        </v-radio-group>
                    </div>
                    </div>
                    <div style="text-align: center;">
                    <v-btn small color="primary" @click="">Apply</v-btn>
                    </div>
                </v-card-text>
                </v-card>
            </v-expansion-panel-content>
          <!-- animation selector -->
          <v-expansion-panel-content>
            <template v-slot:header>
              <div><i class="fas fa-image pr-3"></i>Animation</div>
            </template>
            <v-card>
              <v-card-text>
                <div>
                  <div>
                    <button>애니메이션 1</button>
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>
          <!-- contents editor -->
            <v-expansion-panel-content>
                <template v-slot:header>
                    <div><i class="fas fa-keyboard pr-3"></i>Contents</div>
                </template>
                <v-card>
                    <v-card-text  v-for="port in portfolios.portfolios">
                        <v-hover>
                        <v-card @click="dialog = true; editPort(portfolios.portfolios.indexOf(port))" slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`" style="height: 15rem; width: 18rem; text-align: center;">
                            <v-img :src="port.imageNames" style="height: 12rem;"></v-img>
                            <span style="line-height: 3rem; vertical-align: middle;">{{port.title}}</span>
                        </v-card>
                        </v-hover>
                    </v-card-text>
                    <v-card-text>
                        <v-hover>
                        <v-card @click="dialog = true; addPort();" slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`" style="height: 15rem; width: 18rem; text-align: center;">
                            <i class="fas fa-plus fa-2x" style="color: grey; line-height: 15rem; vertical-align: middle;"></i>
                        </v-card>
                        </v-hover>
                    </v-card-text>
                </v-card>
            </v-expansion-panel-content>
        </v-expansion-panel>
      </v-list>
    </v-navigation-drawer>

    <!-- contents editor -->
    <v-dialog v-model="dialog" max-width="600">
        <v-card>
            <v-card-title>
                <span class="headline">PORTFOLIO</span>
            </v-card-title>
            <v-card-text>
                <v-text-field v-model="portfolio.title" label="Title"></v-text-field>
                <v-text-area name="input-7-1" v-model="portfolio.description" label="Description"></v-text-area>
                <v-text-field v-model="hashtag" label="Hashtag" v-on:keyup.enter="enrollTag()"></v-text-field>
                <template>
                    <td v-for="(tag, index) in portfolio.hashtags">
                        <v-chip close color="teal" text-color="white" v-model="portfolio.hashtags[index]">
                            <v-avatar>
                                <v-icon>check_circle</v-icon>
                            </v-avatar>
                            {{ tag }}
                        </v-chip>
                    </td>
                </template>
                <v-text-field v-model="portfolio.viewport" label="ViewPort"></v-text-field>
                <v-text-field v-model="portfolio.ie" label="IE"></v-text-field>
                <v-text-field v-model="portfolio.demo" label="Demo Link"></v-text-field>
                <v-text-field v-model="portfolio.repository" label="Repository Link"></v-text-field>
                <v-simple-table>
                    <thead>
                        <tr>
                        <th class="text-left pt-3 pb-2">Category</th>
                        <th class="text-left">File Name</th>
                        <th class="text-left">Git Path</th>
                        <th class="texdt-left">Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="pb-2" v-for="(item, index) in portfolio.sources">
                        <td>
                            <v-select
                            v-model="item.category"
                            :items="items"
                            label="Category"
                            solo
                            required
                            ></v-select>
                        </td>
                        <td>
                            <v-text-field
                            v-model="item.fileName"
                            label="File Name"
                            solo
                            ></v-text-field>
                        </td>
                        <td>
                            <v-text-field
                            v-model="item.gitPath"
                            label="Git Path"
                            solo
                            ></v-text-field>
                        </td>
                        <td>
                            <v-text-field
                            v-model="item.fileDes"
                            label="Description"
                            solo
                            ></v-text-field>
                        </td>
                        <td class="text-xs-center">
                            <v-btn color="error" fab small dark @click="removeSource(index)">
                            <v-icon>remove</v-icon>
                            </v-btn>
                        </td>
                        </tr>
                        <tr class="pb-2">
                        <td>
                            <v-select
                            v-model="source.category"
                            :items="items"
                            label="Category"
                            solo
                            required
                            ></v-select>
                        </td>
                        <td>
                            <v-text-field
                            v-model="source.fileName"
                            label="File Name"
                            solo
                            ></v-text-field>
                        </td>
                        <td>
                            <v-text-field
                            v-model="source.gitPath"
                            label="Git Path"
                            solo
                            ></v-text-field>
                        </td>
                        <td>
                            <v-text-field
                            v-model="source.fileDes"
                            label="Description"
                            solo
                            ></v-text-field>
                        </td>
                        <td class="text-xs-center">
                            <v-btn color="teal" fab small dark @click="addSource()">
                            <v-icon>add</v-icon>
                            </v-btn>
                        </td>
                        </tr>
                    </tbody>
                    </v-simple-table>
                    <!-- image 추가하기 -->
                    <v-layout wrap justify-center>
                        <v-flex xs6 md6 lg6 d-flex>
                            <v-sheet
                            class="d-flex my-3"
                            color="teal lighten-3"
                            height="150"
                            :elevation="6"
                            id="drop-zone"
                            v-bind:class="[isDragging?'drag-over':'']"
                            v-on:dragover="isDragging=true"
                            v-on:dragenter="isDragging=true"
                            v-on:dragleave="isDragging=false"
                            >
                            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%;"> 
                                <p class="my-auto mx-auto">Drag and Drop image files</p>
                            </div>
                            <input type="file" @change="onChange" multiple style="position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; width: 100%; height: 100% opacity: 0;">
                            </v-sheet>
                        </v-flex>
                    </v-layout>
                    <v-layout v-if="portfolio.dumpImg !== null">
                        <v-flex class="px-3 py-3">
                            <img v-bind:src="portfolio.dumpImg" width="400rem" height="200rem">
                        </v-flex>
                    </v-layout>
                    <v-layout>
                        <v-flex>
                            <v-btn color="grey" @click="portfolio.dumpImg = null;">Reset</v-btn>
                        </v-flex>
                    </v-layout>
                </v-card-text>
            <v-card-actions>
                <v-spacer/>
                <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
                <v-btn color="blue darken-1" flat @click="dialog = false; save();">Save</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</div>
</template>

<script>
import FirebaseServices from '@/services/FirebaseServices'
import PortfolioList from './PortfolioElem.vue'
import firebase from 'firebase/app'

export default {

    name: 'portfoliolist',
    components: {
        PortfolioList
    },
    props:{
    },
    data() {
        return {
            portfolios:[],
            uid:'',
            user:'',
            mybookmark:false,
            iscontrol:false,
            portfolioDrawer:false,
            tmplayout: null,
            tmp: {
                layout: null,
                color: null,
            },
            css:{
                color:1,
                modal:false,
                grid:false,
                version:'2.0.0',
            },
            visitNum:0,
            toBookMarkNum:0,
            cssChange:0,
            dialog: false,
            idx: null,
            hashtag: null,
            items: ['html', 'css', 'vue', 'js', 'json', 'c', 'c++', 'java', 'python'],
            isDragging: false,
            imageList: [],
            source: {
                category: null,
                fileName: null,
                gitPath: null,
                fileDes: null
            },
            portfolio: {
                title: null,
                description: null,
                viewport: null,
                ie: null,
                demo: null,
                hashtags: [],
                repository: null,
                sources: [],
                imageNames: null,
                dumpImg: null
            }
        }
    },
    created(){
        let __this = this;

        this.getPortfolio();
        
        this.$EventBus.$on('Portfolio', () => {
            this.portfolioDrawer = !this.portfolioDrawer
            })

        
        if(this.$route.params.uid){
            let uid = this.$route.params.uid
            __this.uid = uid
            __this.getPortfolio(uid)
            FirebaseServices.getUserData(uid)
            .then(function(data){
                if(data){
                    if(data.css.version) th.css = data.css
                    else{
                        __this.css.color = data.css
                        if(data.css == 3){
                            __this.css.modal = true
                        }
                        else if(data.css == 2){
                            __this.css.grid = true
                        }
                    }

                    if(data.visitNum) __this.visitNum = data.visitNum+1
                    else __this.visitNum = 1

                    if(data.bookmarks){
                        __this.toBookMarkNum = data.bookmarks.length
                        for(let i=0;i<data.bookmarks.length;i++){
                            let bookmark = data.bookmarks[i]
                            if(bookmark == __this.user.uid) {
                                __this.mybookmark = true
                                break
                            }
                        }
                    }
                    FirebaseServices.updateUserData(uid,__this.css,__this.visitNum)
                }
                else{
                    FirebaseServices.setUserData(uid,__this.css,__this.visitNum)
                }
                th.cssChange = th.cssChange+1
            })

            firebase.auth().onAuthStateChanged(function(user){
                if (user){
                    __this.user = user
                }
            })   
        }
        else{
            firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                    __this.user = user
                    __this.iscontrol = true
                    __this.getPortfolio(user.uid)
                    FirebaseServices.getUserData(user.uid)
                    .then(function(data){
                        if(data){
                            if(data.css.version) __this.css = data.css
                            else{
                                __this.css.color = data.css
                                if(data.css == 3){
                                    __this.css.modal = true
                                }
                                else if(data.css == 2){
                                    __this.css.grid = true
                                }
                            }
                            __this.visitNum = data.visitNum
                        }
                        else{
                            __this.visitNum = 0
                        }
                        __this.cssChange = __this.cssChange+1
                    })
                    .catch(function(){
                    })
                }
            })
        }
    },
    methods:{
        async getPortfolio(uid) {
            let __this = this;
            var storage = firebase.storage();
            var storageRef = storage.ref();
            const tmp = firebase.auth().onAuthStateChanged(function(user) {
                __this.user = user.uid;
                FirebaseServices.getMyPort(user.uid).then(function(res) {
                    __this.portfolios = res;
                    console.log(__this.portfolios);
                    for (let item in __this.portfolios.portfolios) {
                        storageRef.child('users/' + __this.user + '/' + __this.portfolios.portfolios[item].imageNames).getDownloadURL().then(function(url) {
                            var xhr = new XMLHttpRequest();
                            xhr.responseType = 'blob';
                            xhr.onload = function(event) {
                                var blob = xhr.response;
                            }
                            xhr.open('GET', url)
                            xhr.send();
                            __this.portfolios.portfolios[item].imageNames = url;
                        }).catch(function(error) {
                            console.log(error);
                        })
                    }
                    console.log(__this.portfolios);
                })
            })
        },
        changeCss(num,write) {
            if(num == 0) this.css.color = write
            else if(num == 1) this.css.modal = !this.css.modal
            else if(num == 2) this.css.grid = !this.css.grid
            // let th = this
            // firebase.auth().onAuthStateChanged(function(user) {
            //     if (user) {
            //         FirebaseService.updateUserData(user.uid,th.css,th.visitNum)
            //     }
            // })

            this.cssChange = this.cssChange+1
        },
        doMybookmark(del){
            this.mybookmark = !del
            this.toBookMarkNum += del ? -1:1
            FirebaseService.setBookMark(this.user.uid,this.uid,del)
        },
        editPort(idx) {
            this.idx = idx;
            this.portfolio.title = this.portfolios.portfolios[idx].title;
            this.portfolio.description = this.portfolios.portfolios[idx].description;
            this.portfolio.viewport = this.portfolios.portfolios[idx].viewport;
            this.portfolio.ie = this.portfolios.portfolios[idx].ie;
            this.portfolio.demo = this.portfolios.portfolios[idx].demo;
            this.portfolio.hashtags = this.portfolios.portfolios[idx].hashtags;
            this.portfolio.repositofy = this.portfolios.portfolios[idx].repository;
            this.portfolio.sources = this.portfolios.portfolios[idx].sources;
            this.portfolio.imageNames = this.portfolios.portfolios[idx].imageNames;
            this.portfolio.dumpImg = this.portfolios.portfolios[idx].imageNames;
        },
        // 태그 추가하기
        enrollTag: function() {
            this.portfolio.hashtags.push(this.hashtag)
            this.hashtag = null
        },
        // 소스 추가하기
        addSource: function() {
            if (this.source.category !== null && this.source.fileName !== null && this.source.gitPath !== null && this.source.fileDes !== null) {
                this.portfolio.sources.push(JSON.parse(JSON.stringify(this.source)))
                this.source.category = null
                this.source.fileName = null
                this.source.gitPath = null
                this.source.fileDes = null
            }
        },
        // 소스 지우기
        removeSource: function(idx) {
            this.portfolio.sources.splice(idx, 1)
        },
        // image view 만들기
        onChange(file) {
            this.isDragging = false
            let loadFile = file.target.files || file.dataTransfer.files

            if (loadFile.length == 0) {
                return
            }
            this.addViewImage(loadFile)
        },
        addViewImage: function(files) {
            let _this = this

            for (let i=0; i < files.length; i++) {
                let file = files[i]
                let reader = new FileReader()
                if (file.type.match(/image.*/)) {
                reader.onload = function(e) {
                    for (let j=0; j < files.length; j++) {
                    }
                    _this.portfolio.dumpImg = e.target.result;
                    console.log(_this.portfolio.dumpImg);
                }
                reader.readAsDataURL(file)
                _this.portfolio.imageNames = file.name
                _this.imageList.push(file)
                } else {
                alert('이미지 파일만 올려주세요.')
                }
            }
        },
        upload(user) {
            console.log(user)
            for (const image in this.imageList) {
                FirebaseServices.uploadfile(user, this.imageList[image])
            }
        },
        addPort() {
            this.idx = null;
            this.portfolio.title = null;
            this.portfolio.description = null;
            this.portfolio.viewport = null;
            this.portfolio.ie = null;
            this.portfolio.demo = null;
            this.portfolio.hashtags = [];
            this.portfolio.repositofy = null;
            this.portfolio.sources = [];
            this.portfolio.imageNames = [];
            this.portfolio.dumpImg = null;
        },
        async save() {
            if (this.source.category !== null && this.source.fileName !== null && this.source.gitPath !== null && this.source.fileDes !== null) {
                this.portfolio.sources.push(JSON.parse(JSON.stringify(this.source)))
                this.source.category = null
                this.source.fileName = null
                this.source.gitPath = null
                this.source.fileDes = null
            }
            // 포트폴리오 저장하기
            if (this.idx !== null) {
                this.portfolios.portfolios[this.idx].title = this.portfolio.title;
                this.portfolios.portfolios[this.idx].description = this.portfolio.description;
                this.portfolios.portfolios[this.idx].viewport = this.portfolio.viewport;
                this.portfolios.portfolios[this.idx].ie = this.portfolio.ie;
                this.portfolios.portfolios[this.idx].demo = this.portfolio.demo;
                this.portfolios.portfolios[this.idx].hashtags = this.portfolio.hashtags;
                this.portfolios.portfolios[this.idx].repository = this.portfolio.repositofy;
                this.portfolios.portfolios[this.idx].sources = this.portfolio.sources;
                this.portfolios.portfolios[this.idx].imageNames = this.portfolio.imageNames;
                this.portfolios.portfolios[this.idx].dumpImg = this.portfolio.dumpImg;
                this.upload(this.user);
                this.imageList = [];
            } else {
                this.portfolios.portfolios.push(JSON.parse(JSON.stringify(this.portfolio)));
                console.log(this.portfolios.portfolios);
            }
            const result = await FirebaseServices.postPortfolios(this.user, this.portfolios.aboutMe, this.portfolios.layout, this.portfolios.banner, this.portfolios.portfolios, this.portfolios.skills, this.portfolios.subtitle, this.portfolios.title, this.portfolios.userImage);
            this.getPortfolio();
        }
    }
}
</script>

<style lang="css" scoped>
/* section */
@media screen and (max-width: 1499px) {
    .l-section {
    padding: 100px 5vw;
    }
}
#select-css{
    z-index:20;
    position:fixed;
    bottom:0;
    left:0;
    padding:10px;
    width:300px;
    background-color: rgb(66,66,66);
    font-family: monospace;
    color:white;
    font-size:20px;
    font-weight: bold;
}
.select-div{
    position: relative;
    height:50px;
}
.sidebar-open{
    margin:0 0 10px 0;
}
.select-div button{
    position:absolute;
    top:50%;
    left:10%;
    transform: translateY(-50%);
    padding:5px 10px;
}
.isok{
  position:absolute;
  top:50%;
  right:20%;
  transform: translateY(-50%);
  margin:auto 20px;
  background-color: green;
  border-radius: 10px;
  height:20px;
  width:20px;
}

.l-section {
    background: white;
    min-height: 100vh;
    padding: 15vh 100px;
    position: relative;
    box-sizing: border-box;
}

figcaption {
    display: block;
}

/* gallery */
.gallery-spec-item {
    display: block;
    line-height: 2.4;
}
.gallery-spec-key {
    min-width: 130px;
    padding-right: .5em;
    font-family: "Quicksand",sans-serif;
}
.gallery-title::before {
    color: #30b7e8;
    display: inline-block;
    width: 130px;
    position: relative;
    left: -0.05em;
    vertical-align: -0.1em;
    line-height: 1;
    font-size: 64px;
    font-weight: 400;
    content: counter(article,decimal-leading-zero);
}

.gallery-title {
    position: relative;
    margin-bottom: 1.5em;
}

.gallery-spec-key, .gallery-spec-value {
    display: inline-block;
    vertical-align: middle;
}

b, strong, dt {
    font-weight: 500;
}

.gallery-spec-item {
    display: block;
    line-height: 2.4;
}

h1, h2, h3, h4, h5, h6 {
    margin: 0;
    line-height: 1.2;
    font-family: "Quicksand",sans-serif;
    font-weight: normal;
}

h1 {
  color: black;
}

h3 {
    display: block;
    font-size: 1.17em;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
}

/*palette */

li {
    display: list-item;
    text-align: -webkit-match-parent;
}
.palette {
    display: inline-block;
    margin: 0;
    padding: 0;
    vertical-align: middle;
    list-style: none;
}

section {
    display: block;
    color: black;
    line-height: 2;
    font-family: "Roboto",system-ui,-apple-system,BlinkMacSystemFont,"Malgun Gothic",Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;
    font-weight: 400;
    -webkit-text-size-adjust: none;
    -moz-text-size-adjust: none;
    -ms-text-size-adjust: none;
    -o-text-size-adjust: none;
    text-size-adjust: none;
    font-size: 15px;
}

/*portfolio  head */
.secondary {
    border-color: #424242 !important;
}

.primary {
    border-color: #1976d2 !important;
}
.section-heading .secondary {
    display: block;
    font-size: 24px;
    opacity: .5;
    speak: none;
}

.section-heading {
    text-align: center;
}

.section-heading .primary {
    display: block;
    font-size: 64px;
    padding-bottom: .25em;
    position: relative;
}

.section-heading .primary::after {
    background: #30b7e8;
    border-radius: .25em;
    display: block;
    width: 1.25em;
    height: 2px;
    margin-left: -.625em;
    position: absolute;
    bottom: 0;
    left: 50%;
    content: "";
}

/* table*/
a {
    background-color: transparent;
    color: #30b7e8;
    text-decoration: none;
    cursor: pointer;
}

p, dl, ol, ul {
    word-break: keep-all;
}

.bookMarkBtnIn , .bookMarkBtnOut{
    display:inline-block;
    margin:5px 10px;
    padding:10px;
    font-size:20px;
}
.bookMarkBtnIn{
    border:6px solid skyblue;
    background-color: blue;
    color:white;
}
.bookMarkBtnOut{
    border:6px solid pink;
    background-color: red;
    color:white;
}
.bookMarkBtnIn:hover{
    border:6px solid blue;
    background-color: skyblue;
    color:white;
}
.bookMarkBtnOut:hover{
    border:6px solid red;
    background-color: pink;
    color:white;
}

</style>
