<template>
  <Card name="JsonEditor" des="JSON 编辑器">
    <JsonEditor @json-change="json = $event" />

    <div class="mt-4">内容：{{ json }}</div>
  </Card>
</template>

<script setup lang="ts">
import Card from './Card.vue'

const json = ref({})
</script>
