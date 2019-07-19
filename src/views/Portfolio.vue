<template lang="html">
  <div class="portfolio">
    <ImageBanner/>
    <div id="select-css">
        <button id="css1" @click="css=1">1</button><br>
        <button id="css2" @click="css=2">2</button><br>
        <button id="css3" @click="css=3">3</button><br>
    </div>


    <section role="region" id="works" class="l-section">
        <Introduce :intro="intros[0]"></Introduce>
        <div class="l-section-holder">
            <h2 class="section-heading is-init is-animated" data-animation="fade-up">
                <span class="secondary">Portfolio</span>
                <span class="primary">My works</span>
            </h2>
            <div id="portfolio" class="section-content gallery alternate">
                <v-flex v-for="i in portfolios.length">

                    <PortfolioList :ports="portfolios[i-1]" :index="i"></PortfolioList>
                </v-flex>
                <!-- 포트폴리오 엔트리: 예술의 전당 -->
                <article role="article" id="work1" class="gallery-item is-init is-animated" data-animation="fade-left">
                    <figure role="group" class="gallery-figure">
                        <div class="gallery-image">
                        <img class="gallery-image-thumb" src="@/assets/example1.png" alt="예술의 전당 랜딩 페이지" aria-describedby="work1Description">

                        </div>
                        <figcaption class="gallery-caption">
                            <h3 class="gallery-title">예술의 전당 랜딩 페이지</h3>
                            <ul class="gallery-spec">
                                <li class="gallery-spec-item"><strong class="gallery-spec-key">Viewport</strong> <span class="gallery-spec-value">반응형</span></li>
                                <li class="gallery-spec-item"><strong class="gallery-spec-key">IE support</strong> <span class="gallery-spec-value">IE9+</span></li>

                            </ul>
                            <div id="work1Description">
                                <p><a href="http://www.sac.or.kr/" target="_blank">예술의 전당 사이트</a>의 메인 페이지를 부트스트랩 4를 기반으로 한 반응형 구조로 리뉴얼해 보았습니다.</p>
                                <p><a href="https://v4-alpha.getbootstrap.com/" target="_blank">부트스트랩의 4 alpha 버전</a>을 기반으로 제작되었고, 이 버전의 부트스트랩이 사용하는 Sass를 테마 제작에도 사용했으며, IE9+를 지원하는 jQuery 3.1 및 jQuery UI가 사용되었습니다.</p>
                            </div>
                            <div class="ui-group">
                                <a role="button" class="ui-button" href="./Portfolio-SAC/" target="_blank">Demo</a>
                                <a role="button" class="ui-button" href="https://github.com/findawayer/Portfolio-SAC/tree/gh-pages" target="_blank">Repos</a>
                            </div>
                        </figcaption>
                    </figure>
                    <table class="gallery-table">
                        <thead>
                            <tr>
                                <th class="gallery-table-col category">Category</th>
                                <th class="gallery-table-col source">Source</th>
                                <th class="gallery-table-col keywords">Related keywords</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td data-th="Category"><span class="categ html">HTML</span></td>
                                <td data-th="Source"><a href="https://github.com/findawayer/Portfolio-SAC/blob/gh-pages/index.html" target="_blank">index.html</a></td>
                                <td data-th="Related Keywords">HTML5, ARIA, SVG</td>
                            </tr>
                            <tr>
                                <td data-th="Category"><span class="categ css">CSS</span></td>
                                <td data-th="Source"><a href="https://github.com/findawayer/Portfolio-SAC/blob/gh-pages/scss/bootstrap-theme.scss" target="_blank">bootstrap-custom.css</a></td>
                                <td data-th="Related Keywords">Responsive, Bootstrap 4</td>
                            </tr>
                            <tr>
                                <td data-th="Category"><span class="categ css">CSS</span></td>
                                <td data-th="Source"><a href="https://github.com/findawayer/Portfolio-SAC/blob/gh-pages/scss/style.scss" target="_blank">style.scss</a></td>
                                <td data-th="Related Keywords">CSS3, Sass, Compass</td>
                            </tr>
                            <tr>
                                <td data-th="Category"><span class="categ css">CSS</span></td>
                                <td data-th="Source"><a href="https://github.com/findawayer/Portfolio-SAC/tree/gh-pages/scss/partials" target="_blank">Sass partials</a></td>
                                <td data-th="Related Keywords">CSS3, Sass, Compass, Responsive</td>
                            </tr>
                            <tr>
                                <td data-th="Category"><span class="categ js">JS</span></td>
                                <td data-th="Source"><a href="https://github.com/findawayer/Portfolio-SAC/blob/gh-pages/js/main.js" target="_blank">main.js</a></td>
                                <td data-th="Related Keywords">JavaScript, jQuery 3, <a href="http://kenwheeler.github.io/slick/" target="_blank">slick</a></td>
                            </tr>
                        </tbody>
                    </table>
                </article>

                <!-- 포트폴리오 엔트리: 기상청 -->
                <article role="article" id="work2" class="gallery-item is-init is-animated" data-animation="fade-right">
                    <figure role="group" class="gallery-figure">
                        <div class="gallery-image">
                            <img class="gallery-image-thumb" src="@/assets/example2.png" alt="오리지널 영화 사이트" aria-describedby="work3Description">

                        </div>
                        <figcaption class="gallery-caption">
                            <h3 class="gallery-title">대한민국 기상청 랜딩 페이지</h3>
                            <ul class="gallery-spec">
                                <li class="gallery-spec-item"><strong class="gallery-spec-key">Viewport</strong> <span class="gallery-spec-value">데스크탑</span></li>
                                <li class="gallery-spec-item"><strong class="gallery-spec-key">IE support</strong> <span class="gallery-spec-value">IE8+</span></li>

                            </ul>
                            <div id="work2Description">
                                <p><a href="http://www.kma.go.kr/index.jsp" target="_blank">기상청</a> 사이트의 대문을 리뉴얼해 보았습니다. 인터페이스용 그림에는 SVG를 적극적으로 활용했고, 백업 png를 병용했습니다.</p>
                                <p>공공기관 사이트로서 보다 많은 사용자 환경에 대응하기 위해 익스플로러 8까지의 호환성 지원, 웹 접근성 관리가 되어 있습니다.</p>
                            </div>
                            <div class="ui-group">
                                <a role="button" class="ui-button" href="./Portfolio-KMA/" target="_blank">Demo</a>
                                <a role="button" class="ui-button" href="https://github.com/findawayer/Portfolio-KMA/tree/gh-pages" target="_blank">Repos</a>
                            </div>
                        </figcaption>
                    </figure>
                    <table class="gallery-table">
                        <thead>
                            <tr>
                                <th class="gallery-table-col category">Category</th>
                                <th class="gallery-table-col source">Source</th>
                                <th class="gallery-table-col keywords">Related keywords</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td data-th="Category"><span class="categ html">HTML</span></td>
                                <td data-th="Source"><a href="https://github.com/findawayer/Portfolio-KMA/blob/gh-pages/index.html" target="_blank">index.html</a></td>
                                <td data-th="Related Keywords">HTML5, ARIA, SVG</td>
                            </tr>
                            <tr>
                                <td data-th="Category"><span class="categ css">CSS</span></td>
                                <td data-th="Source"><a href="https://github.com/findawayer/Portfolio-KMA/blob/gh-pages/scss/style.scss" target="_blank">style.scss</a></td>
                                <td data-th="Related Keywords">CSS3, Sass, Compass</td>
                            </tr>
                            <tr>
                                <td data-th="Category"><span class="categ css">CSS</span></td>
                                <td data-th="Source"><a href="https://github.com/findawayer/Portfolio-KMA/tree/gh-pages/scss/partials" target="_blank">Sass partials</a></td>
                                <td data-th="Related Keywords">CSS3, Sass, Compass, CSS sprite</td>
                            </tr>
                            <tr>
                                <td data-th="Category"><span class="categ js">JS</span></td>
                                <td data-th="Source"><a href="https://github.com/findawayer/Portfolio-KMA/blob/gh-pages/js/common.js" target="_blank">common.js</a></td>
                                <td data-th="Related Keywords">JavaScript, jQuery 1, <a href="https://modernizr.com/" target="_blank">Modernizr</a></td>
                            </tr>
                            <tr>
                                <td data-th="Category"><span class="categ js">JS</span></td>
                                <td data-th="Source"><a href="https://github.com/findawayer/Portfolio-KMA/blob/gh-pages/js/main.js" target="_blank">main.js</a></td>
                                <td data-th="Related Keywords">JavaScript, jQuery 1, jQuery UI, AJAX</td>
                            </tr>
                            <tr>
                                <td data-th="Category"><span class="categ js">JSON</span></td>
                                <td data-th="Source"><a href="https://github.com/findawayer/Portfolio-KMA/blob/gh-pages/json/meteo.json" target="_blank">meteo.json</a></td>
                                <td data-th="Related Keywords">JSON</td>
                            </tr>
                        </tbody>
                    </table>
                </article>

                <!-- 포트폴리오 엔트리: 영화 사이트 -->
                <article role="article" id="work3" class="gallery-item is-init is-animated" data-animation="fade-left">
                    <figure role="group" class="gallery-figure">
                        <div class="gallery-image">
                            <img class="gallery-image-thumb" src="@/assets/example3.png" alt="오리지널 영화 사이트" aria-describedby="work3Description">

                        </div>
                        <figcaption class="gallery-caption">
                            <h3 class="gallery-title">오리지널 영화 사이트</h3>
                            <ul class="gallery-spec">
                                <li class="gallery-spec-item"><strong class="gallery-spec-key">Viewport</strong> <span class="gallery-spec-value">모바일</span></li>

                            </ul>
                            <div id="work3Description">
                                <p>오리지널 영화 정보 및 예매사이트를 모바일 전용으로 구성해 보았습니다. <b>영화 목록 페이지</b>, <b>특정 영화 정보 페이지</b>, <b>티켓 예매 페이지</b> 3가지 샘플을 포함하고 있습니다.</p>
                                <p>기기별 기본 UX를 최대한 유지하기 위해 검색상자나 선택상자 등은 네이티브 형식을 사용했으며, 유튜브의 트레일러 영상 불러오기, 날짜 선택기 등의 기능이 추가돼 있습니다.</p>
                            </div>
                            <div class="ui-group">
                                <a role="button" class="ui-button" href="./Portfolio-KMA/" target="_blank">Demo</a>
                                <a role="button" class="ui-button" href="https://github.com/findawayer/Portfolio-KMA/tree/gh-pages" target="_blank">Repos</a>
                            </div>
                        </figcaption>
                    </figure>
                    <table class="gallery-table">
                        <thead>
                            <tr>
                                <th class="gallery-table-col category">Category</th>
                                <th class="gallery-table-col source">Source</th>
                                <th class="gallery-table-col keywords">Related keywords</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td data-th="Category"><span class="categ html">HTML</span></td>
                                <td data-th="Source"><a href="https://github.com/findawayer/Portfolio-MovieSite/blob/gh-pages/index.html" target="_blank">index.html</a></td>
                                <td data-th="Related Keywords">HTML5</td>
                            </tr>
                            <tr>
                                <td data-th="Category"><span class="categ html">HTML</span></td>
                                <td data-th="Source"><a href="https://github.com/findawayer/Portfolio-MovieSite/blob/gh-pages/movie.html" target="_blank">movie.html</a></td>
                                <td data-th="Related Keywords">HTML5</td>
                            </tr>
                            <tr>
                                <td data-th="Category"><span class="categ html">HTML</span></td>
                                <td data-th="Source"><a href="https://github.com/findawayer/Portfolio-MovieSite/blob/gh-pages/order.html" target="_blank">order.html</a></td>
                                <td data-th="Related Keywords">HTML5</td>
                            </tr>
                            <tr>
                                <td data-th="Category"><span class="categ css">CSS</span></td>
                                <td data-th="Source"><a href="https://github.com/findawayer/Portfolio-MovieSite/blob/gh-pages/less/style.less" target="_blank">style.less</a></td>
                                <td data-th="Related Keywords">CSS3, LESS</td>
                            </tr>
                            <tr>
                                <td data-th="Category"><span class="categ css">CSS</span></td>
                                <td data-th="Source"><a href="https://github.com/findawayer/Portfolio-MovieSite/tree/gh-pages/less/partials" target="_blank">LESS partials</a></td>
                                <td data-th="Related Keywords">CSS3, LESS, Responsive</td>
                            </tr>
                            <tr>
                                <td data-th="Category"><span class="categ css">CSS</span></td>
                                <td data-th="Source"><a href="https://github.com/findawayer/Portfolio-MovieSite/blob/gh-pages/less/dhtmlxcalendar_material_dark.less" target="_blank">dhtmlxcalendar material dark.less</a></td>
                                <td data-th="Related Keywords">CSS3, LESS</td>
                            </tr>
                            <tr>
                                <td data-th="Category"><span class="categ js">JS</span></td>
                                <td data-th="Source"><a href="https://github.com/findawayer/Portfolio-MovieSite/blob/gh-pages/js/common.js" target="_blank">common.js</a></td>
                                <td data-th="Related Keywords">JavaScript, jQuery 1, <a href="http://hammerjs.github.io/" target="_blank">HammerJS</a></td>
                            </tr>
                            <tr>
                                <td data-th="Category"><span class="categ js">JS</span></td>
                                <td data-th="Source"><a href="https://github.com/findawayer/Portfolio-MovieSite/blob/gh-pages/js/movie.js" target="_blank">movie.js</a></td>
                                <td data-th="Related Keywords">JavaScript, jQuery 1, <a href="https://developers.google.com/youtube/iframe_api_reference" target="_blank">YouTube Iframe Player</a>, <a href="https://dhtmlx.com/docs/products/dhtmlxCalendar/" target="_blank">dhtmlXCalendar</a>, starRate(자작)</td>
                            </tr>
                            <tr>
                                <td data-th="Category"><span class="categ js">JS</span></td>
                                <td data-th="Source"><a href="https://github.com/findawayer/Portfolio-MovieSite/blob/gh-pages/plugins/starRate/starRate.js" target="_blank">starRate.js</a></td>
                                <td data-th="Related Keywords">JavaScript, jQuery 1</td>
                            </tr>
                            <tr>
                                <td data-th="Category"><span class="categ js">JS</span></td>
                                <td data-th="Source"><a href="https://github.com/findawayer/Portfolio-MovieSite/blob/gh-pages/js/order.js" target="_blank">order.js</a></td>
                                <td data-th="Related Keywords">JavaScript, jQuery 1</td>
                            </tr>
                        </tbody>
                    </table>
                </article>


            </div>
        </div>
    </section>
  </div>
