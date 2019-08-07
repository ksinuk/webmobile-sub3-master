// Firebase default config
import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'
import 'firebase/firestore'

import router from '../router'
import store from '../store'

const USERS = 'users'
const POSTS = 'posts'
const PORTFOLIO = 'portfolio'
const PORTFOLIOS = 'tportfolio'
const MYPORT = 'portfolios'
const USERDATA = 'userData'

// Firebase SDK snippet
const firebaseConfig = {
    apiKey: "AIzaSyAz0RGXUXrOUfioiOTeLDJbWHJmVAGGIRE",
    authDomain: "teamportfolio-d978f.firebaseapp.com",
    databaseURL: "https://teamportfolio-d978f.firebaseio.com",
    projectId: "teamportfolio-d978f",
    storageBucket: "teamportfolio-d978f.appspot.com",
    messagingSenderId: "44702362763",
    appId: "1:44702362763:web:143c6516b7091e25"
}

firebase.initializeApp(firebaseConfig)

// firebase 인승상태 지속성
// login 시 페이지 로드가 한번 일어남으로 NONE으로 설정하면 인증이 해제됨
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)

const db = firebase.firestore()

export default {
    //read user data
    getUserData(uid) {
        return new Promise(function(resolve,reject){
            db.collection('userData').doc(uid).get()
            .then(function(doc) {
                if (doc.exists){
                    resolve(doc.data())
                }
                else{
                    resolve(null)
                }
            })
        })
    },
    getUserDataAll() {
        return new Promise(function(resolve,reject){
            db.collection('userData').get()
            .then(function(doc) {
                if (!doc.empty){
                    let out = []
                    for(let i=0;i<doc.size;i++){
                        let data = doc.docs[i]
                        let elem = data.data()
                        elem['id'] = data.id
                        elem['addr'] = '/portfoliopage/'+data.id
                        out.push(elem)
                    }

                    resolve(out)
                }
                else{
                    resolve(null)
                }
            })
        })
    },
    getTagAll(){
        return new Promise(function(resolve,reject){
            db.collection('portfolio').get()
            .then(function(doc) {
                // console.log("getTagAll(): ",doc)
                if (!doc.empty){
                    let out = []
                    for(let i=0;i<doc.size;i++){
                        let data = doc.docs[i]
                        let elem = data.data().hashtags
                        elem['id'] = data.id
                        out.push(elem)
                    }

                    resolve(out)
                }
                else{
                    resolve(null)
                }
            })
        })
    },
    //write user data
    setUserData(uid, css, visit) {
        return db.collection('userData').doc(uid).set({
            css:css,
            visitNum:visit
        })
    },
    updateUserData(uid, css, visit) {
        return db.collection('userData').doc(uid).update({
            css:css,
            visitNum:visit
        })
    },
    updateUserBookmark(from, to,add){
        if (add) {
            return db.collection('userData').doc(from).update({
                myBookmark: firebase.firestore.FieldValue.arrayUnion(to)
            })
        }
        else {
            return db.collection('userData').doc(from).update({
                myBookmark: firebase.firestore.FieldValue.arrayRemove(to)
            })
        }
            
    },
    setBookMark(from,to,del){
        if(!del){
            return db.collection('userData').doc(to).update({
                bookmarks: firebase.firestore.FieldValue.arrayUnion(from)
            })
        }
        else{
            return db.collection('userData').doc(to).update({
                bookmarks: firebase.firestore.FieldValue.arrayRemove(from)
            })
        }
    },
    getBookMarkFromUid(uid){
        return new Promise(function(resolve,reject){
            db.collection('userData').where("bookmarks", "array-contains", uid).get()
            .then(function(doc) {
                let out = []
                for(let i=0;i<doc.size;i++){
                    let temp = doc.docs[i].data()
                    temp['uid'] = doc.docs[i].id
                    temp['addr'] = '/portfoliopage/'+doc.docs[i].id
                    out.push(temp)
                }
                console.log(out);
                resolve(out)
            })
        })
    },
    // write post
    postPost(uid, title, body) {
        return db.collection(POSTS).add({
            uid,
            title,
            body,
            notice: false,
            created_at: firebase.firestore.FieldValue.serverTimestamp()
        }).then(console.log('done'))
    },
    // 다음 코드는 같은 uid 인 포스트를 조회하여 바꿈
    editPost(pk, uid, title, body, notice, created_at) {
        return db.collection(POSTS).doc(pk).set({
            uid,
            title,
            body,
            notice,
            created_at
            // created_at: firebase.firestore.FieldValue.serverTimestamp()
        }).then(console.log('done'))
    },
    // 전체 포스트 목록을 조회
    getPosts() {
        const postsCollection = db.collection(POSTS)
        return postsCollection
        .orderBy('created_at', 'desc')
        .get()
        .then((docSnapshots) => {
            let idx = 0
            return docSnapshots.docs.map((doc) => {
                let data = doc.data()
                data.pk = doc.id
                data.view_created = new Date(data.created_at.toDate())
                data.idx = idx
                idx += 1
                return data
            })
        })
    },

    // board_id를 기반으로 하나의 게시글을 불러와 편집
    getPostId(board_id) {
        const postsCollection = db.collection(POSTS)
        return postsCollection
        .get()
        .then((docSnapshots) => {
            let results =  docSnapshots.docs.map((doc) => {
                let data = doc.data()
                data.pk = doc.id
                if (board_id === data.pk) {
                    return data
                }
            })
            for (var result in results) {
                if (results[result] !== undefined) {
                return results[result]
                }
            }
        })
    },

    // 포스트 삭제
    deletePost(board_id) {
        db.collection(POSTS).doc(board_id).delete().then(function() {
            console.log("Document successfully deleted!");
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
    },

    // 포트폴리오 목록 조회
    getPortfolios(){
        return new Promise(function(resolve,reject){
            db.collection('portfolio').get()
            .then(function(snapshot) {
                // console.log("getPortfolios(): ",snapshot.docs)
                let outlist = snapshot.docs
                let out = []

                for(let i=0;i<outlist.length;i++){
                    let doc = outlist[i].data()
                    doc.pk = outlist[i].id
                    doc.like = false
                    out.push(doc)
                }
                console.log("getPortfolios() return : ",out)
                resolve(out)
            })
            .catch(function(res){
                console.log("getPortfolios() error : ",res)
            })
        })
    },
    getUidPortfolios(uid){
        return new Promise(function(resolve,reject){
            db.collection(PORTFOLIO).where('uid', '==', uid).get()
            .then(function(snapshot) {
                if (snapshot.empty) {
                    resolve(null)
                }
                let out = new Array()
                snapshot.forEach(doc => {
                    out.push(doc.data())
                })
                resolve(out)
            })
            .catch(function(res){
                console.log("error : ",res)
            })
        })
    },


    /*
    async currentUser() {
        var user = firebase.auth().currentUser;
        var docRef = db.collection(USERS);
        const detailedUser = docRef.get().then((docSnapshots) => {
            let results = docSnapshots.docs.map((doc) => {
                let data = doc.data()
                if (data.uid === user.uid) {
                    return data
                }
            })
            for (var res in results) {
                if (results[res] !== undefined) {
                    return results[res]
                }
            }
        })
        return detailedUser
    },
    */
    // 포트폴리오 목록 조회 리뉴얼
    getPortfolio(user_id){
        const portfolios = db.collection(PORTFOLIOS)
        const detailPort= portfolios
        .get()
        .then((docSnapshots)=> {
            let results= docSnapshots.docs.map((doc) => {
                let data = doc.data()
                if(data.uid==user_id){
                    console.log('데이터 반환')
                    console.log(data);
                    return data;
                }
            })
            for (var res in results) {
                if (results[res] !== undefined) {
                    return results[res]
                }
            }
        })
        return detailPort;
    },

    // 나의 포트폴리오 가져오기
    async getMyPort(user) {
        const portfolios = db.collection(MYPORT)
        const detailPort = await portfolios
        .get()
        .then((docSnapshots)=> {
            let results = docSnapshots.docs.map((doc) => {
                let data = doc.data()
                if(data.uid == user) {
                    return data;
                }
            })

            for (var res in results) {
                if (results[res] !== undefined) {
                    return results[res]
                }
            }
        })
        console.log(detailPort);
        return detailPort;
    },

    // 파이어베이스에 포트폴리오를 입력하는 함수
    // hashtag 를 저장하는 단계에서 str.toLowerCase() 함수를 사용하여 소문자로 변환, 저장하기 <- 검색 단계를 위함
    postPortfolios(user, aboutMe, layout, banner, portfolios, skills, subtitle, title, userImage) {
        return db.collection(MYPORT).doc(user).set({
            uid: user,
            title: title,
            subtitle: subtitle,
            aboutMe: aboutMe,
            skills: skills,
            portfolios: portfolios,
            created_at: firebase.firestore.FieldValue.serverTimestamp(),
            layout: layout,
            banner: banner,
            userImage: userImage
        }).then(console.log('done'))
    },

    getIntroduce(){
        const intro = db.collection('introduce')
        return intro
        .get()
        .then((docSnapshots)=> {
            return docSnapshots.docs.map((doc) => {
                let data = doc.data()
                return data
            })
        })
    },
    // userstate 1. onAuthStateChanged
    // auth 개체 관찰자. auth의 변경을 감시함
    userState() {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                console.log('user is signed in')
                return true;
            }
            else {
                console.log('No user is signed in')
                return false;
            }
        })
    },
    // 현재 로그인 user doc 가져오기
    async currentUser() {
        var user = firebase.auth().currentUser;
        var docRef = db.collection(USERS);
        const detailedUser = docRef.get().then((docSnapshots) => {
            let results = docSnapshots.docs.map((doc) => {
                let data = doc.data()
                if (data.uid === user.uid) {
                    return data
                }
            })
            for (var res in results) {
                if (results[res] !== undefined) {
                    return results[res]
                }
            }
        })
        return detailedUser
    },

    changePassword: function(password) {
        var user = firebase.auth().currentUser;
        var newPassword = password;

        user.updatePassword(newPassword).then(function() {
            console.log('password is updated.')
        }).catch(function(error) {
            console.log('password update is failed.')
        })
    },

    // 0806 view data
    async getVisitView(userID) {
        const userView = db.collection(USERDATA)
        const viewData = await userView
            .get()
            .then((docSnapshots)=> {
                let results = docSnapshots.docs.map((doc) => {
                    let data = doc.data()
                    if(data.uid == userID) {
                        return data;
                    }
                })
                for (var res in results) {
                    if (results[res] !== undefined) {
                        return results[res]
                    }
                }
            })
        return viewData;
    },
    // 0806 view data update
    // updated view
    updateUserView(userID, result) {
        return db.collection(USERDATA).doc(userID).update({
            visit: result
        })
    },
    // 0807 user career data get
    getUserCareer(userID) {
        return new Promise(function(resolve, reject) {
            db.collection(USERDATA).doc(userID).get()
                .then(function(snapshot) {
                    if (snapshot.empty) {
                        resolve(null)
                    }
                    let out = new Array()
                    out.push(snapshot.data())
                    resolve(out[0].selected)
                })
                .catch(function(res) {
                    console.log("error: ", res)
                })
        })
    },
    // 0807 user career data update
    updateUserCareer(userID, result) {
        return db.collection(USERDATA).doc(userID).update({
            selected: result
        })
    },
    // login 1. create DB
    // 신규유저 생성시 users 컬렉션에 uid로 접근 가능한 문서 생성
    async createdbForNewUser(userID, date) {
        console.log(date)
        await db.collection(USERDATA).doc(userID).set({
            uid: userID,
            bookmark: [],
            visit: {
            },
            selected: {
                recruit: [],
                tool: [],
                career: [],
            },
            created_at: date
        })
    },
    // users collection 데이터 수정
    editUser(userId, bookmarkList, css, visitNum) {
        db.collection(USERDATA).doc(userId).set({
            bookmarks: bookmarkList,
            css: css,
            visitNum: visitNum
        })
    },
    // 현재 로그인 된 유저의 프로필 정보를 업데이트
    updatedForUser(display_name, photo_url) {
        var user = firebase.auth().currentUser
        user.updateProfile({
            displayName: display_name,
            photoURL: photo_url
        })
        console.log(user)
    },
    // store 에 있는 유저정보 업데이트
    updatedStoreUser() {
        let _user = firebase.auth().currentUser
        if (_user) {
            store.commit('setUserName', _user.displayName)
            store.commit('setUserState', true)
            store.commit('setPhotoURL', _user.photoURL)
        }
        else {
            store.commit('setUserName', '')
            store.commit('setUserState', false)
            store.commit('setPhotoURL', null)
        }
    },
    // login 2-1.1 create user with e-mail
    createUserWithEmail(email, password, userName, date) {
        let _this = this
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function(user) {
            _this.createdbForNewUser(user.user.uid, date)
            // 유저 생성하면서 입력받은 이름 설정
            let _user = firebase.auth().currentUser
            _user.updateProfile({
                displayName: userName,
                photoURL: 'http://dy.gnch.or.kr/img/no-image.jpg'
            })
        })
        .catch(function(error) {
            console.log(error)
        })
    },
    // login 2-1.2 login user whit e-mail
    loginUserWithEmail(email, password) {
        let _this = this
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function(result) {
        })
        .catch(function(error) {
            console.log(error)
        })
    },
    // login 2-2. login google
    loginUserWithGoogle() {
        let _this = this
        let provider = new firebase.auth.GoogleAuthProvider()
        firebase.auth().signInWithPopup(provider)
        .then(function(result) {
            if (result.additionalUserInfo.isNewUser) {
                _this.createdbForNewUser(result.user.uid)
            }
        })
        .catch(function(error) {
            console.log(error.code, error.message)
        })
    },
    // login 2-3. login facebook
    loginUserWithFacebook() {
        let _this = this
        let provider = new firebase.auth.FacebookAuthProvider()
        firebase.auth().signInWithPopup(provider)
        .then(function(result) {
            if (result.additionalUserInfo.isNewUser) {
                _this.createdbForNewUser(result.user.uid)
            }
            console.log(result)
        })
        .catch(function(error) {
            console.log(error.code, error.message)
        })
    },
    // login 3. logout
    logoutUser() {
        firebase.auth().signOut().then(function() {})
        // 로그아웃 후 세션삭제
        .then(sessionStorage.clear())
        // 홈페이지로 이동
        .then(router.push('/'))
        .catch(function(error) {
            console.log(error)
        })
    },
    login() {
        firebase.auth().signInWithEmailAndPassword(email, password)
        .catch(function(error) {
            console.log(error)
        })
        .then('done')
    },


    updateUser() {
        // 이미지 올리면 유저 변경
    },
    // 이미지 업로더
    uploadfile(user, loadFile) {

       let filename = loadFile.name
       let storageRef = firebase.storage().ref('/users/' + user + '/' + filename)
       let uploadTask = storageRef.put(loadFile)
       uploadTask.on('state_changed', function(snapshot) {
         // progressbar
         // 진행정도를 보여줌
         let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
         console.log('Upload is ' + progress + '% done')
         switch (snapshot.state) {
           case firebase.storage.TaskState.PAUSED:
             console.log('Upload is paused')
             break
           case firebase.storage.TaskState.RUNNING:
             console.log('Upload is running')
             break
         }
       }, function(error) {
         console.log(error)
         switch (error.code) {
           case 'storage/unauthorized':
             break
           case 'storage/canceled':
             break
           case 'storage/unknown':
             break
         }
       }, function() {
           uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
           console.log('File available at', downloadURL)
         })
       })
     }
    }
