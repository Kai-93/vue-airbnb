<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view />
  </div>
</template>

<script>
import user from './api/user/api_login';

export default {
  name: 'App',
  created() {
    user.postLogin({
      userName: 'Kaiser',
      password: 'password',
    });
    import('./utils/test').then(({ default: test }) => {
      test('Kaiser');
    });
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
