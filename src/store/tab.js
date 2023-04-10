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
        ] // 面包屑的数据
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
        }
    }
}