<template>
  <el-menu
    default-active="1-4-1"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <h3>{{ isCollapse ? "后台" : "后台管理系统" }}</h3>
    <el-menu-item
      @click="clickMenu(item)"
      v-for="item in noChildren"
      :key="item.name"
      :index="item.name"
    >
      <i :class="`el-icon-${item.icon}`"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>
    <el-submenu
      v-for="item in hasChildren"
      :key="item.label"
      :index="item.label"
    >
      <template slot="title">
        <i :class="`el-icon-${item.icon}`"></i>
        <span slot="title">{{ item.label }}</span>
      </template>

      <el-menu-item-group v-for="subItem in item.children" :key="subItem.name">
        <el-menu-item @click="clickMenu(subItem)" :index="subItem.name">{{
          subItem.label
        }}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

 <script>
export default {
  name: "CommonAside",
  data() {
    return {
      menuData: [
        {
          path: "/",
          name: "home",
          label: "首页",
          icon: "s-home",
          url: "Home/Home",
        },
        {
          path: "/mall",
          name: "mall",
          label: "商品管理",
          icon: "video-play",
          url: "MallManage/MallManage",
        },
        {
          path: "/user",
          name: "user",
          label: "用户登录",
          icon: "user",
          url: "UserManage/UserManage",
        },
        {
          label: "其他",
          icon: "location",
          children: [
            {
              path: "/page1",
              name: "page1",
              label: "页面1",
              icon: "setting",
              url: "Other/pageOne",
            },
            {
              path: "/page2",
              name: "page2",
              label: "页面2",
              icon: "setting",
              url: "Other/pageTwo",
            },
          ],
        },
      ],
    };
  },

  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    // 菜单点击事件
    clickMenu(item) {
      // console.log(item);
      // 当页面的路由与跳转的路由不一致的时候允许跳转
      if (
        this.$route.path !== item.path &&
        !(this.$route.path === "/home" && item.path === "/")
      )
        this.$router.push(item.path);
      //第一种方法排除vue-router在编程式导航连续点击进行路由跳转的时候，就会在控制台抛出 Uncaught (in promise) NavigationDuplicated 错误信息
      //第二种方法是在router管理的index.js文件中重写replace和push方法
      // this.$router.push(item.path).catch((err) => {
      //   return err;
      // });
      // route表示当前页面的路由，router表示当期页面的路由实例

      this.$store.commit("selectMenu", item);
    },
  },
  computed: {
    // 1.存在子菜单
    hasChildren() {
      return this.menuData.filter((item) => item.children);
    },
    // 2.不存在子菜单
    noChildren() {
      return this.menuData.filter((item) => !item.children);
    },
    isCollapse() {
      return this.$store.state.Tab.isCollapse;
    },
  },
};
</script>
 <style lang ="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 780px;
}
.el-menu {
  height: 100vh;
  border: none;
  h3 {
    color: #fff;
    text-align: center;
    line-height: 48px;
  }
}
</style>