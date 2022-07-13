<template>
  <div>
    <!-- 一级路由的出口 -->
    <router-view></router-view>
  </div>
</template>

<script>
//axios 默认配置
import request from '@/utils/request'

export default {
  data() {
    return {}
  },
  methods: {},
  created() {
    console.dir(request)
  }
}
</script>

<style>
.login {
  width: 694px;
  height: 88px;
  background-color: #6db4fb;
  border-radius: 10px;
}
</style>
