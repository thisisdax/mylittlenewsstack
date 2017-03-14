// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import VueClipboards from 'vue-clipboards'
import App from './App'
import Register from './components/Register'
import Login from './components/Login'
import News from './components/News'
import Pocket from './components/Pocket'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'

Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(VueMaterial)
Vue.use(VueClipboards)

Vue.http.interceptors.push(function (request, next) {
  console.log('interceptors!')
  request.headers.set('Authorization', window.localStorage.token)
  next()
})

export const bus = new Vue()

const routes = [
  {path: '/', component: Login},
  {path: '/news', component: News},
  {path: '/register', component: Register},
  {path: '/pocket', component: Pocket}
]

const router = new VueRouter({
  mode: 'history',
  routes
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  data: {},
  template: '<App/>',
  components: { App }
})
