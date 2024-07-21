<script setup lang="ts">
import { onMounted, reactive } from 'vue';
// @ts-ignore
import { MultistepProgress,Progress } from '../../src/progress'

const p = reactive(new MultistepProgress({
  steps: [
    {
      subProgress: 1
    },
    {
      subProgress: 0.3
    },
    {
      subProgress: 0.6
    }
  ]
}))

const start = () => {
  p.start()
}

const end = () => {
  p.end()
}
const next = () => {
  p.next()
}
</script>

<template>
  <el-progress :percentage="p.progress * 100" :text-inside="true" :stroke-width="26" />
  <el-button @click="start">start</el-button>
  <el-button @click="next">next</el-button>
  <el-button @click="end">end</el-button>

  <div>{{ p.progress }}</div>

  <div>{{ p }}</div>

</template>

<style scoped>
</style>
