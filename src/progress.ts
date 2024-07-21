import type { MultiProgressOptions, ProgressOptions } from './types'

const defaultDistance = 5000

const defaultProgressOptions: Required<ProgressOptions> = {
  initProgress: 0,
  endProgress: 1,
  distance: defaultDistance,
}

const defaultMultiProgressOptions: Required<MultiProgressOptions> = {
  initProgress: 0,
  steps: [{
    distance: defaultDistance,
    subProgress: 0.5,
  }, {
    distance: defaultDistance,
    subProgress: 1,
  }],
}

/**
 * p = 1 - e^(-t/d)
 */
function calculateProgress(currentTime: number, distance: number, initProgress: number, endProgress: number) {
  // return 1 - Math.exp(-currentTime / distance)
  return initProgress + (endProgress - initProgress) * (1 - Math.exp(-currentTime / distance))
}

export class Progress {
  /** Progress value at the beginning */
  public initProgress: number
  /** Progress value at the end */
  public endProgress: number
  /** Current progress value */
  public progress: number
  /** Indicates if the progress is running */
  public isRunning: boolean

  private distance: number
  private currentTime: number
  private timer: NodeJS.Timeout | undefined
  private interval: number = 100

  constructor(options: ProgressOptions) {
    const { initProgress, endProgress, distance } = { ...defaultProgressOptions, ...options }
    this.initProgress = initProgress
    this.endProgress = endProgress
    this.progress = initProgress
    this.distance = distance
    this.currentTime = 0
    this.isRunning = false
  }

  /** Start the progress */
  public start() {
    if (this.isRunning)
      return
    this.isRunning = true
    this.currentTime = 0
    this.timer = setInterval(() => {
      this.currentTime += this.interval
      this.progress = calculateProgress(this.currentTime, this.distance, this.initProgress, this.endProgress)
    }, this.interval)
  }

  /** End the progress */
  public end() {
    clearInterval(this.timer)
    this.timer = undefined
    this.progress = this.endProgress
    this.isRunning = false
  }
}

export class MultistepProgress {
  /** Progress value at the beginning */
  public initProgress: number
  /** Progress value at the end */
  public endProgress: number

  private steps: {
    subProgress: number
    distance: number
  }[]

  private progressList: Progress[]
  private currentProgressIndex: number = 0

  constructor(options: MultiProgressOptions) {
    const { initProgress, steps } = { ...defaultMultiProgressOptions, ...options }
    this.initProgress = initProgress
    this.steps = steps.sort((a, b) => a.subProgress - b.subProgress)
      .map(step => ({ subProgress: step.subProgress, distance: step.distance || defaultDistance }))
    this.endProgress = this.steps[this.steps.length - 1].subProgress

    let prevProgress = initProgress
    this.progressList = this.steps.map((step) => {
      const progress = new Progress({
        initProgress: prevProgress,
        endProgress: step.subProgress,
        distance: step.distance,
      })
      prevProgress = step.subProgress
      return progress
    })
  }

  /** Current progress value */
  get progress() {
    if (this.currentProgressIndex >= this.progressList.length) {
      return this.endProgress
    }
    else {
      return this.progressList[this.currentProgressIndex].progress
    }
  }

  /** Indicates if the progress is running */
  get isRunning() {
    if (!this.validate())
      return false
    return this.progressList[this.currentProgressIndex].isRunning
  }

  /** Start the progress */
  public start() {
    if (!this.validate())
      return
    this.progressList[this.currentProgressIndex].start()
  }

  /** Stop the progress in the next step */
  public next() {
    if (!this.validate())
      return
    // if (!this.progressList[this.currentProgressIndex].isStarted)
    //   return

    this.progressList[this.currentProgressIndex].end()
    this.currentProgressIndex++
  }

  /** End the progress */
  public end() {
    if (!this.validate())
      return

    this.progressList[this.currentProgressIndex].end()
    this.progressList[this.progressList.length - 1].end()
    this.currentProgressIndex = this.progressList.length
  }

  private validate() {
    return this.currentProgressIndex < this.progressList.length
  }
}
