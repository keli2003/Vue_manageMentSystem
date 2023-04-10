import Vue from 'vue'
import Vuex from 'vuex'
import Tab from './tab'
Vue.use(Vuex)

// 创建Vuex实例对象
export default new Vuex.Store({
    // ...
    modules: {
        Tab
    }
})