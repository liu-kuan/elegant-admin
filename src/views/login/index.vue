<template>
  <div class="login-page">
    <Transition appear name="title">
      <div class="title">𝔼𝕃𝔼𝔾𝔸ℕ𝕋-𝔸𝔻𝕄𝕀ℕ</div>
    </Transition>

    <FormBox />

    <div class="footer-container" v-if="isHideLogo">
      <Transition appear name="copyright">
        <div class="copyright">
          Copyright ©2024 ELEGANT-ADMIN 后台管理系统 v1.0.0
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import RouteNames from '@/router/route-names'
import { useEventListener } from '@vueuse/core'
import FormBox from './FormBox.vue'

defineOptions({
  name: RouteNames.Login,
})

// 低于该高度就隐藏 logo
const HEIGHT = 500

const isHideLogo = ref(window.innerHeight > HEIGHT)

const handleResize = () => {
  isHideLogo.value = window.innerHeight > HEIGHT
}

useEventListener(window, 'resize', handleResize)
</script>

<style lang="scss" scoped>
.login-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: $fill-color;
  background-image: url('@/assets/login-bg.webp');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

.title {
  margin-bottom: 20px;
  font-size: 40px;
  color: #fff;
}

.title-enter-active,
.title-leave-active {
  transition: all 0.8s ease;
}

.title-enter-from,
.title-leave-to {
  opacity: 0;
  transform: translateY(50px);
}

.footer-container {
  position: fixed;
  bottom: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 6px;

  .copyright {
    margin-top: 16px;
    font-size: 14px;
    filter: brightness(0) invert(1);
  }
}

.copyright-enter-active,
.copyright-leave-active {
  transition: opacity 1s ease;
}

.copyright-enter-from,
.copyright-leave-to {
  opacity: 0;
}
</style>
