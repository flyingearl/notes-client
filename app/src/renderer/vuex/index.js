import Vue from 'vue'
import Vuex from 'vuex'
import auth from '../app/auth/vuex'
import notes from '../app/notes/vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        auth,
        notes
    }
})