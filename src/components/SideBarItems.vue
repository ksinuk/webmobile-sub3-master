<template>
    <v-container id="sideCtn">
        <!-- vuex에서 유저 이름을 가져와서 router로 연결 -->
        <!-- 로그인 상태확인 해서 보여줌 -->
        <div v-if="this.$store.state.firebaseUser.inUser">
            <img :src="this.$store.state.firebaseUser.photoURL" style="border-radius: 50%; height: 8rem; width: 8rem;">
            <h1 style="padding-top: 1rem; color: white;">{{ this.$store.state.firebaseUser.name }}</h1>
            <v-btn small @click="logoutUser" color="error">Logout</v-btn>
            <v-divider/>
            <v-btn active-class="active" flat block :to="{name: 'userpage', params: { userId: this.$store.state.firebaseUser.uid }}">My Page</v-btn>
        </div>
        <div v-if="!this.$store.state.firebaseUser.inUser">
            <!-- 로그인 되어 있으면 가림 -->
            <v-btn small color="info" to="/login">Sign in</v-btn>
            <v-divider/>
        </div>
        <div>
            <v-btn active-class="active" flat block to="/board">board</v-btn>
            <v-btn active-class="active" flat block to="/portfoliopage">my portfolio</v-btn>
            <v-btn active-class="active" flat block to="/Portfolios">other portfolio</v-btn>
            <!-- 제공되는 검색 기능 -->
            <v-flex>
                <v-text-field label="Search" v-model="searchItem" v-on:keyup.enter="findItem" color="white" ></v-text-field>
            </v-flex>
            <div>
                <span v-for="(tag, name) in tagDict" @click="writeTag(name)">
                    <v-btn style="text-transform:none; backgroundColor:teal;" round depressed small v-if="tag.color == 'teal'">{{name}}</v-btn>
                    <v-btn style="text-transform:none; backgroundColor:red;" round depressed small v-if="tag.color == 'red'">{{name}}</v-btn> 
                    <v-btn style="text-transform:none; backgroundColor:blue;" round depressed small v-if="tag.color == 'blue'">{{name}}</v-btn> 
                    <v-btn style="text-transform:none; backgroundColor:black;" round depressed small v-if="tag.color == 'black'">{{name}}</v-btn>    
                </span>
                <!-- <v-btn style="backgroundColor:red;" round depressed small >임베디드</v-btn> -->
                
            </div>
        </div>
    </v-container>
</template>

<script>
import FirebaseServices from "../services/FirebaseServices";

export default {
    name: "sideBarItems",
    data() {
        return {
            searchItem: null,

            tagDict: {},
        }
    },
    mounted() {
        console.log('mounted', this.userImg)
        this.$EventBus.$on('changePhoto', (URL) => {
            this.userImg = URL
        })
    },
    async created(){
        this.tagDict = await FirebaseServices.getTagsAll()
    },
    methods: {
        closeDrawer(trigger) {
            this.$EventBus.$emit(trigger)
        },
        logoutUser() {
            FirebaseServices.logoutUser()
            this.closeDrawer('Logout')
        },
        findItem: function() {
            console.log(this.searchItem)
            this.$router.push("/search/" + this.searchItem)
            window.location.reload()
        },
        writeTag: function(input){
            this.searchItem += ' '+input
        }
    }
};
</script>

<style scoped>
#sideCtn {
     margin-top: 70px;
}
.active {
    background-color: #4caf50;
}
</style>

