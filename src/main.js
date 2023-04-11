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

import Cookie from 'js-cookie'


// 添加全局路由守卫
router.beforeEach((to, from, next) => {
  // token存不存在？
  const token = Cookie.get('token')
  // token不存在，说明用户没有登录，应该跳转至登录页面
  if (!token && to.name !== 'login') {
    next({ name: 'login' })

  } else if (token && to.name === 'login') {
    // token存在，说明用户此时登录，应该跳转至首页
    next({ name: 'home' })
  } else {
    next()
  }
})
new Vue({
  // 挂载router
  router,
  store,
  created() {
    store.commit('addMenu', router)
  },
  render: h => h(App),
}).$mount('#app')
