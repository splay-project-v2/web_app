import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/pages/Home'
import Login from '@/components/pages/Login'
import Register from '@/components/pages/Register'
import Monitor from '@/components/pages/Monitor'
import Poc from '@/components/pages/Poc'

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
          comonent: Poc
        }
    ]
})
