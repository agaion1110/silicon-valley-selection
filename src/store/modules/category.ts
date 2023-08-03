//商品分类全局组件的小仓库
import { defineStore } from 'pinia'
import type { CategoryState } from './types/type'
const useCategoryStore = defineStore('Category', {
  state: (): CategoryState => {
    return {
      //存储一级分类的数据
      // c1Arr: [],
      //存储一级分类的ID
      c1Id: '',
      //存储对应一级分类下二级分类的数据
      // c2Arr: [],
      //收集二级分类的ID
      c2Id: '',
      //存储三级分类的数据
      // c3Arr: [],
      //存储三级分类的ID
      c3Id: '',
    }
  },
  actions: {
    
  },
  getters: {},
})

export default useCategoryStore
