import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter)

// 1.创建并引入路由组件
import Home from '../Views/Home.vue'
import User from '../Views/User.vue'
import Main from '../Views/Main.vue'
import Mall from '../Views/Mall.vue'
import PageOne from '../Views/PageOne.vue'
import PageTwo from '../Views/PageTwo.vue'
import login from '../Views/Login.vue'


// 2.将路由与组件进行映射
const routes = [
    // 主路由
    // 主页下面的内容
    {
        path: '/', component: Main,
        redirect: '/home',   //重定向
        children: [
            // 子路由
            { path: 'home', name: 'home', component: Home, }, //首页
            { path: 'user', name: 'user', component: User }, //用户管理
            { path: 'mall', name: 'mall', component: Mall }, //商品管理
            { path: 'page1', name: 'page1', component: PageOne },  //页面1
            { path: 'page2', name: 'page2', component: PageTwo } // 页面2
        ]
    },
    // 与之对应的是同级路由Login登录页面
    {
        path: '/login',
        name: 'login',
        component: login
    }


]

// 创建router实例
export default new VueRouter({
    routes
})

// 重写 push 和 replace 方法，只需要在 router 文件夹下的 index.js 文件里面加入如下代码即可。（我项目上也是使用这种方法）
// const originalPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push(location) {
//     return originalPush.call(this, location).catch(err => err)
// }

// const originalReplace = VueRouter.prototype.replace
// VueRouter.prototype.replace = function replace(location) {
//     return originalReplace.call(this, location).catch(err => err)
// }
