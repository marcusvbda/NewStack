export default function auth (to,from,next,store){
    if(!store.getters.auth.user._id) {
        let auth = JSON.parse(localStorage.getItem('Auth'))
        if(auth) {
            store.commit('login',auth.user)
            return next()
        }
        return next({
           name: 'login'
        })
    }
    return next()
}