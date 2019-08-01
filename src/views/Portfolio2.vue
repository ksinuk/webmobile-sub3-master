<template lang="html">


            <v-flex x12>

              <section class="visual topArea"><div class="visual_elem visual_fog02" style="display:none"></div>

                <div class="inner">
                  <p class="item-1">This is your last chance. After this, there is no turning back.</p>

  <p class="item-2">You take the blue pill - the story ends, you wake up in your bed and believe whatever you want to believe.</p>

  <p class="item-3">You take the red pill - you stay in Wonderland and I show you how deep the rabbit-hole goes.</p>

                  </div>
                </section>

                <article class="article_hello">
                  <div class="inner">

  <div class="title_line on"></div>

                    <h1 style="font-size: 9em; margin-top:0.3em; color:#8cddeb;">Hello.</h1>
                    <i class="title_sm on" data-ani="title_sm" style="top: -10px;">This is ny kim</i>
                    <div class="hello_text">
                      <p>안녕하세요, '<span>N</span>' 입니다.&nbsp;
                        <br class="br_m">사심 가득한 포트폴리오 사이트에 방문해 주셔서 감사합니다.
                        <br>저는 섬세하고 꼼꼼하게 웹을 디자인하며, 뛰어난 인터렉션을 지닌 웹페이지를 구현할 수 있습니다.
                        <br>UI. UX의 중요성을 인지하고 있으며, 보다 많은 사용자를 만족시키기 위해 오늘도 궁리 중입니다.</p>
                        <p class="ly_mt_sm">맡은 일은 전문성과 사랑을 담아 작업하고 있습니다.
                          <br>저와 함께 웹페이지를 만들고 싶으시다면 언제든 연락 주세요 ;)</p>
                        </div>

                     </div>
                   </article>

                   <div class="inner">
<div id="title_on"></div>
                     <h1 style="font-size: 9em; margin-top:0.5em; color:#8cddeb;">Work.</h1>

                     <i class="title_sm on" data-ani="title_sm" style="top: -10px;">Featured Work</i>
                     <div class="work_wrap">
                       <div class="work_list" data-columns="2">
                         <div class="column size-1of2">
                           <div class="work_item">
                             <figure class="snip1384">
                               <img src="../assets/example1.png" alt="코인원의 관리자 계정 페이지" class="work_image">
                                 <figcaption class="work_caption">
                                     <div class="caption_textWrap">
                                         <h3>Coinone Admin</h3>
                                           <p class="caption_desc">코인원의 관리자 계정 페이지</p>
                                           </div>  <a href=" work/work_coinone.html "></a>
                                           </figcaption>
                                         </figure>
                                       </div>
                                       <div class="work_item">
                                         <figure class="snip1384">
                                           <img src="../assets/example2.png" alt="랜딩 페이지 (풀반응형)" class="work_image">
                                             <figcaption class="work_caption external">
                                               <div class="caption_textWrap">
                                                   <h3>STAYGE One</h3>
                                                     <p class="caption_desc">랜딩 페이지 (풀반응형)</p>
                                                    </div>
                                                      <a href=" work/view_stayge/index.html" target="_blank"></a>
                                                </figcaption>
                                              </figure>
                                        </div>
                                        <div class="work_item">
                                                     <figure class="snip1384">
                                                       <img src="../assets/example3.png" alt="협약식 체결 화면" class="work_image">
                                                          <figcaption class="work_caption external">
                                                              <div class="caption_textWrap">
                                                                  <h3>Presentation Page</h3>
                                                                    <p class="caption_desc">협약식 체결 화면</p>  </div>
                                                                      <a href=" work/view_partners/index.html" target="_blank"></a>
                                                                      </figcaption>
                                                                     </figure>
                                                                   </div>


                                                                    </div>
                                <div class="column size-1of2">



  </div>
        </div>
  </div>
      </div>

            </v-flex>



</template>

<script>
export default {
  name: 'portfolio2'
}
</script>

<style lang="css" scoped>

/* Tablet &amp; Desktop Device */


/* Tablet Device */



