<template>
  <div class="form-box">
    <div class="title">用户登录</div>

    <div class="divider"></div>

    <el-form ref="form" :model="user" :rules="rules" inline-message>
      <el-form-item prop="email">
        <el-input
          :prefix-icon="User"
          size="large"
          placeholder="Email"
          v-model="user.email"
        />
      </el-form-item>

      <el-form-item prop="password">
        <el-input
          :prefix-icon="Lock"
          size="large"
          placeholder="密码"
          v-model="user.password"
          show-password
        />
      </el-form-item>

      <div class="text-size-3">游客登录：账号密码可在控制台查看</div>

      <el-button
        class="login-button"
        type="primary"
        :loading="isLoading"
        @click="onLogin"
      >
        登录
      </el-button>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { useEnterKey } from '@/hooks/use-hot-key'
import RouteNames from '@/router/route-names'
import { Lock, User } from '@element-plus/icons-vue'
import { ElNotification, type FormInstance, type FormRules } from 'element-plus'

import useMetaStore from '@/stores/meta'
import { sleep } from '@/utils/time'

import useUserStore from '@/stores/user'

const router = useRouter()

const user = reactive({
  email: '',
  password: '',
})

const rules: FormRules<typeof user> = {
  email: [
    {
      required: true,
      message: '邮箱不能为空',
      trigger: ['blur', 'change'],
    },
    {
      type: 'email',
      message: '请输入正确的邮箱地址',
      trigger: ['blur'],
    },
  ],
  password: [
    {
      required: true,
      message: '密码不能为空',
      trigger: ['blur', 'change'],
    },
  ],
}
const { redirectRoute } = storeToRefs(useMetaStore())
const { token, info } = storeToRefs(useUserStore())

const form = ref<FormInstance>()
const isLoading = ref(false)

console.log('游客登录')
console.log('账号：elegant@admin.com')
console.log('密码：123456')

const onLogin = () => {
  form.value!.validate(async (valid) => {
    if (valid) {
      try {
        isLoading.value = true
        // require login api
        if (user.email === 'elegant@admin.com' && user.password === '123456') {
          ElNotification.success({
            title: '欢迎您登录 ELEGANT-ADMIN',
            message: '祝您工作顺利！！！',
          })

          token.value = 'TOKENTOKENTOKENTOKEN....'
          info.value.username = 'Eric Liu'

          await sleep(500)

          if (redirectRoute.value) {
            await router.replace(redirectRoute.value)
            redirectRoute.value = ''
          } else {
            await router.replace({ name: RouteNames.Home })
          }
        } else {
          throw new Error('账号或密码错误')
        }
      } catch (error) {
        ElNotification.error({
          title: `登陆失败，原因：${error}`,
          message: '账号密码可在控制台查看',
        })
      } finally {
        isLoading.value = false
      }
    }
  })
}
// #endregion

useEnterKey(onLogin)
</script>

<style lang="scss" scoped>
.form-box {
  align-items: center;
  width: 300px;
  padding: 18px 20px;
  margin-top: 2.5vh;
  background-color: $fill-color-light;
  border-radius: $border-radius-2;
}

.title {
  @include text1;

  font-weight: bold;
  text-align: center;
}

.divider {
  height: 0.5px;
  margin: 12px 0 18px;
  background-color: $border-color;
}

.login-button {
  width: 100%;
  height: 40px;
  margin: 6px 0 8px;
  font-size: 15px;
}

:deep(.el-input .el-input__icon) {
  width: 18px;
}

:deep(.el-icon svg) {
  width: 18px;
  height: 18px;
}
</style>
