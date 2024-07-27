import transformerDirectives from '@unocss/transformer-directives'
import { defineConfig } from 'unocss'

export default defineConfig({
  // TODO 不用 as any 会类型爆错，这是 unocss 内部的类型 bug
  transformers: [transformerDirectives() as any],
  rules: [
    [
      'box-shadow',
      {
        'box-shadow': '0 0 2px 1.5px var(--shadow-color)',
      },
    ],
  ],
  shortcuts: {
    'flex-center': 'flex justify-center items-center',
    'wh-full': 'w-full h-full',
    text1: 'color-1 font-size-1',
    text2: 'color-2 font-size-2',
    text3: 'color-3 font-size-3',
    text4: 'color-4 font-size-4',
  },
  theme: {
    colors: {
      primary: 'var(--el-color-primary)',
      danger: 'var(--el-color-danger)',
      warning: 'var(--el-color-warning)',
      success: 'var(--el-color-success)',
      info: 'var(--el-color-info)',
    },
    textColor: {
      '1': 'var(--text-color-1)',
      '2': 'var(--text-color-2)',
      '3': 'var(--text-color-3)',
      '4': 'var(--text-color-4)',
    },
    backgroundColor: {
      base: 'var(--bg-color)',
      overlay: 'var(--el-bg-color-overlay)',

      fill: 'var(--el-fill-color)',
      'fill-light': 'var(--el-fill-color-light)',
      'fill-lighter': 'var(--el-fill-color-lighter)',
      'fill-dark': 'var(--el-fill-color-dark)',
      'fill-darker': 'var(--el-fill-color-darker)',
    },
    borderColor: {
      base: 'var(--el-border-color)',
      light: 'var(--el-border-color-light)',
      lighter: 'var(--el-border-color-lighter)',
      dark: 'var(--el-border-color-dark)',
      darker: 'var(--el-border-color-darker)',
    },
    fontSize: {
      '1': 'var(--text-size-1)',
      '2': 'var(--text-size-2)',
      '3': 'var(--text-size-3)',
      '4': 'var(--text-size-4)',
    },
  },
})
