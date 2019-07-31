<template lang="html">
<div class="portfolio">
    <Header :uid="uid"/>
    <AboutMe :uid="uid"/>
    <PortfolioList :uid="uid" :css="css"/>

    <div id="select-css" v-if="iscontrol">
        <button id="css1" @click="changeCss(1)">1</button><br>
        <button id="css2" @click="changeCss(2)">2</button><br>
        <button id="css3" @click="changeCss(3)">3</button><br>
    </div>
</div>
</template>

<script>
import Header from '@/components/portfoliosVues/Header.vue'
import AboutMe from '@/components/portfoliosVues/AboutMe.vue'
import PortfolioList from '@/components/portfoliosVues/PortfolioList.vue'

import FirebaseService from '../services/FirebaseServices'
import firebase from 'firebase/app'

export default {

    name: 'portfolio',
    components: {
        Header,
        AboutMe,
        PortfolioList
    },
    data() {
        return {
            uid:'',
            user:'',
            mybookmark:false,
            iscontrol:false,
            css:0,
            visitNum:0,
            toBookMarkNum:0,
        }
    },
    created(){
        let th = this
        
        if(this.$route.params.uid){
            let uid = this.$route.params.uid
            th.uid = uid
            FirebaseService.getUserData(uid)
            .then(function(data){
                if(data){
                    th.css = data.css
                    if(data.visitNum) th.visitNum = data.visitNum+1
                    else th.visitNum = 1

                    if(data.bookmarks){
                        th.toBookMarkNum = data.bookmarks.length
                        for(let i=0;i<data.bookmarks.length;i++){
                            let bookmark = data.bookmarks[i]
                            if(bookmark == th.user.uid) {
                                th.mybookmark = true
                                break
                            }
                        }
                    }
                    FirebaseService.updateUserData(uid,th.css,th.visitNum)
                }
                else{
                    th.css = 1
                    th.visitNum = 0
                    FirebaseService.setUserData(uid,th.css,th.visitNum)
                }
                
            })

            firebase.auth().onAuthStateChanged(function(user){
                if (user){
                    th.user = user
                }
            })   
        }
        else{
            firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                    th.user = user
                    th.iscontrol = true
                    FirebaseService.getUserData(user.uid)
                    .then(function(data){
                        if(data){
                            th.css = data.css
                            th.visitNum = data.visitNum
                        }
                        else{
                            th.css = 1
                            th.visitNum = 0
                        }
                    })
                    .catch(function(){
                        th.css = 1
                    })
                }
            })
        }
    },
    methods :{
        changeCss(num){
            this.css = num
            let th = this
            firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                    FirebaseService.updateUserData(user.uid,th.css,th.visitNum)
                }
            })
        },
        
        doMybookmark(del){
            this.mybookmark = !del
            this.toBookMarkNum += del ? -1:1
            FirebaseService.setBookMark(this.user.uid,this.uid,del)
        }

    },
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
    color:white;
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
    border-color: #424242 !important;
}

.primary {
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

.bookMarkBtnIn , .bookMarkBtnOut{
    display:inline-block;
    margin:5px 10px;
    padding:10px;
    font-size:20px;
}
.bookMarkBtnIn{
    border:6px solid skyblue;
    background-color: blue;
    color:white;
}
.bookMarkBtnOut{
    border:6px solid pink;
    background-color: red;
    color:white;
}
.bookMarkBtnIn:hover{
    border:6px solid blue;
    background-color: skyblue;
    color:white;
}
.bookMarkBtnOut:hover{
    border:6px solid red;
    background-color: pink;
    color:white;
}


</style>

