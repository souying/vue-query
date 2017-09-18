// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App'
import '../src/assets/css/reset.css'
import Rem from '../src/assets/js/rem.min.js'

new Rem({
	desinWidth:750, //750这个值，根据设计师的psd宽度来修改，是多少就写多少，插件默认750 
	num:100         //100这个值，是1rem = 100px的比例 默认100比1的 可修改自己的比例 计算
})

Vue.config.productionTip = false
Vue.use(VueResource)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
