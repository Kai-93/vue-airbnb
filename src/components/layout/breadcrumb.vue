<template>
  <el-breadcrumb v-if="breadcrumbs.length"
                 class="breadcrumb"
                 separator="/">
    <el-breadcrumb-item v-for="(item,index) in breadcrumbs"
                        :key="index"
                        :to="{ path: item.path || '/' }">{{item.meta.name}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script>
export default {
  name: 'name',
  data() {
    return {
      breadcrumbs: [],
    };
  },
  watch: {
    $route(route) {
      this.setBreadcrums(route);
    },
  },
  mounted() {
    this.setBreadcrums(this.$route);
  },
  methods: {
    setBreadcrums(route) {
      this.breadcrumbs = route.matched.filter(item => item.meta && item.meta.name);
    },
  },
};
</script>
<style lang="scss" scoped>
.breadcrumb {
  display: inline-block;
}
</style>
