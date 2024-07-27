<template>
  <Card name="Dialog" des="声明式弹窗组件">
    <ElButton type="primary" @click="onClickShowMessageDialog"
      >信息弹窗</ElButton
    >
    <ElButton type="primary" @click="onClickShowCustomDialog"
      >自定义弹窗</ElButton
    >
    <ElButton type="primary" @click="onClickShowFormDialog">表单弹窗</ElButton>
    <ElButton type="primary" @click="onClickShowConfirmBtnLoadingDialog"
      >确认弹窗 Loading</ElButton
    >
  </Card>
</template>

<script setup lang="tsx">
import Dialog from '@/components/Dialog'
import { ElButton, ElInput } from 'element-plus'
import Card from '../Card.vue'

const onClickShowMessageDialog = () => {
  Dialog({
    header: '信息弹窗',
    content: '需要展示的信息',
    options: {
      attrs: {
        width: '300px',
      },
    },
  })
}

const onClickShowCustomDialog = () => {
  Dialog({
    header: <div class="color-green font-size-20px">自定义头部</div>,
    content: defineComponent(() => {
      return () => [
        h(
          'div',
          {
            class: 'color-red font-size-30px',
          },
          '使用 h 函数自定义内容',
        ),
        <div class="color-blue font-size-30px">使用 jsx 函数自定义内容</div>,
      ]
    }),
    footer: <div class="color-green font-size-20px">自定义底部</div>,
    options: {
      attrs: {
        width: '400px',
      },
    },
  })
}

const onClickShowFormDialog = async () => {
  const inputValue = ref('')
  const action = await Dialog({
    header: '表单弹窗',
    content: defineComponent(() => {
      const onInputChange = (e: string) => {
        inputValue.value = e
      }

      return () => [
        h(ElInput, {
          'onUpdate:modelValue': onInputChange,
          placeholder: '请输入内容，按确认后可展示 message',
          modelValue: inputValue.value,
        }),
      ]
    }),
    options: {
      attrs: {
        width: '300px',
      },
    },
  }).action

  if (action === 'confirm') {
    ElMessage.success(`输入框内容改为：${inputValue.value}`)
  }
}

const onClickShowConfirmBtnLoadingDialog = () => {
  Dialog({
    header: '表单弹窗',
    content: '点击确认按钮后，确认按钮 loading 1s',
    beforeClose: (action, { isLoadingConfirm }, close) => {
      if (action === 'confirm') {
        isLoadingConfirm.value = true
        setTimeout(() => {
          close()
          isLoadingConfirm.value = false
        }, 1000)
      } else {
        close()
      }
    },
    options: {
      attrs: {
        width: '300px',
      },
    },
  })
}
</script>

<style lang="scss" scoped>
.aaa {
  resize: both;
}
</style>
