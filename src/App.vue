<template>
  <div>
    <h1>我是App</h1>
    <el-button type="primary" size="default" :icon="Plus">主要按钮</el-button>
    <el-button type="success" size="default" :icon="Edit">主要按钮</el-button>
    <el-button type="danger" size="default" :icon="Delete"></el-button>
    <h1>SVG测试</h1>
    <!-- 测试SVG图标的使用 -->
    <!-- svg:图片外层容器，内部需要与use标签结合使用 -->
    <svg>
      <!-- xlink: herf执行用的哪一个图标 -->
      <use href="#icon-computer"></use>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { Plus, Edit, Delete } from '@element-plus/icons-vue'
</script>

<style scoped>

</style>