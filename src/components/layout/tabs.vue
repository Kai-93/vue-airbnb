<template>
  <div class='container'>
    <el-tabs v-model="editableTabsValue"
             type="card"
             @edit="handleTabsEdit">
      <el-tab-pane :key="item.name"
                   v-for="item in editableTabs"
                   :label="item.title"
                   :name="item.name"
                   :closable="item.closable">
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  name: 'tabs',
  data() {
    return {
      editableTabsValue: '2',
      editableTabs: [{
        title: '首页',
        name: '1',
        content: 'Tab 1 content',
        closable: false,
      }, {
        title: 'Tab 2',
        name: '2',
        content: 'Tab 2 content',
        closable: true,
      }],
      tabIndex: 2,
    };
  },
  methods: {
    handleTabsEdit(targetName, action) {
      if (action === 'remove') {
        const tabs = this.editableTabs;
        let activeName = this.editableTabsValue;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              const nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }

        this.editableTabsValue = activeName;
        this.editableTabs = tabs.filter(tab => tab.name !== targetName);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
