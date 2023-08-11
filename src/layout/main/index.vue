<template>
    <router-view v-slot="{ Component }">
        <transition name="fade">
            <!-- 渲染layout一级路由组件的子路由 -->
            <component :is="Component" v-if="flag"  />
        </transition>
    </router-view>
</template>
<script setup lang="ts">
import useLayOutSettingStore from '@/store/modules/setting';
import { ref, watch, nextTick } from 'vue'
let LayOutSettingStore = useLayOutSettingStore();
let flag = ref(true)
// 监听仓库内部数据是否发生变化
watch(() => LayOutSettingStore.refsh, async () => {
    console.log('我得刷新一下');
    // await nextTick()
    flag.value = false
    nextTick(() => {
        flag.value = true
    })
    
})
</script>

<script lang="ts">
export default {
    name: 'Main'
}
</script>

<style scoped>
.fade-enter-from {
    opacity: 0;
    transform: scale(0);
}
.fade-enter-active{
    transition: all .3s;
}
.fade-enter-to {
    opacity: 1;
    transform: scale(1);
}
</style>