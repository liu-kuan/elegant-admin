<template>
  <el-divider>系统设置</el-divider>

  <Tile label="最大请求并发数">
    <el-input-number v-model="maxConcurrentRequestCount" :min="1" :max="10" />
  </Tile>

  <Tile label="请求超时时长 (秒)" tip-width="220">
    <el-input-number v-model="requestTimeout" :min="1" :max="60" />

    <template #tip
      >有些接口例如文件上传类接口，由于可能需要较长时间，将不使用该超时时长</template
    >
  </Tile>

  <Tile label="最大页面缓存数" tip-width="410">
    <el-input-number v-model="maxCachePageCount" :min="1" :max="20" />
    <template #tip>
      1. 在 Tab
      栏中存在的页面将被缓存，但不是全部页面都能缓存，有最大缓存数限制，超过的页面缓存将遵循先进先出的规则被清除。
      <br />
      2. 配置较差的电脑，请适当调低该值。
      <br />
      3.
      编辑后，当前已缓存页数量超出最大页面缓存数也不会被即时清空，如需及时生效可刷新页面。
    </template>
  </Tile>

  <Tile
    label="最大请求异常数"
    tip="请求异常日志会保存的最近请求异常的数量"
    tip-width="190"
  >
    <el-input-number
      v-model="maxRequestErrorCount"
      :min="10"
      :max="50"
      :step="10"
    />
  </Tile>
</template>

<script setup lang="ts">
import useMetaStore from '@/stores/meta'
import usePreferenceStore from '@/stores/preference'
import Tile from './Tile.vue'

const {
  maxConcurrentRequestCount,
  requestTimeout,
  maxCachePageCount,
  maxRequestErrorCount,
} = storeToRefs(usePreferenceStore())
const { requestErrors } = storeToRefs(useMetaStore())

watch(maxRequestErrorCount, (maxRequestErrorCount) => {
  if (requestErrors.value.length > maxRequestErrorCount) {
    requestErrors.value.splice(maxRequestErrorCount, requestErrors.value.length)
  }
})
</script>
