import router from './router'
import store from './vuex'
import localforage from 'localforage'

localforage.config({
    storeName: 'notesapp'
})

require('./bootstrap')

Vue.use(Electron)
Vue.config.debug = true

import App from './App.vue'

Vue.component('navigation', require('./components/Navigation.vue'))

store.dispatch('auth/setToken').then(() => {
    store.dispatch('auth/fetchUser').catch(() => {
        store.dispatch('auth/clearAuth')
        router.replace({ name: 'login' })
    })
}).catch(() => {
    store.dispatch('auth/clearAuth')
})

new Vue({
    router,
    store,
    ...App
}).$mount('#app')