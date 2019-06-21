<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view />
  </div>
</template>

<script>
// import test from '@/utils/test';
import user from '@/api/user/api_login';

export default {
  name: 'App',
  created() {
    user.postLogin({
      userName: 'Kaiser',
      password: 'password',
    });
    import('./utils/test').then(({ default: test }) => {
      test('v1.0.0');
    });
    // test('Kaiser');
    console.log(process.env);
  },
};
</script>

<style lang="scss" scoped>
// @import "./style/theme";
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $color;
  margin-top: 160px;
}
</style>
