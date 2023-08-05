// 返回数据的基本类型
export interface ResponseData {
    code: number
    message: string
    ok: boolean
}
  

// 每一个品牌的ts数据类型
export interface TradeMark {
    id?: number
    tmName: string
    logoUrl: string
  }
  
  //所有的品牌
  export type Records = TradeMark[]
  
  //获取的已有全部品牌的数据ts类型
  export interface TradeMarkResponseData extends ResponseData {
    data: {
      records: Records
      total: number
      size: number
      current: number
      searchCount: boolean
      pages: number
    }
  }
  