<template>
    <div class="header">
        <v-layout v-if="layout === null" id="banner" row justify-center align-center style="min-height: 100vh; position: relative; background-size: cover;">
            <v-flex>
                <h1 id="portTitle" style="display: hidden; font-weight: 300; letter-spacing: 0.08rem;"></h1>
                <p id="portSubtitle" style="display: hidden;"></p>
            </v-flex>
        </v-layout>
        <v-layout v-else-if="layout === 'template1'" id="banner" row justify-center align-center style="min-height: 100vh; position: relative; background-size: cover;">
            <v-flex>
                <h1 id="portTitle" style="font-weight: 300; letter-spacing: 0.08rem;">{{portfolio.title.content}}</h1>
                <p id="portSubtitle">{{portfolio.subtitle.content}}</p>
            </v-flex>
            <v-btn outline color="white" style="margin-top: auto; margin-left: auto; margin-bottom: 2rem; margin-right: 2rem;" @click.stop="drawer = !drawer;"><i class="fas fa-palette pr-2"></i>EDIT</v-btn>
        </v-layout>
        <v-layout v-else-if="layout === 'template2'" id="banner" row justify-center align-center style="min-height: 100vh; position: relative; background-size: cover;">
            <v-flex>
                <h1 id="portTitle" style="font-weight: 300; letter-spacing: 0.08rem;">{{portfolio.title.content}}</h1>
                <p id="portSubtitle">{{portfolio.subtitle.content}}</p>
            </v-flex>
            <v-btn outline color="white" style="margin-top: auto; margin-left: auto; margin-bottom: 2rem; margin-right: 2rem;" @click.stop="drawer = !drawer;"><i class="fas fa-palette pr-2"></i>EDIT</v-btn>
        </v-layout>




        <!-- sidebar -->
        <v-navigation-drawer
            v-model="drawer"
            :mini-variant="mini"
            absolute
            dark
            temporary
        >
            <v-list class="pt-0" dense>
                <v-expansion-panel>
                    <v-expansion-panel-content>
                        <template v-slot:header>
                            <div><i class="fas fa-image pr-3"></i>Background</div>
                        </template>
                        <v-card>
                            <v-card-text>
                                <v-select
                                    v-model="select"
                                    :items="items"
                                    item-text="theme"
                                    item-value="img"
                                    label="Sample"
                                    color="white"
                                    return-object
                                ></v-select>
                                <div class="filebox">
                                    <v-text-field v-model="fileName" readonly color="white" label="User Image" placeholder="선택된 파일 없음"></v-text-field>
                                    <label for="input_file">파일찾기</label>
                                    <input type="file" id="input_file" class="upload-hidden" @change="userImage">
                                </div>
                                <div class="py-3">
                                    <img :src="this.select.img" height="170rem;" width="265rem;"/>
                                </div>
                                <div style="text-align: center;">
                                    <v-btn small color="primary" @click="saveImg()">Apply</v-btn>
                                    <!--<v-btn small color="error">Init</v-btn>-->
                                </div>
                            </v-card-text>
                        </v-card>
                    </v-expansion-panel-content>
                    <v-expansion-panel-content>
                        <template v-slot:header>
                            <div><i class="fas fa-indent pr-3"></i>Layout</div>
                        </template>
                        <v-card>
                            <v-card-text>
                                <v-radio-group v-model="tmplayout">
                                    <v-radio label="Option 1" value="template1" color="primary"></v-radio>
                                    <img src="../../assets/array1.jpg" style="padding-bottom: 1rem;" height="170rem;" width="265rem;"/>
                                    <v-radio label="Option 2" value="template2" color="primary"></v-radio>
                                    <!-- 이미지 넣기 -->
                                </v-radio-group>
                                <div style="text-align: center;">
                                    <v-btn small color="primary" @click="saveLayout()">Apply</v-btn>
                                </div>
                            </v-card-text>
                        </v-card>
                    </v-expansion-panel-content>
                    <v-expansion-panel-content>
                        <template v-slot:header>
                            <div><i class="fas fa-font pr-3"></i>Font</div>
                        </template>
                        <v-card>
                            <v-card-text>
                                <div class="px-1">
                                    <v-radio-group v-model="choice" row>
                                        <v-radio label="Title" value="title" color="primary"></v-radio>
                                        <v-radio label="Subtitle" value="subtitle" color="primary"></v-radio>
                                    </v-radio-group>
                                    <div class="px-1">
                                        <p style="color: lightgrey; letter-spacing: 0.05rem;">Size</p>
                                        <!-- title 선택했을 때 -->
                                        <v-slider
                                            v-if="choice === 'title'"
                                            v-model="titleS"
                                            step="1"
                                            max="20"
                                            min="1"
                                            thumb-label
                                            ticks
                                            class="px-2"
                                        ></v-slider>
                                        <!-- subtitle 선택했을 때 -->
                                        <v-slider
                                            v-else-if="choice === 'subtitle'"
                                            v-model="subtitleS"
                                            step="1"
                                            max="10"
                                            min="1"
                                            thumb-label
                                            ticks
                                            class="px-2"
                                        ></v-slider>
                                    </div>
                                </div>
                                <v-divider style="width: 20rem; margin-left: 0;"></v-divider>
                                <div class="px-1">
                                    <div class="px-1">
                                        <p style="color: lightgrey; letter-spacing: 0.05rem;">Color</p>
                                        <!-- color picker -->
                                        <div v-if="choice === 'title'">
                                            <div id="titleColor" class="mx-auto" style="height: 3rem;; width: 15rem; background-color: rgb(255, 255, 255)"></div>
                                            <v-layout
                                                row
                                                wrap
                                            >
                                                <v-flex xs9>
                                                    <v-slider
                                                    v-model="tRed"
                                                    :max="255"
                                                    label="R"
                                                    color="error"
                                                    ></v-slider>
                                                </v-flex>

                                                <v-flex xs3>
                                                    <v-text-field
                                                    v-model="tRed"
                                                    class="mt-0 ml-auto"
                                                    style="width: 3.5rem;"
                                                    type="number"
                                                    ></v-text-field>
                                                </v-flex>

                                                <v-flex xs9>
                                                    <v-slider
                                                    v-model="tGreen"
                                                    :max="255"
                                                    label="G"
                                                    color="success"
                                                    ></v-slider>
                                                </v-flex>

                                                <v-flex xs3>
                                                    <v-text-field
                                                    v-model="tGreen"
                                                    class="mt-0 ml-auto"
                                                    style="width: 3.5rem;"
                                                    type="number"
                                                    ></v-text-field>
                                                </v-flex>

                                                <v-flex xs9>
                                                    <v-slider
                                                    v-model="tBlue"
                                                    :max="255"
                                                    label="B"
                                                    color="primary"
                                                    ></v-slider>
                                                </v-flex>

                                                <v-flex xs3>
                                                    <v-text-field
                                                    v-model="tBlue"
                                                    class="mt-0 ml-auto"
                                                    style="width: 3.5rem;"
                                                    type="number"
                                                    ></v-text-field>
                                                </v-flex>
                                            </v-layout>
                                        </div>
                                    <div v-else-if="choice === 'subtitle'">
                                        <div id="subtitleColor" class="mx-auto" style="height: 3rem;; width: 15rem; background-color: rgb(255, 255, 255)"></div>
                                            <v-layout
                                                row
                                                wrap
                                            >
                                                <v-flex xs9>
                                                    <v-slider
                                                    v-model="sRed"
                                                    :max="255"
                                                    label="R"
                                                    color="error"
                                                    ></v-slider>
                                                </v-flex>

                                                <v-flex xs3>
                                                    <v-text-field
                                                    v-model="sRed"
                                                    class="mt-0 ml-auto"
                                                    style="width: 3.5rem;"
                                                    type="number"
                                                    ></v-text-field>
                                                </v-flex>

                                                <v-flex xs9>
                                                    <v-slider
                                                    v-model="sGreen"
                                                    :max="255"
                                                    label="G"
                                                    color="success"
                                                    ></v-slider>
                                                </v-flex>

                                                <v-flex xs3>
                                                    <v-text-field
                                                    v-model="sGreen"
                                                    class="mt-0 ml-auto"
                                                    style="width: 3.5rem;"
                                                    type="number"
                                                    ></v-text-field>
                                                </v-flex>

                                                <v-flex xs9>
                                                    <v-slider
                                                    v-model="sBlue"
                                                    :max="255"
                                                    label="B"
                                                    color="primary"
                                                    ></v-slider>
                                                </v-flex>

                                                <v-flex xs3>
                                                    <v-text-field
                                                    v-model="sBlue"
                                                    class="mt-0 ml-auto"
                                                    style="width: 3.5rem;"
                                                    type="number"
                                                    ></v-text-field>
                                                </v-flex>
                                            </v-layout>
                                        </div>
                                    </div>
                                </div>
                                <div style="text-align: center;">
                                    <v-btn small color="primary" @click="saveFont()">Apply</v-btn>
                                </div>
                            </v-card-text>
                        </v-card>
                    </v-expansion-panel-content>
                    <v-expansion-panel-content>
                        <template v-slot:header>
                            <div><i class="fas fa-play-circle pr-3"></i>Animation</div>
                        </template>
                        <v-card>
                            <v-card-text>
                                <p></p>
                            </v-card-text>
                        </v-card>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script>
