import antfu from '@antfu/eslint-config'
import preferArrowFunctions from 'eslint-plugin-prefer-arrow-functions'

export default antfu({
  vue: true,
  react: false,
  pnpm: true,
  formatters: {
    css: true,
    // markdown: true,
    // slidev: {
    //   files: [
    //     '*/src/slides.md',
    //   ],
    // },
  },
  ignores: [
    '**/demo/eslint/**',
    '**/dist-stale/**',
  ],
})
  .removeRules(
    'markdown/require-alt-text',
    'markdown/no-multiple-h1',
    'markdown/heading-increment',
    'markdown/no-missing-link-fragments',
    'import/newline-after-import',
    'antfu/top-level-function',
  )
  .append({
    plugins: {
      'prefer-arrow-functions': preferArrowFunctions,
    },
    rules: {
      'prefer-arrow-functions/prefer-arrow-functions': 'error',
    },
  })
