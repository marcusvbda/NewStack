import Vue from 'vue'
import App from './App.vue'
import router from './Router'
import 'bootstrap' 
import ElementUi from 'element-ui'
import lang from 'element-ui/lib/locale/lang/pt-br'
import locale from 'element-ui/lib/locale'
import axios from 'axios'
import constants from '../constants'
const  Store = require("./Store")
import _lang from "./lang"

Vue.use(ElementUi)
Vue.use(lang)
Vue.use(locale)

Vue.prototype.$http = axios
Vue.prototype.$update_csrf = (callback = null) => {
  Vue.prototype.$http.defaults.withCredentials = true
  Vue.prototype.$http.get(`${constants.server_route}/template/getcsrftoken`,{withCredentials: true}).then(res=>{
    Vue.prototype.$http.defaults.headers.common['X-CSRF-TOKEN'] = res.data.csrfToken
    Vue.prototype.$http.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
    return callback ? callback() : null
  }).catch( er => {
    console.log(er)
  })
}

Vue.prototype.$store = Store.default
Vue.prototype.$lang = _lang
Vue.prototype.$constants = constants

new Vue({
  el: '#app',
  router,
  render: (h) => h(App),
  data() {
    return {
      sublinks : []
    }
  }
})