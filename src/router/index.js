import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/pages/Home'
import Login from '@/components/pages/Login'
import Register from '@/components/pages/Register'
import Jobs from '@/components/pages/Jobs'
import JobDetail from '@/components/pages/JobDetail'

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
            path: '/jobs',
            name: "jobs",
            component: Jobs
        },
        {
            path: '/jobs/:id',
            name: "jobDetails",
            component: JobDetail
        }
    ]
})