import SvgIcon from './SvgIcon/index.vue'
import Pagination from './Pagination/index.vue'
import Category from './Category/index.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 全局对象
const allgloablComponent: any = { SvgIcon, Pagination, Category };

// 对外暴露插件对象
export default {
    // 无比叫做install方法
    install(app: any) {
        Object.keys(allgloablComponent).forEach(key => {
            app.component(key, allgloablComponent[key]);
        });
        for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
            app.component(key, component)
        }
    }

}