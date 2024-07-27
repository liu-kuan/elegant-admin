/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'standard',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'vue/multi-word-component-names': 0,
    'import/newline-after-import': ['error', { count: 1 }],
    'no-template-curly-in-string': 'error',
    '@typescript-eslint/no-unused-vars': 'error',
    'no-console': 'warn',
    'no-debugger': 'warn',
    'no-restricted-syntax': [
      'error',
      {
        selector: "CallExpression[callee.property.name='forEach']",
        message: '使用 for...of 或 Array.prototype.map() 替代 forEach',
      },
    ],
    'no-labels': 0,
    'no-void': 0,
  },
}
