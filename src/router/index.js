import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Monitor from '@/pages/Monitor'
import Poc from '@/pages/Poc'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
            path: '/',
            name: "home",
            component: Home
        },
        {
            path: '/home',
            alias: 'home',
            component: Home
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/register',
            component: Register
        }, // Only when authentificated
        {
            path: '/monitor',
            name: "monitor",
            component: Monitor
        },
        {
          path: '/poc',
          name: 'poc',
          component: Poc
        }
    ]
})
