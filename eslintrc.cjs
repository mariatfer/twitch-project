const RULES = {
  OFF: 'off',
  WARN: 'warn',
  ERROR: 'error',
}

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['standard', 'prettier', '@vue/eslint-config-typescript'],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['vue', 'prettier'],
  rules: {
    'no-undef': RULES.OFF,
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'vue/first-attribute-linebreak': RULES.OFF,
    'no-unused-vars': [RULES.OFF],
    'arrow-spacing': [RULES.ERROR],
    'object-curly-spacing': [RULES.ERROR, 'always'],
    'array-callback-return': [RULES.OFF, { checkForEach: true }],
    'vue/require-default-prop': RULES.OFF,
    'vue/singleline-html-element-content-newline': 0,
    'vue/component-name-in-template-casing': [RULES.ERROR, 'PascalCase'],
    'vue/html-quotes': [RULES.ERROR, 'double', { avoidEscape: true }],
    'vue/mustache-interpolation-spacing': [RULES.ERROR, 'always'],
    'vue/no-multi-spaces': [
      RULES.ERROR,
      {
        ignoreProperties: false,
      },
    ],
    'vue/no-spaces-around-equal-signs-in-attribute': [RULES.ERROR],
    'vue/v-on-style': [RULES.ERROR, 'shorthand'],
    'vue/v-bind-style': [RULES.ERROR, 'shorthand'],
    'vue/multi-word-component-names': RULES.OFF,
    'no-return-assign': RULES.OFF,
    'no-mixed-operators': RULES.OFF,
    'vue/no-setup-props-destructure': RULES.OFF,
    'vue/no-v-text-v-html-on-component': RULES.OFF,
    'vue/require-v-for-key': RULES.ERROR,
    'vue/no-mutating-props': RULES.ERROR,
  },
}