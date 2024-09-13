<template>
  <Vue3JsonEditor
    :show-btns="false"
    :mode="readonly ? 'view' : 'code'"
    :modes="readonly ? [] : ['view', 'code']"
    class="json-editor"
    v-bind="$attrs"
  />
</template>

<script setup lang="ts">
import { Vue3JsonEditor } from 'vue3-json-editor'

withDefaults(
  defineProps<{
    readonly?: boolean
    height?: string
  }>(),
  {
    readonly: false,
  },
)
</script>

<style lang="scss" scoped>
.json-editor {
  :deep(.jsoneditor-poweredBy),
  :deep(.jsoneditor-search) {
    display: none;
  }

  :deep(.jsoneditor-outer) {
    height: v-bind('$props.height');
  }

  :deep(.jsoneditor-tree) {
    min-height: 0;
  }

  :deep(.jsoneditor-readonly) {
    color: $text-color-3 !important;
  }

  :deep(.jsoneditor-field),
  :deep(.jsoneditor-separator) {
    color: $text-color-1 !important;
  }

  :deep(.jsoneditor-value) {
    color: $text-color-2 !important;

    &.jsoneditor-number {
      color: $color-primary !important;
    }

    &.jsoneditor-string {
      color: $color-success !important;

      &::before {
        content: '"';
      }

      &::after {
        content: '"';
      }
    }
  }

  :deep(.ace_constant.ace_numeric),
  :deep(.jsoneditor-number) {
    color: #004ed0 !important;
  }

  :deep(div.jsoneditor-empty) {
    all: unset;

    &::before {
      all: unset;
      margin-left: 3px;
    }

    &::after {
      all: unset;
      color: $color-success !important;
      content: '"';
    }
  }

  :deep(*) {
    font-family: 'droid sans mono', consolas, monospace, 'courier new', courier,
      sans-serif !important;
  }
}
</style>
