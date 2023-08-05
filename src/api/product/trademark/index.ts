// 品牌管理接口
import request from "@/utils/request";
import { TradeMarkResponseData, TradeMark } from './type'
// 品牌管理模块接口
enum API {
    // 获取已有品牌接口
    TRADEMARK_URL = "/admin/product/baseTrademark/",
    //添加品牌
    ADDTRADEMARK_URL = '/admin/product/baseTrademark/save',
    //修改已有品牌
    UPDATETRADEMARK_URL = '/admin/product/baseTrademark/update',
    //删除已有品牌
    DELETE_URL = '/admin/product/baseTrademark/remove/',
}

// 获取已有品牌接口方法
export const reqHasTrademark = (page: number, limit: number) => request.get<any, TradeMarkResponseData>(API.TRADEMARK_URL + `${page}/${limit}`)

// 增加和修改已有品牌的
export const reqAddOrUpdateTrademark = (data: TradeMark) => {
    if (data.id) {
        // 如果传入的data有id则说明是修改品牌数据
        return request.put<any, any>(API.UPDATETRADEMARK_URL, data)
    } else {
        // 如果传入的data没有id说明是添加新的品牌
        return request.post<any, any>(API.ADDTRADEMARK_URL, data);
    }
}

//删除某一个已有品牌的数据
export const reqDeleteTrademark = (id:number)=>request.delete<any,any>(API.DELETE_URL+`${id}`)