<template>
  <Row class="tile">
    <div class="label">{{ label }}</div>
    <el-popover :width="tipWidth" v-if="tip || $slots.tip" placement="top">
      <div class="text-3.25">
        <slot name="tip"></slot>
        <template v-if="!$slots.tip">
          {{ tip }}
        </template>
      </div>

      <template #reference>
        <div>
          <MdiInformation class="info" />
        </div>
      </template>
    </el-popover>

    <Spacer />
    <slot />
  </Row>
</template>

<script setup lang="ts">
import MdiInformation from '~icons/mdi/information'

defineProps<{
  label: string
  tip?: string
  tipWidth?: string | number
}>()
</script>

<style lang="scss" scoped>
.tile {
  & + .tile {
    margin-top: $spacing-s;
  }

  .label {
    @include text2;
  }

  .info {
    margin-left: 4px;
    color: $text-color-4;
    cursor: pointer;

    &:hover {
      color: $color-primary;
    }
  }
}
</style>
