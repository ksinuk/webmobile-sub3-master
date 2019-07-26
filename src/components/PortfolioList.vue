<template lang="html">
  <!-- 포트폴리오 엔트리: 예술의 전당 -->
  <article role="article" id="work1" class="gallery-item is-init is-animated" data-animation="fade-left">
      <figure role="group" class="gallery-figure">
          <div class="gallery-image">
            <img class="gallery-image-thumb" :src="ports.img" alt="예술의 전당 랜딩 페이지" aria-describedby="work1Description">

          </div>
          <figcaption class="gallery-caption">

              <h3 class="gallery-title"><span style="color: #30b7e8;
      display: inline-block;
      width: 50px;
      position: relative;
      left: -0.05em;
      vertical-align: -0.1em;
      line-height: 1;
      font-size: 50px;
      font-weight: 400;">{{index}}</span>{{ports.title}}</h3>
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

<style lang="scss" scoped>
.css1{
    @import "./PortfolioListCss1.scss";
}
.css2{
    @import "./PortfolioListCss2.scss";
}
.css3{
    @import "./PortfolioListCss3.scss";
}
</style>
<script>
export default {
    name :'PortfolioList',
    data() {
        return {
        //  ports : this.portfolio  
            out:false,
            ismodal:false,
            cssClass:'',
            cssStyle:'',
            cssAddr:'',
            cssArr:[false,false,false]
        }
    },
    props:{
        ports: {type: null},
        cssmod:{type: null},
    },
    components:{
    },
    created(){
        this.cssAddr = "./PortfolioListCss"+this.cssmod+".css"
        this.cssStyle = '<style lang="css" scoped :src="'+this.cssAddr+'"></style>'
        if(this.cssmod==3){
            this.ismodal = true
        }
    },
    beforeCreate(){


    },
    mounted(){
       

    },
    methods:{
        open:function(point){
            if(this.ismodal){
                console.log(point,": ",this.out)
                this.out = !this.out
            }
        },
    },
    watch:{
        cssmod:function(){
            this.out = false
            if(this.cssmod==3){
                this.ismodal = true
            }
            else{
                this.ismodal = false
            }

            for(let i=0;i<3;i++){
                this.cssArr[i] = false
            }

            this.cssArr[this.cssmod-1] = true
            console.log("cssArr: ",this.cssArr)
            console.log("cssmod: ",this.cssmod)
        },
    },
}
</script>
