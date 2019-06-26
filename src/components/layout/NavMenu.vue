<template>
  <div class='container clearfix'>
    <el-menu default-active="1-4-1"
             class="nav-menu"
             :router="true"
             :collapse="isCollapse">
      <el-menu-item index="/">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">商品</span>
        </template>
        <el-menu-item-group>
          <span slot="title">商品管理</span>
          <el-menu-item index="/goods_list">商品列表</el-menu-item>
          <el-menu-item index="/goods_detail">商品详情</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <span slot="title">选项4</span>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="2"
                    disabled>
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
export default {
  name: 'nav_menu',
  data() {
    return {
    };
  },
  computed: {
    isCollapse() {
      return this.$store.state.ui.bIsNavMenuCollapse;
    },
  },
  created() { console.log(this.$store.state.ui.bIsNavMenuCollapse); },
  methods: {
  },
};
</script>
<style lang="scss" scoped>
.nav-menu {
  height: 100vh;
}
.nav-menu:not(.el-menu--collapse) {
  width: 200px;
}
</style>
