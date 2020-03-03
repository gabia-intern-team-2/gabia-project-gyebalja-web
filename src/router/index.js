/**
 * Vue Router
 *
 * @library
 *
 * https://router.vuejs.org/en/
 */

// Lib imports
import Vue from 'vue'
import VueAnalytics from 'vue-analytics'
import Router from 'vue-router'
import Meta from 'vue-meta'

// import bus from '../utils/bus.js'
// import { store } from '../store/index.js'

// Routes
import paths from './paths'

var VueCookie = require('vue-cookie')
Vue.use(VueCookie)

function route (path, view, name) {
  return {
    name: name || view,
    path,
    component: (resolve) => import(
      `@/views/${view}.vue`
    ).then(resolve),
    beforeEnter: (to, from, next) => {
      console.log(to)
      console.log(from)
      console.log(next)
      console.log(VueCookie.get('em_cdn_uid'))
      console.log(VueCookie.get('JSESSIONID'))
    }
  }
}

Vue.use(Router)

// Create a new router
const router = new Router({
  mode: 'history',
  routes: paths.map(path => route(path.path, path.view, path.name)).concat([
    { path: '*', redirect: '/' }
  ]),
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return { selector: to.hash }
    }
    return { x: 0, y: 0 }
  }
})

Vue.use(Meta)

// Bootstrap Analytics
// Set in .env
// https://github.com/MatteoGabriele/vue-analytics
if (process.env.GOOGLE_ANALYTICS) {
  Vue.use(VueAnalytics, {
    id: process.env.GOOGLE_ANALYTICS,
    router,
    autoTracking: {
      page: process.env.NODE_ENV !== 'development'
    }
  })
}

export default router
