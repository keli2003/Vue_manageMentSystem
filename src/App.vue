<template>
  <div id="app">
    <!-- <el-row>
      <el-button plain>朴素按钮</el-button>
      <el-button type="primary" plain>主要按钮</el-button>
      <el-button type="success" plain>成功按钮</el-button>
      <el-button type="info" plain>信息按钮</el-button>
      <el-button type="warning" plain>警告按钮</el-button>
      <el-button type="danger" plain>危险按钮</el-button>
    </el-row> -->
    <!-- 路由出口 -->
    <!-- 路由匹配的组件将会渲染到这里 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang="less" scoped>
html,
body,
h3,
p {
  margin: 0;
  padding: 0;
  font-size: 16px;
  font-weight: 400;
}
</style>


