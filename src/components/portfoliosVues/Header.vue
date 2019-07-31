<template>
    <div class="header">
        <v-layout v-if="state == 'header1'" row justify-center align-center style="min-height: 100vh; position: relative; background-image: linear-gradient(-39deg, #ff6b6b 0%, #2b90d9 100%)">
            <v-flex>
                <h1 style="color: black; font-size: 3rem; font-weight: 300; letter-spacing: 0.08rem;">Hi! I'm Yeojin :)</h1>
                <p style="color: black;">I'm web developer based on Daejeon.</p>
            </v-flex>
        </v-layout>
        <v-layout v-if="state == 'header2'" class="visual topArea">
            <div class="visual_elem visual_fog02" style="display:none"></div>
            <div class="inner">
                <p class="item-1">This is your last chance. After this, there is no turning back.</p>
                <p class="item-2">You take the blue pill - the story ends, you wake up in your bed and believe whatever you want to believe.</p>
                <p class="item-3">You take the red pill - you stay in Wonderland and I show you how deep the rabbit-hole goes.</p>
            </div>
            <v-btn outline color="white" style="margin-top: auto; margin-left: auto; margin-bottom: 2rem; margin-right: 2rem;" @click.stop="drawer = !drawer;"><i class="fas fa-palette pr-2"></i>EDIT</v-btn>
        </v-layout>
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
                            <div>background</div>
                        </template>
                        <v-card>
                            <v-card-text>
                                <v-select
                                :items="templates"
                                label="Standard"
                                color="white"
                            ></v-select>
                            </v-card-text>
                        </v-card>
                    </v-expansion-panel-content>
                </v-expansion-panel>
                <!--<v-list-tile
                v-for="item in items"
                :key="item.title"
                @click=""
                >
                <v-list-tile-action>
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-tile-action>

                <v-list-tile-content>
                    <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile-content>
                </v-list-tile>-->
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
            state: 'header2',
            drawer: null,
            mini: false,
            templates: {
                dolphin: 'example4.jpg',
                mountain: 'example5.jpg',
                horizon: 'example6.jpg'
            }
        }
    },
    created() {
        this.getBanner();
    },
    methods: {
        getBanner: function() {
            var storage = firebase.storage();
            var storageRef = storage.ref();
            storageRef.child('banner/example4.jpg').getDownloadURL().then(function(url) {
                var xhr = new XMLHttpRequest();
                xhr.responseType = 'blob';
                xhr.onload = function(event) {
                    var blob = xhr.response;
                }
                xhr.open('GET', url)
                xhr.send();
                console.log(url);
            }).catch(function(error) {
                console.log(error);
            })
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
</style>