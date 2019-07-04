<template>
  <el-container>
    <el-aside width="auto">
      <NavMenu class="side"></NavMenu>
    </el-aside>
    <el-container>
      <el-header height="auto">
        <div class="header">
          <hamburger></hamburger>
          <breadcrumb></breadcrumb>
        </div>
        <tabs></tabs>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import hamburger from '@/components/layout/hamburger';
import breadcrumb from '@/components/layout/breadcrumb';
import tabs from '@/components/layout/tabs';
import NavMenu from '@/components/layout/NavMenu';

export default {
  name: 'layout',
  data() {
    return {};
  },
  components: {
    NavMenu,
    breadcrumb,
    hamburger,
    tabs,
  },
  methods: {
  },
};
</script>
<style lang="scss" scoped>
.header {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
  margin: 15px 0;
}
.el-header {
  padding: 0;
}
</style>
