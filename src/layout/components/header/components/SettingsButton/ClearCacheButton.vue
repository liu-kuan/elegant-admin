<template>
  <el-button :icon="ClearOutlined" type="warning" @click="onClear" plain>
    清理缓存
  </el-button>
</template>

<script setup lang="ts">
import Dialog from '@/components/Dialog'
import { getLocalStorageKeysById, ids } from '@/config/pinia'
import { ClearOutlined } from '@ant-design/icons-vue'

const onClear = async () => {
  const action = await Dialog({
    header: '清理缓存',
    content: '清理缓存会将偏好设置等缓存数据清空，确定清理吗？',
    options: {
      attrs: {
        width: '380',
      },
    },
  }).action

  if (action === 'confirm') {
    handleClear()
  }
}

const router = useRouter()
const handleClear = () => {
  for (const key in ids) {
    const id = ids[key as keyof typeof ids]

    if (id === ids.user) continue

    localStorage.removeItem(
      getLocalStorageKeysById(ids[key as keyof typeof ids]),
    )
  }

  router.go(0)
  ElMessage.success('清理缓存成功')
}
</script>
