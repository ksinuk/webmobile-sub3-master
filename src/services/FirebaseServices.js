// Firebase default config
import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'
import 'firebase/firestore';

import store from '../store'

const USERS = 'users'
const POSTS = 'posts'
const PORTFOLIO = 'portfolio'

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
  //write user data
  setUserData(uid, css) {
      return db.collection('userData').doc(uid).set({
          css:css,
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
  editPost(pk, uid, title, body, notice) {
      return db.collection(POSTS).doc(pk).set({
          uid,
          title,
          body,
          notice,
          created_at: firebase.firestore.FieldValue.serverTimestamp()
      }).then(console.log('done'))
  },
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
            data.created_at = new Date(data.created_at.toDate())
            data.idx = idx
            idx += 1
						return data
					})
				})

  },
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
  deletePost(board_id) {
    db.collection(POSTS).doc(board_id).delete().then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
  },

  getPortfolios(){
        const portfolios = db.collection(PORTFOLIO)
        return portfolios
            .get()
            .then((docSnapshots)=> {
            return docSnapshots.docs.map((doc) => {
                let data = doc.data()
                return data
            })
        })
  },
  getUidPortfolios(uid){
      return new Promise(function(resolve,reject){
          console.log("getUidPortfolios!!!")
          db.collection(PORTFOLIO).where('uid', '==', uid).get()
          .then(function(snapshot) {
              console.log("snapshot: ",snapshot)
              if (snapshot.empty) {
                  resolve(null)
              }
              let out = new Array()
              snapshot.forEach(doc => {
                  out.push(doc.data())
                  console.log(doc.id, '=>', doc.data());
              })
              resolve(out)
          })
          .catch(function(res){
              console.log("error : ",res)
          })
      })
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
        // 로그인 상태면 store 에 유저정보 저장
        store.state.firebaseUser.name = user.displayName
        store.state.firebaseUser.email = user.email
        store.state.firebaseUser.photoURL = user.photoURL
        return true
      } else {
        console.log('No user is signed in')
        return false
      }
    })
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
  // login 1. create DB
  // 신규유저 생성시 users 컬렉션에 uid로 접근 가능한 문서 생성
  async createdbForNewUser(userID) {
    await db.collection(USERS).doc(userID).set({
      uid: userID
    })
  },
  // 현재 로그인 된 유저의 프로필 정보를 업데이트
  updatedForUser(display_name, photo_url) {
    var user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: display_name,
      photoURL: photo_url
    })
    console.log(user)
  },
  // login 2-1. create user with e-mail
  createUserWithEmail(email, password) {
    let thisCopy = this
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(function(user) {
        thisCopy.createdbForNewUser(user.user.uid)
      })
      .catch(function(error) {
        console.log(error)
    })
  },
  // login 2-2. login google
  loginUserWithGoogle() {
    let thisCopy = this
    let provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithPopup(provider)
      .then(function(result) {
        if (result.additionalUserInfo.isNewUser) {
          thisCopy.createdbForNewUser(result.user.uid)
        }
      }).catch(function(error) {
        console.log(error.code, error.message)
      })
  },
  // login 2-3. facebook login
  loginUserWithFacebook() {
    let thisCopy = this
    let provider = new firebase.auth.FacebookAuthProvider()
    firebase.auth().signInWithPopup(provider)
    .then(function(result) {
      if (result.additionalUserInfo.isNewUser) {
        thisCopy.createdbForNewUser(result.user.uid)
      }
    }).catch(function(error) {
      console.log(error.code, error.message)
    })
  }
}
