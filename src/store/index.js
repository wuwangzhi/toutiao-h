// import json from 'formidable/src/plugins/json'
// import { JSON } from 'mysql/lib/protocol/constants/types'
import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '../utils/storage'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        // user: null
        user: getItem('tokens')
    },
    mutations: {
        setUser(state, data) {
            state.user = data
            setItem('tokens', data)
        }
    }
})
export default store