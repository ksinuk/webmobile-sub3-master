<template lang="html">
    <!-- 포트폴리오 엔트리: 예술의 전당 -->
    <article role="article" id="work1" class="is-init is-animated" data-animation="fade-left">
        <div class="gallery-image" @click="open('open')">
            <img class="gallery-image-thumb" :src=ports.img :alt="ports.img" aria-describedby="work1Description">
        </div><br>

        <div id="modal" v-if="out || !ismodal">
            <div id="modal-out" class="gallery-item">
                <figcaption class="gallery-caption">
                    <h3 class="gallery-title">{{ports.title}}</h3>
                    <ul class="gallery-spec">
                        <li class="gallery-spec-item"><strong class="gallery-spec-key">Viewport</strong> <span class="gallery-spec-value">&nbsp{{ports.viewport}}</span></li>
                        <li class="gallery-spec-item"><strong class="gallery-spec-key">IE support</strong> <span class="gallery-spec-value">&nbsp{{ports.ie_support}}</span></li>
                    </ul>
                    <div id="work1Description" v-html="ports.content">    
                    </div>
                    <div class="ui-group">
                        <a role="button" class="ui-button" v-bind:href="ports.demo_url" target="_blank">Demo</a>
                        <a role="button" class="ui-button" v-bind:href="ports.repos_url" target="_blank">Repos</a>
                    </div>
                </figcaption>

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
                            <td data-th="Related Keywords" v-html="html.keyword"></td>
                        </tr>

                        </template>
                        <template v-for="css in ports.category_css">
                        <tr>
                            <td data-th="Category"><span class="categ css">CSS</span></td>
                            <td data-th="Source"><a :href="css.url" target="_blank">{{css.file}}</a></td>
                            <td data-th="Related Keywords" v-html="css.keyword"></td>
                        </tr>

                        </template>
                        <template v-for="js in ports.category_js">
                        <tr>
                            <td data-th="Category"><span class="categ js">JS</span></td>
                            <td data-th="Source"><a :href="js.url" target="_blank">{{js.file}}</a></td>
                            <td data-th="Related Keywords" v-html="js.keyword"></td>
                        </tr>
                        </template>

                    </tbody>
                </table>

                <div class="btn-end" v-if="ismodal" @click="open('end')">end</div>
            </div>
        </div>
    </article>

</template>

<script>
import FirebaseService from '@/services/FirebaseServices'
export default {
    name :'PortfolioList',
    data() {
        return {
        //  ports : this.portfolio  
            out:false,
            ismodal:false,
        }
    },
    props:{
        ports: {type: null},
    },
    methods:{
        open:function(point){
            if(this.ismodal){
                console.log(point,": ",this.out)
                this.out = !this.out
            }
        },
    }
}
</script>

<style lang="css" scoped src="./PortfolioListCss2.css">
</style>
