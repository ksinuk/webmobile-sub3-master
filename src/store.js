import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    searchItem :'',
    imgurID: "Client-ID eadc208fc721efd",
    // firebase user info
    firebaseUser: {
      name: null,
      email: null,
      photoURL: null,
    },
    imgSrc: {
      noImgSrc: 'http://dy.gnch.or.kr/img/no-image.jpg',
    }
  },
  mutations: {
    changeItem : function(state, payload){
      state.searchItem=payload;
    }
  },
  actions: {
  },
  getters: {
    searchItem : state => state.searchItem
  }
})
