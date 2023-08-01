<template>
    <!-- 测试SVG图标的使用 -->
    <!-- svg:图片外层容器，内部需要与use标签结合使用 -->
    <svg :style="{width,height}">
      <!-- xlink: herf执行用的哪一个图标 -->
      <use :href="prefix + name" :fill="color"></use>
    </svg>
</template>

<script setup lang="ts">
//接受父组件传递过来的参数
defineProps({
    //xlink:href属性值前缀
    prefix: {
        type: String,
        default: '#icon-'
    },
    //提供使用的图标名字
    name: String,
    //接受父组件传递颜色
    color: {
        type: String,
        default: ''
    },
    //接受父组件传递过来的图标的宽度
    width: {
        type: String,
        default: '50px'
    },
    //接受父组件传递过来的图标的高度
    height: {
        type: String,
        default: '50px'
    }
})
</script>

<style scoped>

</style>