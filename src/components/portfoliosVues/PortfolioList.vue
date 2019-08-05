<template lang="html">
<div>
    <section role="region" id="foliolist" class="l-section">
        <h1>총 방문자 수 : {{visitNum}}</h1>
        <h1>북마크한 유저의 수 : {{toBookMarkNum}}</h1>

        <button v-if="user && uid && !mybookmark" class="bookMarkBtnIn" @click="doMybookmark(false)">북마크 하기</button>
        <button v-if="user && uid && mybookmark" class="bookMarkBtnOut" @click="doMybookmark(true)">북마크 취소</button>

        <div class="l-section-holder">
            <h1 class="section-heading is-init is-animated" data-animation="fade-up">
                <span class="secondary">Portfolio</span>
                <span class="primary">My works</span>
            </h1>
            <div id="portfolio" class="section-content gallery alternate">
                <v-flex v-for="portfolio in portfolios">
                    <PortfolioList :ports="portfolio" :cssmod="css" :change="cssChange"></PortfolioList>
                </v-flex>
                <v-flex v-for="ex in examples">
                    <PortfolioList :ports="ex" :cssmod="css" :change="cssChange"></PortfolioList>
                </v-flex>
            </div>
        </div>
    </section>
    
    <div id="select-css" v-if="iscontrol">
        <div>
            <button class="sidebar-open" @click="issidebar = true" v-if="!issidebar">사이드바 열기</button>
            <button class="sidebar-open" @click="issidebar = false" v-if="issidebar">사이드바 닫기</button>
        </div>
        <hr>
        <div v-if="issidebar">
            <div class="select-div">
                <button id="css1" @click="changeCss(0,1)">white</button>
                <div class="isok" v-if="css.color == 1"></div>
            </div>
            <div class="select-div">
                <button id="css2" @click="changeCss(0,2)">black</button>
                <div class="isok" v-if="css.color == 2"></div>
            </div>
            <div class="select-div">
                <button id="css3" @click="changeCss(0,3)">blue&nbsp</button>
                <div class="isok" v-if="css.color == 3"></div>
            </div>
            <hr>
            <div class="select-div">
                <button id="css3" @click="changeCss(1,true)">modal</button>
                <div class="isok" v-if="css.modal"></div>
            </div>
            <div class="select-div">
                <button id="css3" @click="changeCss(2,true)">grid&nbsp</button>
                <div class="isok" v-if="css.grid"></div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import FirebaseService from '@/services/FirebaseServices'
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
            examples:[
                {
                    title:'예술의 전당 랜딩 페이지',
                    img:require("@/assets/example1.png"),
                    viewport:'반응형',
                    ie_support:'IE9+',
                    demo_url:'./Portfolio-SAC/',
                    repos_url:'https://github.com/findawayer/Portfolio-SAC/tree/gh-pages',
                    content:'<p><a href="http://www.sac.or.kr/" target="_blank">예술의 전당 사이트</a>의 메인 페이지를 부트스트랩 4를 기반으로 한 반응형 구조로 리뉴얼해 보았습니다.</p> \
                                <p><a href="https://v4-alpha.getbootstrap.com/" target="_blank">부트스트랩의 4 alpha 버전</a>을 기반으로 제작되었고, 이 버전의 부트스트랩이 사용하는 Sass를 테마 제작에도 사용했으며, IE9+를 지원하는 jQuery 3.1 및 jQuery UI가 사용되었습니다.</p>\
                            ',
                    category_html:[
                        {
                            url:'https://github.com/findawayer/Portfolio-SAC/blob/gh-pages/index.html',
                            file:'index.html',
                            keyword:'HTML5, ARIA, SVG'
                        }
                    ],
                    category_css:[
                        {
                            url:'https://github.com/findawayer/Portfolio-SAC/blob/gh-pages/scss/bootstrap-theme.scss',
                            file:'bootstrap-custom.css',
                            keyword:'Responsive, Bootstrap 4'
                        },
                        {
                            url:'https://github.com/findawayer/Portfolio-SAC/blob/gh-pages/scss/style.scss',
                            file:'style.scss',
                            keyword:'CSS3, Sass, Compass'
                        },
                        {
                            url:'https://github.com/findawayer/Portfolio-SAC/tree/gh-pages/scss/partials',
                            file:'Sass partials',
                            keyword:'CSS3, Sass, Compass, Responsive'
                        }
                    ],
                    category_js:[
                        {
                            url:'https://github.com/findawayer/Portfolio-SAC/blob/gh-pages/js/main.js',
                            file:'main.js',
                            keyword:'JavaScript, jQuery 3, <a href="http://kenwheeler.github.io/slick/" target="_blank">slick</a>'
                        }
                    ],
                },
                {
                    title:'대한민국 기상청 랜딩 페이지',
                    img:require("@/assets/example2.png"),
                    viewport:'IE8+',
                    ie_support:'데스크탑',
                    content:'<p><a href="http://www.kma.go.kr/index.jsp" target="_blank">기상청</a> 사이트의 대문을 리뉴얼해 보았습니다. 인터페이스용 그림에는 SVG를 적극적으로 활용했고, 백업 png를 병용했습니다.</p> \
                                <p>공공기관 사이트로서 보다 많은 사용자 환경에 대응하기 위해 익스플로러 8까지의 호환성 지원, 웹 접근성 관리가 되어 있습니다.</p> \
                            ',
                    demo_url:'./Portfolio-KMA/',
                    repos_url:'https://github.com/findawayer/Portfolio-KMA/tree/gh-pages',
                    category_html:[
                        {
                            url:'https://github.com/findawayer/Portfolio-KMA/blob/gh-pages/index.html',
                            file:'index.html',
                            keyword:'HTML5, ARIA, SVG'
                        }
                    ],
                    category_css:[
                        {
                            url:'https://github.com/findawayer/Portfolio-KMA/blob/gh-pages/scss/style.scss',
                            file:'style.scss',
                            keyword:'CSS3, Sass, Compass'
                        },
                        {
                            url:'https://github.com/findawayer/Portfolio-KMA/tree/gh-pages/scss/partials',
                            file:'Sass partials',
                            keyword:'CSS3, Sass, Compass, CSS sprite'
                        },
                    ],
                    category_js:[
                        {
                            url:'https://github.com/findawayer/Portfolio-KMA/blob/gh-pages/js/common.js',
                            file:'common.js',
                            keyword:'JavaScript, jQuery 1, <a href="https://modernizr.com/" target="_blank">Modernizr</a>'
                        },
                        {
                            url:'https://github.com/findawayer/Portfolio-KMA/blob/gh-pages/js/main.js',
                            file:'main.js',
                            keyword:'JavaScript, jQuery 1, jQuery UI, AJAX'
                        },
                        {
                            url:'https://github.com/findawayer/Portfolio-KMA/blob/gh-pages/json/meteo.json',
                            file:'meteo.json',
                            keyword:'JSON'
                        }
                    ],
                },
                {
                    title:'오리지널 영화 사이트',
                    img:require("@/assets/example3.png"),
                    viewport:'모바일',
                    ie_support:'',
                    demo_url:'./Portfolio-KMA/',
                    repos_url:'https://github.com/findawayer/Portfolio-KMA/tree/gh-pages',
                    content:'<p>오리지널 영화 정보 및 예매사이트를 모바일 전용으로 구성해 보았습니다. <b>영화 목록 페이지</b>, <b>특정 영화 정보 페이지</b>, <b>티켓 예매 페이지</b> 3가지 샘플을 포함하고 있습니다.</p>\
                                <p>기기별 기본 UX를 최대한 유지하기 위해 검색상자나 선택상자 등은 네이티브 형식을 사용했으며, 유튜브의 트레일러 영상 불러오기, 날짜 선택기 등의 기능이 추가돼 있습니다.</p>\
                            ',
                    category_html:[
                        {
                            url:'https://github.com/findawayer/Portfolio-MovieSite/blob/gh-pages/index.html',
                            file:'index.html',
                            keyword:'HTML5'
                        },
                        {
                            url:'https://github.com/findawayer/Portfolio-MovieSite/blob/gh-pages/movie.html',
                            file:'movie.html',
                            keyword:'HTML5'
                        },
                        {
                            url:'https://github.com/findawayer/Portfolio-MovieSite/blob/gh-pages/order.html',
                            file:'order.html',
                            keyword:'HTML5'
                        }
                    ],
                    category_css:[
                        {
                            url:'https://github.com/findawayer/Portfolio-MovieSite/blob/gh-pages/less/style.less',
                            file:'style.scss',
                            keyword:'CSS3, LESS'
                        },
                        {
                            url:'https://github.com/findawayer/Portfolio-MovieSite/tree/gh-pages/less/partials',
                            file:'dhtmlxcalendar material dark.less',
                            keyword:'CSS3, LESS, Responsive'
                        },
                        {
                            url:'https://github.com/findawayer/Portfolio-MovieSite/blob/gh-pages/less/dhtmlxcalendar_material_dark.less',
                            file:'Sass partials',
                            keyword:'CSS3, LESS'
                        },
                    ],
                    category_js:[
                        {
                            url:'https://github.com/findawayer/Portfolio-MovieSite/blob/gh-pages/js/common.js',
                            file:'common.js',
                            keyword:'JavaScript, jQuery 1, <a href="http://hammerjs.github.io/" target="_blank">HammerJS</a>'
                        },
                        {
                            url:'https://github.com/findawayer/Portfolio-MovieSite/blob/gh-pages/js/movie.js',
                            file:'movie.js',
                            keyword:'JavaScript, jQuery 1, <a href="https://developers.google.com/youtube/iframe_api_reference" target="_blank">YouTube Iframe Player</a>, <a href="https://dhtmlx.com/docs/products/dhtmlxCalendar/" target="_blank">dhtmlXCalendar</a>, starRate(자작)'
                        },
                        {
                            url:'https://github.com/findawayer/Portfolio-MovieSite/blob/gh-pages/plugins/starRate/starRate.js',
                            file:'starRate.js',
                            keyword:'JavaScript, jQuery 1'
                        },
                        {
                            url:'https://github.com/findawayer/Portfolio-MovieSite/blob/gh-pages/js/order.js',
                            file:'order.js',
                            keyword:'JavaScript, jQuery 1'
                        }
                    ],
                },
                {
                    title:'다목적 탭스 플러그인',
                    img:require("@/assets/example3.png"),
                    viewport:'jQuery 플러그인',
                    ie_support:'IE8+',
                    demo_url:'./Portfolio-KMA/',
                    repos_url:'https://github.com/findawayer/Portfolio-KMA/tree/gh-pages',
                    content:'<p>웹 접근성 및 폭넓은 커스터마이징에 초점을 맞춘 jQuery용 탭스 플러그인입니다. 활성화 및 비활성화할 탭의 선택이나 사용자 셀렉터 설정 같은 기본적인 설정은 물론, 반응형 아코디언 레이아웃 및 자동재생 기능을 갖추고 있어 아코디언 또는 캐루셀로도 응용 가능합니다.</p>\
                                <p>마크업의 접근성은 물론 키보드 사용자를 위한 키보드 내비게이션 강화로 보다 넓은 사용자층을 타깃으로 하는 프로젝트에 사용할 수 있으며, 기본으로 제공되는 애니메이션 효과 이외에도 손쉬운 애니메이션 커스터마이징을 가능하게 해 크리에이티브한 디자인에도 적용할 수 있습니다.</p>\
                            ',
                    category_html:[],
                    category_css:[
                        {
                            url:'https://github.com/findawayer/Skeletabs/blob/master/src/scss/skeletabs.core.scss',
                            file:'skeletabs.core.scss',
                            keyword:'CSS, Sass'
                        },
                        {
                            url:'https://github.com/findawayer/Skeletabs/blob/master/src/scss/skeletabs.animation.scss',
                            file:'skeletabs.animation.scss',
                            keyword:'CSS, Sass, CSS3 animation'
                        },
                        {
                            url:'https://github.com/findawayer/Skeletabs/blob/master/src/scss/skeletabs.theme.default.scss',
                            file:'skeletabs.theme.default.scss',
                            keyword:'CSS, Sass'
                        },
                    ],
                    category_js:[
                        {
                            url:'https://github.com/findawayer/Skeletabs/blob/master/src/js/skeletabs.js',
                            file:'skeletabs.js',
                            keyword:'JavaScript, jQuery'
                        }
                    ],
                }
            ],

            portfolios:[],
            uid:'',
            user:'',
            mybookmark:false,
            iscontrol:false,
            issidebar:false,
            css:{
                color:1,
                modal:false,
                grid:false,
                version:'2.0.0',
            },
            visitNum:0,
            toBookMarkNum:0,
            cssChange:0,
        }
    },
    created(){
        let th = this
        if(this.$route.params.uid){
            let uid = this.$route.params.uid
            th.uid = uid
            th.getMyPortfolio(uid)
            FirebaseService.getUserData(uid)
            .then(function(data){
                if(data){
                    if(data.css.version) th.css = data.css
                    else{
                        th.css.color = data.css
                        if(data.css == 3){
                            th.css.modal = true
                        }
                        else if(data.css == 2){
                            th.css.grid = true
                        }
                    }

                    if(data.visitNum) th.visitNum = data.visitNum+1
                    else th.visitNum = 1

                    if(data.bookmarks){
                        th.toBookMarkNum = data.bookmarks.length
                        for(let i=0;i<data.bookmarks.length;i++){
                            let bookmark = data.bookmarks[i]
                            if(bookmark == th.user.uid) {
                                th.mybookmark = true
                                break
                            }
                        }
                    }
                    FirebaseService.updateUserData(uid,th.css,th.visitNum)
                }
                else{
                    FirebaseService.setUserData(uid,th.css,th.visitNum)
                }
                th.cssChange = th.cssChange+1
            })

            firebase.auth().onAuthStateChanged(function(user){
                if (user){
                    th.user = user
                }
            })   
        }
        else{
            firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                    th.user = user
                    th.iscontrol = true
                    th.getMyPortfolio(user.uid)
                    FirebaseService.getUserData(user.uid)
                    .then(function(data){
                        if(data){
                            if(data.css.version) th.css = data.css
                            else{
                                th.css.color = data.css
                                if(data.css == 3){
                                    th.css.modal = true
                                }
                                else if(data.css == 2){
                                    th.css.grid = true
                                }
                            }
                            th.visitNum = data.visitNum
                        }
                        else{
                            th.visitNum = 0
                        }
                        th.cssChange = th.cssChange+1
                    })
                    .catch(function(){
                    })
                }
            })
        }
    },
    methods:{
        async getMyPortfolio(uid){
            this.portfolios = await FirebaseService.getUidPortfolios(uid)
        },
        changeCss(num,write){
            if(num == 0) this.css.color = write
            else if(num == 1) this.css.modal = !this.css.modal
            else if(num == 2) this.css.grid = !this.css.grid

            let th = this
            firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                    FirebaseService.updateUserData(user.uid,th.css,th.visitNum)
                }
            })

            this.cssChange = this.cssChange+1
        },
        doMybookmark(del){
            this.mybookmark = !del
            this.toBookMarkNum += del ? -1:1
            FirebaseService.setBookMark(this.user.uid,this.uid,del)
        }
    },
}
</script>

<style lang="css" scoped>
/* section */
@media screen and (max-width: 1499px)
.l-section {
    padding: 100px 5vw;
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
}
.select-div{
    position: relative;
    height:50px;
}
.sidebar-open{
    margin:10px;
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
