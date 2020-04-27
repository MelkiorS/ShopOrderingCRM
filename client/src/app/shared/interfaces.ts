export interface User {
  nickname: string
  password: string
}
export interface Overview {
  orders: OverviewItem
  gain: OverviewItem
}

export interface OverviewItem {
  percent: number
  compare: number
  yesterday: number
  isHigher: boolean
}