import FirebaseServices from '../../services/FirebaseServices'
import firebase from 'firebase/app'

export default {

    name: 'header',
    data() {
        return {
            user: null,
            portfolio: [],
            drawer: null,
            mini: false,
            select: { theme: 'Dolphin', img: 'https://firebasestorage.googleapis.com/v0/b/teamportfolio-d978f.appspot.com/o/banner%2Fexample4.jpg?alt=media&token=c3ba9a94-7889-40eb-b68c-2fda0d6247ac' },
            fileName: null,
            items: [
                { theme: 'Dolphin' , img: 'https://firebasestorage.googleapis.com/v0/b/teamportfolio-d978f.appspot.com/o/banner%2Fexample4.jpg?alt=media&token=c3ba9a94-7889-40eb-b68c-2fda0d6247ac' },
                { theme: 'Mountain', img: 'https://firebasestorage.googleapis.com/v0/b/teamportfolio-d978f.appspot.com/o/banner%2Fexample5.jpg?alt=media&token=4d683a8c-6543-4116-93eb-fa290493932f' },
                { theme: 'Horizon', img: 'https://firebasestorage.googleapis.com/v0/b/teamportfolio-d978f.appspot.com/o/banner%2Fexample6.jpg?alt=media&token=b4bed72d-2c2f-4fdd-a9f4-14a1cc17d2e3' }
            ],
            layout: null,
            tmplayout: null,
            choice: 'title',
            titleS: "1",
            subtitleS: "1",
            titleC: "rgb(255, 255, 255)",
            subtitleC: "rgb(255, 255, 255)",
            tRed: "255",
            tBlue: "255",
            tGreen: "255",
            sRed: "255",
            sBlue: "255",
            sGreen: "255"
        }
    },
    created() {
        this.getPortfolio();
    },
    watch: {
        titleS: function() {
            document.getElementById('portTitle').style.fontSize = this.titleS + 'rem';
        },
        subtitleS: function() {
            document.getElementById('portSubtitle').style.fontSize = this.subtitleS + 'rem';
        },
        choice: function() {
            console.log(this.choice);
        },
        tRed: function() {
            let rgb = 'rgb(' + this.tRed + ',' + this.tGreen + ',' + this.tBlue + ')';
            document.getElementById('titleColor').style.backgroundColor = rgb;
            document.getElementById('portTitle').style.color = rgb;
        },
        tGreen: function() {
            let rgb = 'rgb(' + this.tRed + ',' + this.tGreen + ',' + this.tBlue + ')';
            document.getElementById('titleColor').style.backgroundColor = rgb;
            document.getElementById('portTitle').style.color = rgb;
        },
        tBlue: function() {
            let rgb = 'rgb(' + this.tRed + ',' + this.tGreen + ',' + this.tBlue + ')';
            document.getElementById('titleColor').style.backgroundColor = rgb;
            document.getElementById('portTitle').style.color = rgb;
        },
        sRed: function() {
            let rgb = 'rgb(' + this.sRed + ',' + this.sGreen + ',' + this.sBlue + ')';
            document.getElementById('subtitleColor').style.backgroundColor = rgb;
            document.getElementById('portSubtitle').style.color = rgb;
        },
        sBlue: function() {
            let rgb = 'rgb(' + this.sRed + ',' + this.sGreen + ',' + this.sBlue + ')';
            document.getElementById('subtitleColor').style.backgroundColor = rgb;
            document.getElementById('portSubtitle').style.color = rgb;
        },
        sGreen: function() {
            let rgb = 'rgb(' + this.sRed + ',' + this.sGreen + ',' + this.sBlue + ')';
            document.getElementById('subtitleColor').style.backgroundColor = rgb;
            document.getElementById('portSubtitle').style.color = rgb;
        }
    },
    methods: {
        getPortfolio() {
            let __this = this;
            const tmp = firebase.auth().onAuthStateChanged(function(user) {
                __this.user = user.uid;
                FirebaseServices.getMyPort(user.uid).then(function(res) {
                    __this.portfolio = res;
                    console.log(__this.portfolio);
                    __this.select = __this.portfolio.banner;
                    __this.layout = __this.portfolio.layout;
                    __this.tmplayout = __this.layout;
                    __this.titleS = __this.portfolio.title.size;
                    __this.subtitleS = __this.portfolio.subtitle.size;
                    __this.tRed = __this.portfolio.title.color.red;
                    __this.tBlue = __this.portfolio.title.color.blue;
                    __this.tGreen = __this.portfolio.title.color.green;
                    __this.sRed = __this.portfolio.subtitle.color.red;
                    __this.sBlue = __this.portfolio.subtitle.color.blue;
                    __this.sGreen = __this.portfolio.subtitle.color.green;
                    document.getElementById('banner').style.backgroundImage = "url('" + __this.select.img + "')";
                    document.getElementById('portTitle').style.fontSize = __this.titleS + 'rem';
                    document.getElementById('portTitle').style.color = 'rgb(' + __this.tRed + ',' + __this.tGreen + ',' + __this.tBlue + ')';
                    document.getElementById('portSubtitle').style.fontSize = __this.subtitleS + 'rem';
                    document.getElementById('portSubtitle').style.color = 'rgb(' + __this.sRed + ',' + __this.sGreen + ',' + __this.sBlue + ')';
                })
            })
        },
        getBanner: function() {
            var storage = firebase.storage();
            var storageRef = storage.ref();
            storageRef.child('banner/' + this.select.img).getDownloadURL().then(function(url) {
                var xhr = new XMLHttpRequest();
                xhr.responseType = 'blob';
                xhr.onload = function(event) {
                    var blob = xhr.response;
                }
                xhr.open('GET', url)
                xhr.send();
                this.sample = url;
            }).catch(function(error) {
                console.log(error);
            })
        },
        userImage: function (file) {
            let loadFile = file.target.files || file.dataTransfer.files

            if (loadFile.length == 0) {
                return
            }
            this.addViewImage(loadFile)
        },
        addViewImage: function(files) {
            let _this = this;
        
            for (let i=0; i < files.length; i++) {
                let file = files[i]
                _this.fileName = file.name;
                let reader = new FileReader()
                if (file.type.match(/image.*/)) {
                reader.onload = function(e) {
                    for (let j=0; j < files.length; j++) {
                    }
                    console.log(e.target.result);
                    _this.select.img = e.target.result;
                }
                reader.readAsDataURL(file)
                _this.bannerImage.push(file.name)
                _this.imageList.push(file)
                } else {
                alert('이미지 파일만 올려주세요.')
                }
            }
        },
        async saveImg() {
            this.portfolio.banner = this.select;
            const result = await FirebaseServices.postPortfolios(this.user, this.portfolio.aboutMe, this.portfolio.layout, this.portfolio.banner, this.portfolio.portfolios, this.portfolio.skills, this.portfolio.subtitle, this.portfolio.title);
            document.getElementById('banner').style.backgroundImage = "url('" + this.select.img + "')";
        },
        async saveLayout() {
            this.layout = this.tmplayout;
            this.portfolio.layout = this.layout;
            const result = await FirebaseServices.postPortfolios(this.user, this.portfolio.aboutMe, this.portfolio.layout, this.portfolio.banner, this.portfolio.portfolios, this.portfolio.skills, this.portfolio.subtitle, this.portfolio.title);
        },
        async saveFont() {
            this.portfolio.title.size = this.titleS;
            this.portfolio.subtitle.size = this.subtitleS;
            this.portfolio.title.color.red = this.tRed;
            this.portfolio.title.color.blue = this.tBlue;
            this.portfolio.title.color.green = this.tGreen;
            this.portfolio.subtitle.color.red = this.sRed;
            this.portfolio.subtitle.color.blue = this.sBlue;
            this.portfolio.subtitle.color.green = this.sGreen;
            const result = await FirebaseServices.postPortfolios(this.user, this.portfolio.aboutMe, this.portfolio.layout, this.portfolio.banner, this.portfolio.portfolios, this.portfolio.skills, this.portfolio.subtitle, this.portfolio.title);
        }
    }
}

