<template>
  <div></div>
</template>

<script setup lang="ts">
import RouteNames from '@/router/route-names'

const router = useRouter()
const route = useRoute()

const { id } = route.query as {
  id: string
}
router.replace({
  name: `${RouteNames.SplitScreen}_${id}`,
  query: {
    id,
  },
})
</script>
