/**
 * 工单状态
 */
export interface ITaskStatusTypeEntity {
  statusId: number
  statusName: string
}

/**
 * 工单类型
 */
export interface ITaskTypeEntity {
  typeId: number
  typeName: string
}

/**
 * 工单
 */
export interface ITaskEntity {
  taskId: number
  taskName: string
  taskStatus: number
  createType: number
  innerCode: string
  userId: number
  userName: string
  desc: string
  ctime: string
  utime: string
  productTypeId: number
  expect: string
  assignorId: number
  taskStatusTypeEntity: ITaskStatusTypeEntity
  taskType: ITaskTypeEntity
}

/**
 * 工单新增
 */
export interface ITaskViewModel {
  taskName: string
  createType: number
  innerCode: string
  userId: number
  assignorId: number
  productType: number
  desc: string
  expect: string
  details?: ITaskDetailsViewModel[]
}

/**
 * 补货工单
 */
export interface ITaskDetailsViewModel {
  channelCode: string
  expectCapacity: number
}

export const defaultTaskViewModel: ITaskViewModel = {
  taskName: '',
  createType: 1, // 创建类型 0：自动 1：手动，默认手动
  innerCode: '',
  userId: 0,
  assignorId: 0, // 指派人Id，默认0
  productType: 1, // 工单类型，默认1
  desc: '',
  expect: '',
  details: []
}
