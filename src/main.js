import Vue from 'vue'
import App from './App.vue'

// 引入element-ui
import ElementUI from 'element-ui';
// 按需引入
// import { Row, Button } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 使用element-ui
// 全局引入
Vue.use(ElementUI)
// 按需引入
// Vue.use(Row)
// Vue.use(Button)

// 引入router
import router from './router'

// 引入store
import store from './store'

Vue.config.productionTip = false

// 引入mock
import './api/mock'
// 将body中的margin去掉
document.body.style.margin = "0"
new Vue({
  // 挂载router
  router,
  store,
  render: h => h(App),
}).$mount('#app')
