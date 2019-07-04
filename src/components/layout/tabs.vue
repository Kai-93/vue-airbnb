<template>
  <div class='container'>
    <el-tag v-for="(tab,index) in tabs"
            :ref="'tag'+index"
            :key="index"
            :closable="tab.closable"
            :disable-transitions="false"
            :class="{'active':isActive(tab)}"
            @click="openPage(tab)"
            @close="removeCurrentTab(tab)">
      {{tab.meta.name}}
    </el-tag>
  </div>
</template>
<script>
export default {
  name: 'tabs',
  data() {
    return {
    };
  },
  computed: {
    tabs() {
      return this.$store.getters['ui/tabs'];
    },
  },
  watch: {
    $route() {
      this.addTab(this.$route);
    },
  },
  methods: {
    /**
     * 是否是当前显示标签
     * @param {Number} index - 遍历标签的对象
     */
    isActive(route) {
      return route.name === this.$route.name;
    },
    /**
     * 增加标签
     * @param {Object} route - 新增路由对象
     */
    addTab(route) {
      this.$store.dispatch('ui/addTab', route);
    },
    /**
     * 移出标签
     * 移除后判断是否是当前页面，是-跳转到最后一个标签，否-不做特殊处理
     * @param {Object} tab - 关闭的标签对象
     */
    removeCurrentTab(route) {
      const vm = this;
      this.$store.dispatch('ui/removeCurrentTab', route).then((deletedRoute) => {
        if (deletedRoute.name === vm.$route.name) {
          const length = vm.tabs.length;
          vm.openPage(vm.tabs[length - 1]);
        }
      });
    },
    /**
     * 打开标签页
     * @param {Object} tab - 关闭的标签对象
     */
    openPage(tab) {
      this.$router.push(tab.fullPath);
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  padding-left: 15px;
  width: 100%;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
.active {
  background: #fff;
}
</style>
