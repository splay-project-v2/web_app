import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Monitor from '@/pages/Monitor'
import CreateJob from '@/pages/CreateJob'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior () {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
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
      name: 'monitor',
      component: Monitor
    },
    {
      path: '/createjob',
      name: 'createjob',
      component: CreateJob
    }
  ]
})