</template>

<script>
import movie from '@/components/Movie.vue'
import ImageBanner from '@/components/ImageBanner.vue'
import FirebaseService from '@/services/FirebaseServices'
import PortfolioList from '@/components/PortfolioList.vue'
import Introduce from '@/components/Introduce.vue'

export default {

    name: 'portfolio',
    components: {
        ImageBanner,
        PortfolioList,
        Introduce
    },
    data(){
        return {
            portfolios:[],
            intros:[],
            introp:[],
            css:1,

        }
    },

    mounted(){
        this.getMyPortfolio()
        this.getMyIntro()
    },
    methods :{
        async getMyPortfolio(){
      //  var user = FirebaseService.auth().currentUser;
        //유저정보에 따라 구현
        this.portfolios = await FirebaseService.getPortfolios()



      },

        async getMyIntro(){
        //  var user = FirebaseService.auth().currentUser;
          this.intros = await FirebaseService.getIntroduce();

        }
    },
    watch: {
        css:function(){
            console.log("css: ",this.css)
        }

    }
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
    top:10%;
    left:10px;
    padding:10px;
    border:3px solid black;
}
#select-css button{
    padding:5px 10px;
    margin:5px;
    font-size:15px;
    border:1px solid gray;
}
#select-css #css1{
    color:black;
    background-color: white;
}
#select-css #css2{
    color:greenyellow;
    background-color: black;
}
#select-css #css3{
    color:white;
    background-color:royalblue;
}

