import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Details from '@/components/Details'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },

    {
      path: '/details/:id',
      name: 'details',
      component: Details
    }
  ]
})


