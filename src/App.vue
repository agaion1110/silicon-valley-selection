<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import {reqLogin} from '@/api/user/index'
import { onMounted } from 'vue';

// 当组件挂载完毕测试发一个请求
onMounted(() => {
  reqLogin({
    username: 'admin',
    password: '123456'
  }).then(res => {
    console.log(res)
  })
})
</script>

<style lang="scss" scoped>
h1 {
  color: $color;
}
</style>