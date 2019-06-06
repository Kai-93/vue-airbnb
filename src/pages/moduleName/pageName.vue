/*
 * @Author: Kaiser
 * @Date: 2019-06-05 15:22:55
 * @Last Modified by: Kaiser
 * @Last Modified time: 2019-06-06 15:58:44
 */

<template>
  <div class='container'>
    <p>typescript</p>
  </div>
</template>
<script lang="ts">
export default {
  name: 'name',
  data() {
    return {};
  },
  created() {
    function greeter(person: String) {
      window.console.log(`Hello, ${person}`);
    }
    greeter('Kaiser2');
  },
};
</script>
<style lang="scss" scoped>
</style>
