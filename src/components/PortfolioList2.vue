<template lang="html">
  <!-- 포트폴리오 엔트리: 예술의 전당 -->
  <article role="article" id="work1" class="gallery-item is-init is-animated" data-animation="fade-left">
      <figure role="group" class="gallery-figure">
          <div class="gallery-image">
            <img class="gallery-image-thumb" :src="ports.img" alt="예술의 전당 랜딩 페이지" aria-describedby="work1Description">

          </div>
          <figcaption class="gallery-caption">
              <h3 class="gallery-title">{{ports.title}}</h3>
              <ul class="gallery-spec">
                  <li class="gallery-spec-item"><strong class="gallery-spec-key">Viewport</strong> <span class="gallery-spec-value">&nbsp{{ports.viewport}}</span></li>
                  <li class="gallery-spec-item"><strong class="gallery-spec-key">IE support</strong> <span class="gallery-spec-value">&nbsp{{ports.ie_support}}</span></li>

              </ul>
              <div id="work1Description">
                  <p>{{ports.content}}</p>
              </div>
              <div class="ui-group">
                  <a role="button" class="ui-button" v-bind:href="ports.demo_url" target="_blank">Demo</a>
                  <a role="button" class="ui-button" v-bind:href="ports.repos_url" target="_blank">Repos</a>
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
            <template v-for="html in ports.category_html">
              <tr>
                  <td data-th="Category"><span class="categ html">HTML</span></td>
                  <td data-th="Source"><a :href="html.url" target="_blank">{{html.file}}</a></td>
                  <td data-th="Related Keywords">{{html.keyword}}</td>
              </tr>

            </template>
            <template v-for="css in ports.category_css">
              <tr>
                <td data-th="Category"><span class="categ css">CSS</span></td>
                <td data-th="Source"><a :href="css.url" target="_blank">{{css.file}}</a></td>
                <td data-th="Related Keywords">{{css.keyword}}</td>
              </tr>

            </template>
            <template v-for="js in ports.category_js">
              <tr>
                <td data-th="Category"><span class="categ js">JS</span></td>
                <td data-th="Source"><a :href="js.url" target="_blank">{{js.file}}</a></td>
                <td data-th="Related Keywords">{{js.keyword}}</td>
              </tr>

            </template>

          </tbody>
      </table>
  </article>

</template>

<script>
import FirebaseService from '@/services/FirebaseServices'
export default {
  name :'PortfolioList',

  /*data() {
    return {
      ports : this.portfolio
    }
  },*/
  props:{

    ports: {type: null},

  }
}
</script>

<style lang="css" scoped>
/* section */
#work1{
    background-color: rgb(40,40,40);
    color:white;
}

@media screen and (max-width: 1499px)
.l-section {
    padding: 100px 5vw;
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

h1, h2, h3, h4, h5, h6 {
    margin: 0;
    line-height: 1.2;
    font-family: "Quicksand",sans-serif;
    font-weight: normal;
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

.gallery-title {
    position: relative;
    margin-bottom: 1.5em;
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
    color: #89ddff;
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
    border: 1px solid white;
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
    background-color: rgba(128, 136, 139, 0.5);
    border-top-width: 1px;
    color: white;
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
