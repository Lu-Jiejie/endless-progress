# endless-progress

[![npm version][npm-version-badge]][npm-version-href]
[![minzip][minzip-badge]][minzip-href]
[![jsdocs][jsdocs-badge]][jsdocs-href]
[![license][license-badge]][license-href]

<div style="font-family: monospace;">
    Endless Loading: <span style="display: inline-block; width: 400px; border: 1px solid #000; background: #aaa;">
        <span style="display: inline-block; width: 98%; background: #fff;">&nbsp;</span>
        <!-- <span style="display: inline-block; width: 0.01%; background: #111;">&nbsp;</span> -->
    </span> 99.9999999999...%
</div>

A simple endless progress number generator.

## Installation

```bash
npm install endless-progress
```

## Usage

```typescript
import { Progress } from 'endless-progress'

const p = new Progress({
  initProgress: 0,
  endProgress: 1,
  distance: 5000
})

// Start the progress
p.start()

// Get the progress number
console.log(p.progress)

// Stop the progress, make the progress to the end
p.end()
```

## API

### `Progress`

`Progress` is a basic class that can generate an endless progress from `initProgress` to `endProgress` by `distance` per interval.

+ `start()`: Start the progress.
+ `end()`: Stop the progress, make the progress to the end.
+ `progress`: Get the progress number.
+ `isRunning`: Check if the progress is running.

### `MultistepProgress`

`MultistepProgress` is a class that can generate an endless progress with multiple steps.

```typescript
import { MultistepProgress } from 'endless-progress'

const mp = new MultistepProgress({
  initProgress: 0,
  steps: [
    { subProgress: 0.5, distance: 5000 },
    { subProgress: 1, distance: 5000 }
  ]
})

// Start the progress
mp.start()

// Set the progress to the next step and pause
mp.next()

// Start the progress
mp.start()

// Stop the progress, make the progress to the end
mp.end()
```

+ `start()`: Start the progress.
+ `end()`: Stop the progress, make the progress to the end.
+ `next()`: Set the progress to the next step and pause.
+ `progress`: Get the progress number.
+ `isRunning`: Check if the progress is running.

> I recommend setting the `endProgress` to `1` to make the progress number in the range of `[0, 1]`.

## Tips

### How to use the progress number in the frontend framework?

For example, in [Vue](https://vuejs.org/), you can use `reactive` to package the progress number to make it reactive.

```typescript
import { reactive } from 'vue'
import { Progress } from 'endless-progress'

const p = reactive(new Progress({
  initProgress: 0,
  endProgress: 1,
  distance: 5000
}))

p.start()
```

Then you can use `p.progress` in the template.

```html
<el-progress :percentage="p.progress * 100" />
```

## How?

$$
P = P_{init} + (P_{end} - P_{init}) \cdot \left(1 - e^{-\frac{t}{d}}\right)
$$

Where:
- $P$ is the progress number at time $t$.
- $P_{init}$ is the initial progress number.
- $P_{end}$ is the end progress number.
- $d$ is the distance per interval.
- $t$ is the diff time from the start.

<!-- Badge -->
[npm-version-badge]: https://img.shields.io/npm/v/endless-progress?style=flat&color=ddd&labelColor=444
[npm-version-href]: https://www.npmjs.com/package/endless-progress
[minzip-badge]: https://img.shields.io/bundlephobia/minzip/endless-progress?style=flat&color=ddd&labelColor=444&label=minizip
[minzip-href]: https://bundlephobia.com/result?p=endless-progress
[jsdocs-badge]: https://img.shields.io/badge/jsDocs-reference-ddd?style=flat&color=ddd&labelColor=444
[jsdocs-href]: https://www.jsdocs.io/package/endless-progress
[license-badge]: https://img.shields.io/github/license/Lu-Jiejie/endless-progress?style=flat&color=ddd&labelColor=444
[license-href]: https://github.com/Lu-Jiejie/endless-progress/blob/main/LICENSE
