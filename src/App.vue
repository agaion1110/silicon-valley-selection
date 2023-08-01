<template>
  <div>
    <h1>测试axios的二次封装</h1>
    
  </div>
</template>

<script setup lang="ts">
import request from '@/utils/request'
import { onMounted } from 'vue';

// 当组件挂载完毕测试发一个请求
onMounted(() => {
  request({
    url: 'user/login',
    method: 'POST',
    data: {
      username: 'admin',
      password: '111111'
    }
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