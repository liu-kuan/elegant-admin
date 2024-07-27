import mitt from 'mitt'

export default mitt<{
  // 点击右上角刷新图标触发该事件
  refresh: void
}>()
