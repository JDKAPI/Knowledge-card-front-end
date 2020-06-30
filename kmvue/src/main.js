// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//import { Button, Select } from 'element-ui';
//Vue.use(Button)
//Vue.use(Select)
// 设置反向代理，前端请求默认发送到 http://localhost:8443/api
var axios = require('axios')
axios.defaults.baseURL = 'http://localhost:8443/api'
// 全局注册，之后可在其他组件中通过 this.$axios 发送数据
Vue.prototype.$axios = axios
Vue.config.productionTip = false
/* eslint-disable no-new */
Vue.use(ElementUI);
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'

}),
Vue.prototype.format = function (te){
  if(te == ''){
    return '';
  }else if(te.length == 10){
    var time = new Date(te * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var y = time.getFullYear();
    var m = time.getMonth() < 9 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1;
    var d = time.getDate() < 10 ? '0' + time.getDate() : time.getDate();
    var h = time.getHours() < 10 ? '0' + time.getHours() : time.getHours();
    var mm = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes();
    var s = time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds();
    var timedate = y + '-' + m + '-' + d + ' ' + h + ':' + mm + ':' + s;
    return timedate;
  }else{
    var time = new Date(te);
    var y = time.getFullYear();
    var m = time.getMonth() < 9 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1;
    var d = time.getDate() < 10 ? '0' + time.getDate() : time.getDate();
    var h = time.getHours() < 10 ? '0' + time.getHours() : time.getHours();
    var mm = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes();
    var s = time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds();
    var timedate = y + '-' + m + '-' + d + ' ' + h + ':' + mm + ':' + s;
    return timedate;
  }
}
