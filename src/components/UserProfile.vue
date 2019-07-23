<template>
<div>
    <!-- user profile -->
    <v-layout row mt-5>
        <v-flex md4>
            <v-card flat color="transparent">
            <v-avatar size="256" class="profileImg">
                <img :src="photoURL ? photoURL:this.$store.state.imgSrc.noImgSrc" alt="avatar">
            </v-avatar>
            <div>
                <v-btn small>My portfolio</v-btn>
                
                <UserProfileBtn :photoURL="photoURL" :displayName="displayName"/>

            </div>
            </v-card>
        </v-flex>
        
        <!-- <v-flex md8>
            <v-card>
                <v-card-text>유저 상태정보(권한 등)</v-card-text>
                <v-card-title primary-title>
                    <div>
                        <h3 class="headline mb-0">portfolio 제작 정도</h3>
                        <div>내용물</div>
                    </div>
                </v-card-title>
            </v-card>
        </v-flex> -->
        <div class="green-box">
            <div class="green-box-part-left">
                <h1>완료정도</h1>
                <div class="complate-box"></div>
            </div>
            <div class="green-box-part-right">
                <h1>이미지 저장소</h1>
                <div class="img-box"></div>
            </div>
            <div class="text-box">
                <p>Text - Double click to edit</p>
                <div class="quest-box">
                    <h4>안녕하세요</h4>                
                </div>
                <div class="quest-tail">              
                </div>
            </div>
        </div>
    </v-layout>

    <!-- user edit modal -->
</div>
</template>

<script>
import firebase from 'firebase'
import UserProfileBtn from './UserProfileBtn.vue'
// import UserProfileBtn from './UserProfileTestBtn.vue'

export default {
    name: 'UserProfile',
    components: {
        UserProfileBtn
    },
    data () {
        return {
            dialog: false,
            photoURL: this.$store.state.firebaseUser.photoURL,
        }
    },
    created() {
        this.viewProfile()
    },
    methods: {
            viewProfile: function() {
            this.photoURL = this.$store.state.firebaseUser.photoURL
        }
    }
}
</script>

<style>
    .profileImg {
        margin: 10px;
    }

    .green-box{
        background-color: rgb(155, 214, 203);
        width:600px;
    }

    .green-box-part-left,.green-box-part-right{
        width:44%;
        display: inline-block;
    }
    .green-box-part-left{
        margin:10px 2% 10px 4%;
    }
    .green-box-part-right{
        margin:10px 4% 10px 2%;
    }
    .green-box-part-left h1 , .green-box-part-right h1{
        margin:10px 0;
        text-align: left;
        font-size:22px;
    }

    .text-box > p{
        text-align: left;
        margin-left:4%;
        font-size:18px;
    }
    .quest-box{
        background-color: #666;
        margin:0 4%;
        height:60px;
        position: relative;
        border-radius: 10px;
    }
    .quest-box h4{
        color:white;
        font-size:20px;
        position: absolute;
        top: 50%;
        left: 50%;
        -ms-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
    }
    .quest-tail{
        margin:0 4% 20px 10%;
        width: 0px;height: 0px;
        border-bottom:20px solid none;
        border-top:20px solid #666;
        border-right: 20px solid transparent;
        border-left: 20px solid  transparent;
    }

    .complate-box{
        width:100%;
        height:300px;
        background-color: rgb(26, 188, 156);
    }
    .img-box{
        width:100%;
        height:300px;
        background-color: rgb(26, 188, 156);
    }
</style>
