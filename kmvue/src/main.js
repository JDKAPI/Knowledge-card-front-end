import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import store from './store'
// 设置反向代理，前端请求默认发送到 http://localhost:8443/api http://101.200.41.187:80/api
var axios = require('axios')
axios.defaults.baseURL = 'http://101.200.41.187:80/api'
// 全局注册，之后可在其他组件中通过 this.$axios 发送数据
Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.use(ElementUI);

router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {
      if (store.state.userId) {
        next()
        console.log('zheshi1hao')
      } else {
        next({
          path: 'login',
          query: {redirect: to.fullPath}
        })
        console.log('zhehsi2hao')
      }
    } else {
      next()
    }
  }
)


new Vue({
  el: '#app',
  render: h => h(App),
  router,
  // 注意这里
  store,
  components: { App },
  template: '<App/>'
})
