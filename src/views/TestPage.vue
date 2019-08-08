<template>
    <div>
        <div id="title_on">
            <h1 style="font-size: 9em; margin-top:0.5em; color:#8cddeb;">Work.</h1>

            <i style="top: -10px; font-size: 2rem; color: #aaa; font-weight: light;">Featured Work</i>
        </div>
        <v-layout v-for="item in portfolios.portfolios">
            <v-flex>
                <v-hover>
                <v-jumbotron
                    dark
                    :src="item.imageNames"
                    slot-scope="{ hover }"
                >
                    <!--<v-container fill-height>
                    <v-layout align-center>
                        <v-flex text-xs-center>
                        <h3 class="display-3">{{ item.title }}</h3>
                        </v-flex>
                    </v-layout>
                    </v-container>-->
                    <v-expand-transition>
                        <div
                            v-if="hover"
                            class="d-flex transition-fast-in-fast-out orange darken-2 v-card--reveal display-3 white--text"
                            style="height: 100%; opacity: .5; text-align: center; vertical-align: middle;"
                        >
                            {{ item.title }}
                        </div>
                    </v-expand-transition>
                </v-jumbotron>
                </v-hover>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>

import FirebaseServices from '../services/FirebaseServices'
import firebase from 'firebase/app'

export default {
    name: 'TestPage',
    data() {
        return {
            // firebase portfolios 컬렉션에서 가져온 데이터
            portfolios:[],
            user: null,
            // gradient: 'to top right, rgba(0, 0, 0, .7), rgba(0, 0, 0, .7)',
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
    mounted(){
        let __this = this;

        this.getPortfolio();
    },
    methods:{
        async getPortfolio(uid) {
            let __this = this;
            var storage = firebase.storage();
            var storageRef = storage.ref();
            const tmp = firebase.auth().onAuthStateChanged(function(user) {
                __this.user = user.uid;
                console.log(__this.user);
                FirebaseServices.getMyPort(__this.user).then(function(res) {
                    __this.portfolios = res;
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
                        })
                    }
                    console.log(__this.portfolios.portfolios)
                })
            })
        }
    }
}
</script>


