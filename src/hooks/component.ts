/**
 * 使用示例：
 * ```vue
 * <template>
 *   <MyComponent ref="compRef" />
 * </template>
 *
 * <script>
 * import MyComponent from 'xxx/MyComponent.vue'
 * const compRef = useComponentRef(MyComponent)
 * </script>
 * ```
 */
export const useComponentRef = <T extends abstract new (...args: any) => any>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  component: T,
) => {
  return ref<InstanceType<T>>()
}
