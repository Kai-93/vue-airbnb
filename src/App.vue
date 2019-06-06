<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view />
  </div>
</template>

<script>
import { md5 } from '@/utils/crypto';
import { postLogin } from './api/user/api_login';
import greeter from './utils/test.ts';

export default {
  name: 'App',
  created() {
    postLogin({
      params: {
        userName: 'Kaiser',
        password: md5('password'),
      },
    });
    greeter('Kaiser');
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
