<template>
  <div class="header" @click="onLogoClicked">
    <ElImage
      class="logo"
      :class="{ collapse: isMenuCollapse }"
      :src="pngLogo"
    />

    <Transition>
      <div class="label" v-if="!isMenuCollapse">ELEGANT-ADMIN</div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import pngLogo from '@/assets/logo.svg'
import RouteNames from '@/router/route-names'
import usePreferenceStore from '@/stores/preference'
import { storeToRefs } from 'pinia'

const { isMenuCollapse } = storeToRefs(usePreferenceStore())

const router = useRouter()

const onLogoClicked = () => {
  router.push({ name: RouteNames.Home })
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  cursor: pointer;

  .logo {
    position: absolute;
    left: 18px;
    height: 26px;
    aspect-ratio: 173/150;
    transition: all 0.3s ease;

    &.collapse {
      left: 13.5px;
      height: 32px;
    }
  }

  .label {
    position: absolute;
    left: 58px;
    aspect-ratio: 435 / 33;
    font-size: 19px;

    // letter-spacing: 4px;
    filter: brightness(0) invert(1);
  }
}

.v-enter-active {
  transition:
    opacity 0.5s ease,
    transform 0.3s ease;
}

.v-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateX(-17px);
}
</style>
