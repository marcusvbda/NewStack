import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'NProgress'
import store from './Store'
import Auth from './middleware/auth'

Vue.use(VueRouter)

const routes = [
  { name: 'home', path: '/', component: require('./components/Home.vue')},

  { name: 'login', path: '/login', component: require('./components/Auth/Login.vue') },
  { name: 'recovery', path: '/recovery', component: require('./components/Auth/Recovery.vue') },
  { name: 'auth_account_confirm', path: '/account_confirm/:token', component: require('./components/Auth/AccountConfirm.vue') },
  { name: 'auth_account_recovery', path: '/account_recovery/:token', component: require('./components/Auth/RenewPassword.vue') },
  { name: 'signup', path: '/signup', component: require('./components/Auth/Signup.vue') },
  { name: 'use_terms', path: '/use_terms', component: require('./components/Auth/UseTerms.vue') },
  
  { name: 'admin', path: '/admin', component: require('./components/Admin/pages/Dashboard.vue') ,meta: {middleware: Auth}},
  { name: 'blank', path: '/admin/blank', component: require('./components/Admin/pages/PageBlank.vue') ,meta: {middleware: Auth}},
  { name: 'account', path: '/admin/account', component: require('./components/Admin/pages/Account.vue') ,meta: {middleware: Auth}},

  { name: '404', path: '*' , component: require('./components/Global/Errors/NotFound.vue') },
]

Vue.config.productionTip = false
const router = new VueRouter({
  mode: 'history',
  store,
  routes
})

router.beforeResolve((to, from, next) => {
  if (to.name)  NProgress.start()
  next()
})

router.afterEach((to, from) => {
  NProgress.done()
})

router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) return next()
  return to.meta.middleware(to,from,next,store)
})

export default router