.l-section {
    background: white;
}

.l-section {
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

h2 {
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
    background-color: white !important;
    border-color: #424242 !important;
}

.primary {
    background-color: white !important;
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

/* categ */
.categ.html {
    background: #8dca35;
    color: white;
}

.categ.css {
    background: #00bfdd;
    color: white;
}

.categ {
    border-radius: .25em;
    display: inline-block;
    min-width: 2em;
    padding: .35em .65em;
    line-height: 1;
    font-family: "Quicksand",sans-serif;
    font-size: .92rem;
    text-align: center;
}

.categ.js {
    background: #ff702a;
    color: white;
}

/*ui button */

ul {
    display: block;
    list-style-type: disc;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 40px;
}

.ui-button {
    background: #30b7e8;
    border-radius: 44px;
    color: white;
    display: inline-block;
    min-width: 7em;
    height: 44px;
    margin: 0;
    overflow: hidden;
    padding: 12px 16px 14px;
    vertical-align: middle;
    letter-spacing: -.03em;
    line-height: 18px;
    font-family: "Quicksand",sans-serif;
    font-size: 1rem;
    font-weight: 500;
    text-align: center;
    box-sizing: border-box;
    -moz-user-select: -moz-none;
    -ms-user-select: none;
    -webkit-user-select: none;
    user-select: none;
    position: relative;
}
.ui-group {
    margin: 1rem 0;
    padding: 0;
    text-align: center;
}

p, dl, ol, ul {
    word-break: keep-all;
}

.ui-dropdown {
    background: #30b7e8;
    border-radius: 0 0 22px 22px;
    margin: 0;
    overflow: hidden;
    padding: 0;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    visibility: hidden;
    z-index: 10000;
    opacity: 0;
    transition: visibility 0s linear .2s, opacity .2s;
}

.ui-button::after {
    background-color: rgba(0,0,0,0.08);
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0;
    content: "";
    transition: height .3s;
}

.ui-dropdown.is-expanded {
    display: block;
    visibility: visible;
    opacity: 1;
    transition: visibility 0s linear 0s, opacity .2s;
}


.ui-dropdown-trigger.is-triggered {
    border-radius: 22px 22px 0 0;
}



table {
    border: 0;
    border-collapse: collapse;
    border-spacing: 0;
    margin: 1em 0;
    width: 100%;
}

table th, table td {
    border-bottom: 1px solid #e6e9ea;
    padding: .3em 1em;
    text-align: left;
}

td {
    display: table-cell;
    vertical-align: inherit;
}

table thead th {
    background-color: rgba(77,128,153,0.05);
    border-top-width: 1px;
    color: #94979c;
    padding: 1.2em 1em;
}

table caption, table th {
    font-weight: 500;
    text-align: left;
}

th {
    display: table-cell;
    vertical-align: inherit;
    font-weight: bold;
    text-align: -internal-center;
}

table thead {
    font-family: "Quicksand",sans-serif;
}


</style>
