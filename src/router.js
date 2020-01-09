import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: './',
  routes: [
    {
      path: '/',
      redirect: '/form'
    },
    {
      path: '/form',
      name: 'form',
      component: () => import(/* webpackChunkName: "form" */ './views/Form.vue')
    },
    {
      path: '/success',
      name: 'success',
      component: () => import(/* webpackChunkName: "success" */ './views/SuccessPage.vue')
    },
    {
      path: '/error',
      name: 'error',
      component: () => import(/* webpackChunkName: "error" */ './views/ErrorPage.vue')
    }
  ]
})
