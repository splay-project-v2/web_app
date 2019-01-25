import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import VeeValidate from 'vee-validate';
import router from './router'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(VeeValidate, {
  // important to name this something other than 'fields'
  // Otherwise conflict with bootstrap-vue 
  // https://bootstrap-vue.netlify.com/docs/reference/validation/
  fieldsBagName: 'veeFields',
})

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')