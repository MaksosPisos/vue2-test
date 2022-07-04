import Vue from 'vue'
import VueDragResize from 'vue-drag-resize'
import App from './App.vue'
import './style.css'

Vue.config.productionTip = false
Vue.component('vue-drag-resize', VueDragResize)
new Vue({
  render: h => h(App),
}).$mount('#app')
