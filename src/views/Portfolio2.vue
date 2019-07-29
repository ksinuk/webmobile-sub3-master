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

                    <h2 style="font-size: 9em; margin-top:0.3em; color:#8cddeb;">Hello.</h2>
                    <i class="title_sm on" data-ani="title_sm" style="top: -10px;">This is ny kim</i>
                    <div class="hello_text">
                      <p>안녕하세요, '<span>N</span>' 입니다.&nbsp;
                        <br class="br_m">사심 가득한 포트폴리오 사이트에 방문해 주셔서 감사합니다.
                        <br>저는 섬세하고 꼼꼼하게 웹을 디자인하며, 뛰어난 인터렉션을 지닌 웹페이지를 구현할 수 있습니다.
                        <br>UI. UX의 중요성을 인지하고 있으며, 보다 많은 사용자를 만족시키기 위해 오늘도 궁리 중입니다.</p>
                        <p class="ly_mt_sm">맡은 일은 전문성과 사랑을 담아 작업하고 있습니다.
                          <br>저와 함께 웹페이지를 만들고 싶으시다면 언제든 연락 주세요 ;)</p>
                        </div>
                        <div class="more">
                          <a href="about.html" class="more_link">
                          <span class="more_link_text">감성 UI를 만드는 'N'에 대해 더 궁금하신가요?</span>
                           <span class="icon_circle"></span>
                         </a>
                       </div>
                     </div>
                   </article>

            </v-flex>



</template>

<script>
export default {
  name: 'portfolio2'
}
</script>

<style lang="css" scoped>



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
</style>
