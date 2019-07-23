import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

import UserPage from './views/UserPage.vue'
import LoginPage from './views/LoginPage.vue'
import Portfolio from './views/Portfolio.vue'

import Board from "./views/BoardPage.vue"
import BoardEdit from './views/BoardEdit.vue'
import WritePort from './views/WritePort.vue'

import Test from './views/TestPage.vue'

Vue.use(Router)

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
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
        },
        {
            path: '/user',
            name: 'userpage',
            component: UserPage
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
            path: '/test',
            name: 'test',
            component: Test
        }        
    ]
})
