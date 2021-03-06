import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible'
import Vant from 'vant'
import 'vant/lib/index.css'
import './styles/index.less'
import './utils/date'

Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
    store,
    router,
    render: h => h(App),
}).$mount('#app')