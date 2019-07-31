import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import firebase from 'firebase'
import AdminPage from './views/AdminPage.vue'
import UserPage from './views/UserPage.vue'
import LoginPage from './views/LoginPage.vue'
import Portfolio from './views/Portfolio.vue'
import Portfolio2 from './views/Portfolio2.vue'

import Board from "./views/BoardPage.vue"
import BoardEdit from './views/BoardEdit.vue'
import WritePort from './views/WritePort.vue'

import AdminUser from './components/AdminVues/AdminUser.vue'
import AdminDb from './components/AdminVues/AdminDb.vue'
import AdminStorage from './components/AdminVues/AdminStorage.vue'

import PortfolioPage from './views/PortfolioPage.vue'
// 검색 결과 페이지 링크
import SearchResult from './views/SearchResult.vue'

// 포트폴리오 입력 링크
import PortfolioWrite from './views/PortfolioWrite.vue'

import TestPage from './views/TestPage.vue'

// portfolio3 링크
import Portfolio3 from './views/Portfolio3.vue'

Vue.use(Router)

// 로그인 상태 정보를 vuex에 저장하고 판단
const requireAuth = () => (to, from, next) => {
  let _user = firebase.auth().currentUser
  if (!_user) {
    alert('login please')
    return next('/login')
  }
  next()
}

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/portfolio',
            name: 'portfolio',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: Portfolio
        },

        {
            path: '/portfolio2',
            name: 'portfolio2',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: Portfolio2
        },
        {
            path: '/portfolio/:uid',
            name: 'portfolio',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: Portfolio
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
        },
        {
            path: '/user/:userId',
            name: 'userpage',
            component: UserPage,
            // router guard
            beforeEnter: requireAuth()
        },
        {
            path: '/login',
            name: 'loginpage',
            component: LoginPage
        },
        {
            path: '/board',
            name: 'board',
            component: Board
        },
        {
            path: '/board/:board_id',
            name: 'boardedit',
            component: BoardEdit
        },
        {
            path: '/writeport',
            name: 'writeport',
            component: WritePort
        },
        {
            path: '/search/:search_value',
            name: 'search',
            component: SearchResult
        },
        {
            path: '/write_portfolio',
            name: 'write_portfolio',
            component: PortfolioWrite
        },
        {
            path: '/test',
            name: 'test',
            component: TestPage
        },
        {
            path: '/portfolio3',
            name: 'portfolio3',
            component: Portfolio3
        },
        {
            path: '/portfoliopage',
            name: 'portfoliopage',
            component: PortfolioPage
        },
        {
            path: '/portfoliopage/:uid',
            name: 'portfoliopage',
            component: PortfolioPage
        },
        {
            path: '/admin',
            name: 'adminpage',
            component: AdminPage,
            children: [
                {
                  path: 'user',
                  name: 'adminuser',
                  component: AdminUser
                },
                {
                  path: 'data',
                  name: 'admindb',
                  component: AdminDb
                },
                {
                    path: 'storage',
                    name: 'adminstorage',
                    component: AdminStorage
                },

            ]
        }
    ]
})