figure.snip1384 {
  font-family: 'Raleway', Arial, sans-serif;
  position: relative;
  overflow: hidden;
  margin: 10px;
  min-width: 230px;
  max-width: 1000px;
  width: 100%;
  color: #ffffff;
  text-align: center;
  background-color: #fafafa;
  font-size: 16px;

}

@media ( min-width: 1000px ) {
  figure.snip1384{
    margin-left: 20%;
  }
}

@media (min-width: 500px) and ( max-width: 999px ) {
  figure.snip1384{
      margin-left: 5%;
  }
}
@media ( max-width: 499px ) {
  figure.snip1384{
      margin-left: 0%;
  }
}
figure.snip1384 * {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-transition: all 0.35s ease;
  transition: all 0.35s ease;
}
figure.snip1384 img {
  max-width: 100%;
  backface-visibility: hidden;
  vertical-align: top;
}
figure.snip1384:after,
figure.snip1384 figcaption {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
figure.snip1384:after {
  content: '';
  background-color: rgba(0, 0, 0, 0.65);
  -webkit-transition: all 0.35s ease;
  transition: all 0.35s ease;
  opacity: 0;
}
figure.snip1384 figcaption {
  z-index: 1;
  padding: 40px;
}
figure.snip1384 h3,
figure.snip1384 .links {
  width: 100%;
  margin: 5px 0;
  padding: 0;
}
figure.snip1384 h3 {
  line-height: 1.1em;
  font-weight: 700;
  font-size: 1.4em;
  margin-top: 5em;
  text-transform: uppercase;
  opacity: 0;
}
figure.snip1384 p {
  font-size: 0.8em;
  font-weight: 300;
  letter-spacing: 1px;
  opacity: 0;
  top: 50%;
  -webkit-transform: translateY(40px);
  transform: translateY(40px);
}
figure.snip1384 i {
  position: absolute;
  bottom: 10px;
  right: 10px;
  padding: 20px 25px;
  font-size: 34px;
  opacity: 0;
  -webkit-transform: translateX(-10px);
  transform: translateX(-10px);
}
figure.snip1384 a {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
}
figure.snip1384:hover img,
figure.snip1384.hover img {
  zoom: 1;
  filter: alpha(opacity=50);
  -webkit-opacity: 0.5;
  opacity: 0.5;
}
figure.snip1384:hover:after,
figure.snip1384.hover:after {
  opacity: 1;
  position: absolute;
  top: 10px;
  bottom: 10px;
  left: 10px;
  right: 10px;
}
figure.snip1384:hover h3,
figure.snip1384.hover h3,
figure.snip1384:hover p,
figure.snip1384.hover p,
figure.snip1384:hover i,
figure.snip1384.hover i {
  -webkit-transform: translate(0px, 0px);
  transform: translate(0px, 0px);
  opacity: 1;
}















.visual {
    overflow: hidden;
    position: relative;
    width: 100%;

    height: 50em;

    margin: 0 auto;
    background-image: url(../assets/example6.jpg);
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

.item-1{
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

.title.on:before {
    width: 100%;
    text-align: center;
    transition: width .55s;
}
.title:before {
    overflow: hidden;
    position: absolute;
    width: 0;
    color: #8cddeb;
    content: attr(data-ani);
    transition: width .55s;
}

html, body, div, span, h1, h2, h3, h4, h5, h6, p, em, img, small article, aside, footer, header, nav, address, section, main, time, ol, ul, li, hr, strong, figure {
    margin: 0;
    padding: 0;
    border: 0;
    vertical-align: baseline;
    -webkit-text-size-adjust: none;
    font-style: normal;
}
user agent stylesheet
div {
    display: block;
}
html, body {
    position: relative;
    overflow-x: hidden;
    width: 100%;
    min-width: 100%;
    font-size: 100%;
    font-family: 'Lato', 'LotteMartDream', AppleGothic, sans-serif, Helvetica;
    line-height: 1.3;
}

#hidden {
  height: 10em;
}

.article_hello .hello_text {
    font-family: 'NotoSans', AppleGothic, sans-serif, Helvetica;
    transition: margin .5s, font-size .5s;
    margin: 2.5em 0 1em;
    padding: 0 3.5em;
    font-family: 'LotteMartDream', sans-serif;
    text-align: center;
    font-weight: 300;
    color: #3f3f3f;
    letter-spacing: 0.025rem;
    line-height: 1.6em;
    word-break: keep-all;
}

element.style {
    top: -10px;
}

@media screen and (max-width: 1200px) and (min-width: 641px)
.article_hello .title_sm, .article_work .title_sm {
    font-size: 12px;
}
.title_sm.on {
    opacity: 1;
    transition: opacity .5s;
}

.title_sm {
    display: block;
    position: relative;
    z-index: 1;
    font-style: normal;
    font-size: 11px;
    letter-spacing: 1px;
    text-align: center;
    color: #aaa;
    font-weight: 300;
    text-transform: uppercase;
    transition: font-size .5s, opacity .5s;
}

.ly_mt_sm {
    display: block;
    margin-top: 1em;
}

.article_hello .hello_text {
    font-family: 'NotoSans', AppleGothic, sans-serif, Helvetica;
    transition: margin .5s;
    margin: 2.5em 0 1em;
    padding: 0 3.5em;
    font-family: 'LotteMartDream', sans-serif;
    text-align: center;
    font-weight: 300;
    color: #3f3f3f;
    letter-spacing: 0.025rem;
    line-height: 1.6em;
    word-break: keep-all;
}

.article_hello .more .more_link {
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    align-items: center;
    position: relative;
    font-family: 'NotoSans', AppleGothic, sans-serif, Helvetica;
    letter-spacing: 0.12rem;
    color: #656565;
}

.article_hello .more .more_link .more_link_text {
    position: relative;
    padding: 0 4px;
}

.title_line.on {
    background-color: #67ceeb;
}
.title_line {
    position: absolute;
    top: 50em;
    left: 50%;
    display: block;
    content: '';
    width: 1px;
    height: 5.5em;
    background-color: #e3e1e1;
    transition: background-color 2s;
}
#title_on.on {
    background-color: #67ceeb;
}

#title_on {
    position: absolute;
    top: 84em;
    left: 50%;
    display: block;
    content: '';
    width: 1px;
    height: 5.5em;
    background-color: #67ceeb !important;
    transition: background-color 2s;
}