</script>
<style>
    .visual {
        overflow: hidden;
        position: relative;
        width: 100%;

        height: 100vh;

        margin: 0 auto;
        background-image: url(../../assets/example6.jpg);
        background-position: 50% 80%;
        background-repeat: no-repeat;
        background-size: cover;
    }
    .item-1,
    .item-2,
    .item-3 {
        position: absolute;
    display: block;
        top: 10em;

    width: 60%;

    font-size: 2em;

        animation-duration: 20s;
        animation-timing-function: ease-in-out;
        animation-iteration-count: infinite;
    }

    /*.item-1{
        animation-name: anim-1;
    }

    .item-2{
        animation-name: anim-2;
    }

    .item-3{
        animation-name: anim-3;
    }

    @keyframes anim-1 {
        0%, 8.3% { left: -100%; opacity: 0; }
    8.3%,25% { left: 25%; opacity: 1; }
    33.33%, 100% { left: 110%; opacity: 0; }
    }

    @keyframes anim-2 {
        0%, 33.33% { left: -100%; opacity: 0; }
    41.63%, 58.29% { left: 25%; opacity: 1; }
    66.66%, 100% { left: 110%; opacity: 0; }
    }

    @keyframes anim-3 {
        0%, 66.66% { left: -100%; opacity: 0; }
    74.96%, 91.62% { left: 25%; opacity: 1; }
    100% { left: 110%; opacity: 0; }
    }
    */
    .filebox input[type="file"] {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        border: 0;
    }
</style>