export interface ProgressOptions {
  initProgress?: number
  endProgress?: number
  distance?: number
}

export interface MultiProgressOptions {
  initProgress?: number
  steps?: {
    subProgress: number
    distance?: number
  }[]
}