html, body, div, span, h1, h2, h3, h4, h5, h6, p, em, img, small article, aside, footer, header, nav, address, section, main, time, ol, ul, li, hr, strong, figure {
    margin: 0;
    padding: 0;
    border: 0;
    vertical-align: baseline;
    -webkit-text-size-adjust: none;
    font-style: normal;
}

@media screen and (max-width: 1200px) and (min-width: 641px)
.article_hello .inner {
    margin-top: -10em;
    font-size: 24px;
}

@media screen and (max-width: 1200px) and (min-width: 641px)
.article_work .work_wrap .work_list {
    font-size: 18px;
}
.article_work .work_wrap .work_list {
    position: relative;
    width: 100%;
    max-width: 1920px;
    box-sizing: border-box;
    margin: 0 auto;
    padding: 1em 3.5em;
    padding-top: 5em;
    transition: margin-top .5s;
}
html, body, div, span, h1, h2, h3, h4, h5, h6, p, em, img, small article, aside, footer, header, nav, address, section, main, time, ol, ul, li, hr, strong, figure {
    margin: 0;
    padding: 0;
    border: 0;
    vertical-align: baseline;
    -webkit-text-size-adjust: none;
    font-style: normal;
}
user agent stylesheet
div {
    display: block;
}
@media screen and (max-width: 1200px) and (min-width: 641px)
.article_work .work_wrap .work_list .column {
    padding: 0em 0.3em;
}
.article_work .work_wrap .work_list .size-1of2 {
    width: 50%;
}
.article_work .work_wrap .work_list .column {
    float: left;
    padding: 1em .65em;
    box-sizing: border-box;
}

@media screen and (max-width: 1200px) and (min-width: 641px)
.article_work .work_wrap .work_list .column {
    padding: 0em 0.3em;
}
.article_work .work_wrap .work_list .size-1of2 {
    width: 50%;
}
.article_work .work_wrap .work_list .column {
    float: left;
    padding: 1em .65em;
    box-sizing: border-box;
}
</style>
