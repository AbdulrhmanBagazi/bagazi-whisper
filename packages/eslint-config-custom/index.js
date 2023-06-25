module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true
  },
  rules: {
    semi: 'off',
    '@typescript-eslint/no-extra-semi': 'off',
    'multiline-ternary': 'off',
    'no-console': 'error',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'unicorn/filename-case': 'off',
    'unicorn/prefer-module': 'off',
    'unicorn/no-null': 'off',
    'unicorn/prevent-abbreviations': 'off',
    'unicorn/no-document-cookie': 'off',
    'prettier/prettier': 'off', // the prettier extension will automatically fix issues violating this rule,
    'padded-blocks': 'off', // fixed by prettier
    'no-multiple-empty-lines': 'off', // fixed by prettier
    indent: 'off', // this is always clashing with prettier config, so better to disabled it
    'no-trailing-spaces': 'off',
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always'
      }
    ],
    'unicorn/no-array-reduce': 'off',
    'security/detect-object-injection': 'off',
    'no-tabs': 0,
    camelcase: 'off',
    '@next/next/no-img-element': 'off',
    'sonarjs/cognitive-complexity': 'off',
    '@haraj/no-fortawesome-imports': 'off'
  },
  extends: [
    'next',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'plugin:sonarjs/recommended',
    'plugin:unicorn/recommended',
    'plugin:security/recommended',
    'plugin:cypress/recommended',
    'prettier',
    'standard',
    'plugin:@typescript-eslint/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  globals: {
    JSX: 'readonly'
  },
  plugins: [
    '@haraj',
    'react',
    'prettier',
    'testing-library',
    '@typescript-eslint'
  ],
  overrides: [
    // Only uses Testing Library lint rules in test files
    {
      files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
      extends: ['plugin:testing-library/react']
    }
  ]
}
