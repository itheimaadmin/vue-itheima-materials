export const defaultSkuData: ISkuEntity = {
  skuId: 0,
  skuName: '',
  skuImage: '',
  price: 0,
  realPrice: 0,
  classId: '',
  unit: '',
  discount: false
}

/**
 * 商品
 */
export interface ISkuEntity {
  skuId: number
  skuName: string
  skuImage: string
  price: number
  realPrice: number
  classId: string
  unit: string
  skuClass?: ISkuClassEntity
  discount: boolean
  ctime?: string
  utime?: string
}

/**
 * 商品类别
 */
export interface ISkuClassEntity {
  classId: number
  className: string
  parentId: number
}
