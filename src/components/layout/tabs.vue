<template>
  <div class='container'>
    <el-tag v-for="(tag,index) in tags"
            :key="index"
            :closable="tag.closable"
            :disable-transitions="false"
            :class="isCurrentTag(index)"
            @click="openPage(tag)"
            @close="closeTag(tag)">
      {{tag.meta.name}}
    </el-tag>
  </div>
</template>
<script>
export default {
  name: 'tabs',
  data() {
    return {
      tags: [
        {
          meta: {
            name: '首页',
          },
          fullPath: '/?a=1',
          closable: false,
        },
        {
          meta: {
            name: '商品列表',
          },
          fullPath: '/goods_list?b=1',
          closable: true,
        },
      ],
      nCurrentTagIndex: 0,
    };
  },
  watch: {
    $route() {
      this.addTag(this.$route);
      this.removeCurrentTag(this.$route);
    },
  },
  methods: {
    /**
     * 是否是当前显示标签
     * @param {Number} index - 遍历标签的对象
     */
    isCurrentTag(index) {
      return index === this.currentTagIndex;
    },
    /**
     * 关系标签
     * @param {Object} tag - 关闭的标签对象
     */
    closeTag(tag) {
      console.log('closeTag: ', JSON.stringify(tag));
      this.tags.splice(this.tags.indexOf(tag), 1);
    },
    /**
     * 打开标签页
     * @param {Object} tag - 关闭的标签对象
     */
    openPage(tag) {
      this.$router.push(`${tag.fullPath}`);
    },
    /**
     * 增加标签
     * @param {Object} route - 新增路由对象
     */
    addTag(route) {
      this.$store.dispatch('ui/addTag', route);
    },
    /**
     * 移出标签
     */
    removeCurrentTag(index) {
      console.log(index);
      this.$store.dispatch('ui/removeCurrentTag', index);
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
</style>
