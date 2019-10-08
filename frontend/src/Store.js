import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        auth: {
            user : {}
        },
        language : "EN"
    },
    getters: {
        auth(state) {
            return state.auth
        },
        language(state) {
            let lang = localStorage.getItem('language')
            if(lang)
                state.language = lang
            return state.language
        }
    },
    mutations: {
        language(state,language) {
            state.language = language
            localStorage.setItem('language',language)
        },
        login(state,user) {
            state.auth.user = user
            localStorage.setItem('Auth',JSON.stringify({user:user}))
        },
        logout(state) {
            state.auth.user = {}
            localStorage.removeItem('Auth')
        }
    }
    
})