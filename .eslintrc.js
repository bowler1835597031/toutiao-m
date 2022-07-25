module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/standard'],
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfig: false
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-trailing-spaces': 'off',
    'no-multiple-empty-lines': 'off',
    'space-before-function-paren': 'off',
    'spaced-comment': 'off',
    'vue/multi-word-component-names': 'off',
    'no-unused-expressions': 'off',
    'vue/no-mutating-props': 'off'
  }
}
