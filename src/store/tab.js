import router from "@/router"
import Cookie from "js-cookie"
export default {
    name: 'Tab',
    state: {
        isCollapse: false, // 用于控制菜单的展开 
        tabsList: [
            {
                path: '/',
                name: 'home',
                label: '首页',
                icon: 's-home',
                url: 'Home/Home'
            },
        ],// 面包屑的数据
        menu: []
    },
    mutations: {
        //修改菜单展开的方法
        collapseMenu(state) {
            state.isCollapse = !state.isCollapse
        },
        // 更新面包屑数据
        selectMenu(state, val) {
            console.log(val, 'val')
            //判断添加的数据是否为首页
            if (val.name !== 'home') {
                const index = state.tabsList.findIndex(item => item.name === val.name)
                //如果不存在
                if (index === -1) {
                    state.tabsList.push(val)
                }
            }
        },
        // 点击tag删除键删除当前的数据
        closeTag(state, item) {
            // console.log('调用成功', item);
            const index = state.tabsList.findIndex(val => val.name == item.name)
            state.tabsList.splice(index, 1)
        },

        // 设置Menu的数据
        setMenu(state, val) {
            state.menu = val
            Cookie.set('menu', JSON.stringify(val))
        },
        // 动态注册路由
        addMenu(state, val) {
            // 缓存中是否存在数据
            if (!Cookie.get('menu')) return
            const menu = JSON.parse(Cookie.get('menu'))
            state.menu = menu
            // 组装动态路由的数据
            const menuArray = []
            menu.forEach(item => {
                // 判断是否有子菜单
                if (item.children) {
                    item.children = item.children.map(item => {
                        item.component = () => import(`../Views/${item.url}`)
                        return item
                    })
                    menuArray.push(...item.children)
                } else {
                    item.component = () => import(`../Views/${item.url}`)
                    menuArray.push(item)
                }
            });
            console.log(menuArray, 'menuArray');
            // 路由的动态添加
            menuArray.forEach(item => {
                router.addRoute('Main', item)
            })
        }
    }
}