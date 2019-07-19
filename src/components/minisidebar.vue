<template>
<div>
    <v-app id="inspire">
        <v-layout wrap style="height: 200px;">
            <v-navigation-drawer v-model="drawer" right class="sidebar">
                <v-list class="pa-1">
                    <v-list-tile avatar>
                        <v-list-tile-avatar>
                            <img src="../assets/chicks-4107838_960_720.png">
                        </v-list-tile-avatar>
            
                        <v-list-tile-content>
                            <v-list-tile-title>Bang Cok</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
        
                <v-list class="pt-0" dense>
                    <v-divider></v-divider>
            
                    <v-list-tile v-for="item in items" :key="item.title" v-if="item.isif" @click="linkto(item.link)">
                        <v-list-tile-action>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-tile-action>
            
                        <v-list-tile-content>
                            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
            </v-navigation-drawer>
        </v-layout>
        <button class="sidebar-toggle" @click="drawer = !drawer">toggle
        </button>
        
    </v-app>
</div>
</template>

<script>
import FirebaseService from '../services/FirebaseServices'
import firebase from 'firebase'
// firebase ui settings
import firebaseui from 'firebaseui'

function checklogin(th){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            th.islogin = true
            th.islogout = false
        } 
        else {
            // User is signed out.
            th.islogin = false
            th.islogout = true
        }
        th.items[2].isif = th.islogout
        th.items[3].isif = th.islogin
        th.items[7].isif = th.islogin
    })
}

export default {
    name: 'miniSideBar',
    components: {
    },
    mounted:function(){
        checklogin(this)
    },
    data () {
        return {
            drawer: false,
            islogin:false,
            islogout:true,
            items: [
                { title: 'Home',     icon: 'dashboard',       isif:true, link:'/' },
                { title: 'About',    icon: 'question_answer', isif:true, link:'#' },
                { title: 'login',    icon: 'lock',            isif:true, link:'/login' },
                { title: 'logout',    icon: 'lock',           isif:true, link:'/logout' },
                { title: '번역',     icon: 'g_translate',     isif:true, link:'/trans' },
                { title: 'chat-bot', icon: 'chat',            isif:true, link:'#' },
                { title: 'search',   icon: 'search',          isif:true, link:'#' },
                { title: 'setting',  icon: 'build',           isif:true, link:'#' },

            ]
        }
    },
    methods:{
        linkto:function(link){
            window.location.href=link
        }
    }
}

</script>

<style>
.sidebar{
    position: fixed;
    top:7%;
}

.sidebar-toggle{
    position: fixed;
    right:10%;
    bottom:10%;
    padding:10px;
    color:white;
    background-color: red;
    border:5px solid pink;
    font-size:20px;
    z-index:6;
}
</style>
