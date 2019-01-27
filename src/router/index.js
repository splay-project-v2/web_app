import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Jobs from '@/components/Jobs'
import JobDetail from '@/components/JobDetail'

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
            name: "jobsDetails",
            component: JobDetail
        }
    ]
})