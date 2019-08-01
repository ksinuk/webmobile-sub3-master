<template lang="html">
<div :class="{cssBase:true, cssWhite:cssArr[0], cssBlack:cssArr[1], cssBlue:cssArr[2], cssModal:ismodal, cssGrid:isgrid}">
    <article role="article" id="work1" class="is-init is-animated" data-animation="fade-left" v-if="isok">
        <div class="gallery-image" @click="open('open')">
            <img class="gallery-image-thumb" :src=ports.img :alt="ports.img" aria-describedby="work1Description">
        </div><br>

        <div id="modal" v-if="out || !ismodal">
            <div id="modal-out" class="gallery-item">
                <figcaption class="gallery-caption">
                    <h3 class="gallery-title">{{ports.title}}</h3>
                    <ul class="gallery-spec">
                        <li class="gallery-spec-item">
                            <strong class="gallery-spec-key">Viewport</strong> <span class="gallery-spec-value">&nbsp{{ports.viewport}}</span>
                        </li>
                        <li class="gallery-spec-item">
                            <strong class="gallery-spec-key">IE support</strong> <span class="gallery-spec-value">&nbsp{{ports.ie_support}}</span>
                        </li>
                    </ul>
                    <div id="work1Description" class="vhtml" v-html="ports.content">    
                    </div>
                    <div class="ui-group">
                        <a role="button" class="ui-button" v-bind:href="ports.demo_url" target="_blank">Demo</a>
                        <a role="button" class="ui-button" v-bind:href="ports.repos_url" target="_blank">Repos</a>
                    </div>
                </figcaption>

                <div style="margin:1em;">
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
                                <td data-th="Related Keywords" class="vhtml" v-html="html.keyword"></td>
                            </tr>
                        </template>
                        <template v-for="css in ports.category_css">
                            <tr>
                                <td data-th="Category"><span class="categ css">CSS</span></td>
                                <td data-th="Source"><a :href="css.url" target="_blank">{{css.file}}</a></td>
                                <td data-th="Related Keywords" class="vhtml" v-html="css.keyword"></td>
                            </tr>
                        </template>
                        <template v-for="js in ports.category_js">
                            <tr>
                                <td data-th="Category"><span class="categ js">JS</span></td>
                                <td data-th="Source"><a :href="js.url" target="_blank">{{js.file}}</a></td>
                                <td data-th="Related Keywords" class="vhtml" v-html="js.keyword"></td>
                            </tr>
                        </template>
                    </tbody>
                </table>
                </div>

                <div class="btn-end" v-if="ismodal" @click="open('end')">end</div>
            </div>
        </div>
        <hr>
    </article>
</div>
</template>

<style lang="scss" scoped>
.cssBase{
    @import "./PortfolioElemBase.scss";
}
.cssGrid{
    .gallery-item{
        display: grid;
        grid-template-columns: 50% 50%;
    }

    .gallery-caption{
        padding:10px;
    }
}
.cssModal{
    @import "./PortfolioElemModal.scss";
}
.cssWhite{
    @import "./PortfolioElemWhite.scss";
}
.cssBlack{
    @import "./PortfolioElemBlack.scss";
}
.cssBlue{
    @import "./PortfolioElemBlue.scss";
}
</style>

<script>
import FirebaseService from '@/services/FirebaseServices'

export default {
    name :'PortfolioList',
    data() {
        return {
        //  ports : this.portfolio  
            isok:false,
            out:false,
            ismodal:false,
            isgrid:false,
            cssClass:'',
            cssStyle:'',
            cssAddr:'',
            cssArr:[false,false,false]
        }
    },
    props:{
        ports: {type: null},
        cssmod:{type: null},
        change:{type: null},
    },
    components:{
    },
    created(){
        this.changeCss()
    },
    mounted(){
        this.linkcss()
    },
    methods:{
        open:function(point){
            if(this.ismodal){
                console.log(point,": ",this.out)
                this.out = !this.out
            }
        },
        linkcss:function(){
            let vhtmls = document.querySelectorAll('.vhtml')
            for(let idx=0;idx<vhtmls.length;idx++){
                let vhtml = vhtmls[idx]
                let alist = vhtml.querySelectorAll('a')
                for(let i=0;i<alist.length;i++){
                    let aa =alist[i]
                    if(this.cssmod == 1 || this.cssmod == 2){
                        aa.style.color = '#30b7e8'
                    }
                    else if(this.cssmod == 3){
                        aa.style.color = 'rgb(155, 34, 34)'
                    }
                }   
            }
        },
        changeCss:function(){
            this.out = false
            this.isok = false
            for(let i=0;i<3;i++){
                this.cssArr[i] = false
            }
            if(1<=this.cssmod.color && this.cssmod.color<=3){
                this.cssArr[this.cssmod.color-1] = true
                this.ismodal = this.cssmod.modal ? true:false
                this.isgrid  = this.cssmod.grid  ? true:false
                this.isok = true
            }
        }
    },
    watch:{
        change:function(){
            this.changeCss()
            this.linkcss()
        },
    },
}
</script>
