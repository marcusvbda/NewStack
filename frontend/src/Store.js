import Vue from 'vue'
import Vuex from 'vuex'
const Cookies = require("./helpers/Cookies").default

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
            let lang = Cookies.get('lang')
            if(lang)
                state.language = lang
            return state.language
        }
    },
    mutations: {
        language(state,language) {
            state.language = language
            Cookies.set("lang",language)
        },
        login(state,user) {
            state.auth.user = user
            Cookies.set("auth",JSON.stringify({user:user}),30)
        },
        logout(state) {
            state.auth.user = {}
            Cookies.remove('auth')
        }
    }
    
})