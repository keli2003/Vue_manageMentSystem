<template>
  <div class="tabs">
    <el-tag
      size="small"
      v-for="(item, index) in tags"
      :key="item.path"
      :closable="item.name !== 'home'"
      :effect="$route.name === item.name ? 'dark' : 'plain'"
      @click="changeMenu(item)"
      @close="handleClose(item, index)"
    >
      {{ item.label }}
    </el-tag>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "CommonTag",
  data() {
    return {};
  },
  computed: {
    ...mapState({
      tags: (state) => state.Tab.tabsList,
    }),
  },
  methods: {
    // 使用mapMutations将里面的数据添加到当前页面中
    ...mapMutations(["closeTag"]),
    // 点击tag实现跳转的功能
    changeMenu(item) {
      //   console.log(item);
      //根据对象的形式，跳转到对应的属性
      this.$router.push({ name: item.name });
    },
    // 点击tag实现删除的功能
    handleClose(item, index) {
      // 获取当前的长度
      const length = this.tags.length - 1;
      //   调用store中的Mutation
      this.closeTag(item);

      //   删除之后的跳转逻辑
      if (item.name !== this.$route.name) {
        return;
      }
      //   表示的是删除的最后一项
      if (index === length) {
        this.$router.push({
          name: this.tags[index - 1].name,
        });
      } else {
        this.$router.push({
          name: this.tags[index].name,
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.tabs {
  padding: 20px;
  .el-tag {
    margin-right: 15px;
    cursor: pointer;
  }
}
</style>