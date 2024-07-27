<template>
  <div>{{ animatedValue }}</div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    duration?: number
    value: number
  }>(),
  {
    duration: 500,
  },
)

const animatedValue = ref(props.value)

watch(
  () => props.value,
  (value) => {
    animateValue(value)
  },
)

const animateValue = (endValue: number) => {
  const startTime = Date.now()
  const endTime = startTime + props.duration
  const startAnimatedValue = animatedValue.value

  const updateValue = () => {
    const now = Date.now()
    const progress = Math.min((now - startTime) / props.duration, 1)
    animatedValue.value = Math.floor(
      startAnimatedValue + (endValue - startAnimatedValue) * progress,
    )

    if (now < endTime) {
      requestAnimationFrame(updateValue)
    }
  }

  requestAnimationFrame(updateValue)
}
</script>
