<template>
  <el-form
    ref="form"
    :model="changePasswordData"
    label-width="80"
    :rules
    inline-message
  >
    <el-form-item prop="currentPassword" label="旧密码">
      <el-input
        placeholder="请输入旧密码"
        v-model="changePasswordData.currentPassword"
        show-password
      />
    </el-form-item>

    <el-form-item prop="newPassword" label="新密码">
      <el-input
        placeholder="请输入新密码"
        v-model="changePasswordData.newPassword"
        show-password
      />
    </el-form-item>

    <el-form-item prop="newPasswordConfirm" label="确认密码">
      <el-input
        placeholder="请再次输入新密码"
        v-model="changePasswordData.newPasswordConfirm"
        show-password
      />
    </el-form-item>

    <el-form-item style="margin-bottom: 0">
      <el-button
        type="primary"
        :loading="isLoading"
        @click="onSubmit"
        style="width: 100%"
      >
        确认修改
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { apiChangePassword } from '@/api/user'
import RouteNames from '@/router/route-names'
import useUserStore from '@/stores/user'
import {
  ElMessage,
  ElNotification,
  type FormInstance,
  type FormRules,
} from 'element-plus'

class ChangePasswordData {
  currentPassword = ''
  newPassword = ''
  newPasswordConfirm = ''
}

const changePasswordData = reactive(new ChangePasswordData())

const router = useRouter()

const form = ref<FormInstance>()

const rules: FormRules<ChangePasswordData> = {
  currentPassword: [
    {
      required: true,
      message: '旧密码不能为空',
      trigger: ['blur', 'change'],
    },
  ],
  newPassword: [
    {
      required: true,
      message: '新密码不能为空',
      trigger: ['blur', 'change'],
    },
    {
      validator(_: any, value: string, callback: (error?: Error) => void) {
        if (value === changePasswordData.currentPassword) {
          callback(new Error('新密码不能与旧密码一致！'))
        } else {
          callback()
        }
      },
      trigger: ['blur', 'change'],
    },
    {
      validator(_: any, value: string, callback: (error?: Error) => void) {
        // 判断密码是否符合要求
        const hasUpperCase = /[A-Z]/.test(value)
        const hasLowerCase = /[a-z]/.test(value)
        const hasNumber = /\d/.test(value)
        const hasSpecialChar = /[!@#$%&*+_=-]/.test(value)
        const isLengthValid = value.length >= 16 && value.length <= 20

        let err = ''
        let index = 1
        if (!hasUpperCase && !hasLowerCase) {
          err += `${index}. 没有大小写字母；`
          index++
        } else {
          if (!hasUpperCase) {
            err += `${index}. 没有大写字母；`
            index++
          }
          if (!hasLowerCase) {
            err += `${index}. 没有小写字母；`
            index++
          }
        }
        if (!hasNumber) {
          err += `${index}. 没有数字；`
          index++
        }
        if (!hasSpecialChar) {
          err += `${index}. 没有特殊字符：!@#$%&*+_-= ；`
          index++
        }
        if (!isLengthValid) {
          err += `${index}. 长度不在 16~20 之间；`
        }
        if (err.length) {
          callback(new Error('新密码不符合要求：' + err))
        } else {
          callback()
        }
      },
      trigger: ['blur', 'change'],
    },
  ],
  newPasswordConfirm: [
    {
      required: true,
      message: '确认密码不能为空',
      trigger: ['blur', 'change'],
    },
    {
      validator(_: any, value: string, callback: (error?: Error) => void) {
        if (value === changePasswordData.newPassword) {
          callback()
        } else {
          callback(new Error('与新密码输入不一致'))
        }
      },
      trigger: 'blur',
    },
  ],
}

const isLoading = ref(false)

const userStore = useUserStore()
const onSubmit = () => {
  form.value!.validate(async (valid) => {
    if (valid) {
      isLoading.value = true

      try {
        await apiChangePassword(
          changePasswordData.currentPassword,
          changePasswordData.newPassword,
        )

        userStore.token = null

        ElNotification.success({
          title: '恭喜你，已成功修改密码',
          message: '请重新登录！',
        })

        await router.replace({ name: RouteNames.Login })
      } catch (error) {
        ElMessage.error(`修改密码失败，原因：${error}`)
      } finally {
        isLoading.value = false
      }
    }
  })
}
</script>

<style lang="scss" scoped>
.el-form {
  width: 350px;
  padding: 20px 30px;
  background-color: $fill-color;
  border-radius: $border-radius-2;
}
</style>
