<template>
    <template v-for="(item, index) in menuList" :key="item.path">
        <!-- 没有子路由 -->
        <el-menu-item v-if="!item.children" :index="item.path">{{ item.meta.title }}</el-menu-item>
        <!-- 有子路由但只有一个子路由 -->
        <el-menu-item v-if="item.children && item.children.length == 1" :index="item.children[0].path">
            <template #title>
                <span>{{ item.children[0].meta.title }}</span>
            </template>
        </el-menu-item>
        <!-- 有子路由且个数大于1 -->
        <el-sub-menu v-if="item.children && item.children.length > 1" :index="item.path">
            <template #title>
                <span>{{ item.meta.title }}</span>
            </template>
            <Menu :menuList="item.children"></Menu>
        </el-sub-menu>
    </template>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
defineProps(['menuList'])
const List = reactive()
</script>
<script lang="ts">
export default {
    name: 'Menu'
}
</script>
<style lang="scss" scoped></style>