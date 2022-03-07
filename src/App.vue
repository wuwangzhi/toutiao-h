<template>
  <div id="app">
    <h1>黑马头条</h1>
    <i class="toutiao toutiao-shouye"></i>
    <router-link to="/login">去登录</router-link>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style scoped lang="less">
</style>