import Vue from 'vue'
import App from './App.vue'
import vScrollmagic from './components'
Vue.config.productionTip = false
Vue.use(vScrollmagic, { tween: true })
new Vue({
    render: h => h(App)
}).$mount('#app')
