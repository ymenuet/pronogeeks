module.exports = {
  env: {
    browser: true,
    es2020: true,
    jest: true,
  },
  extends: [
    'airbnb',
    'plugin:react/recommended',
    'plugin:jest/recommended',
    'plugin:prettier/recommended',
  ],
  globals: {
    config: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: ['react', 'jest'],
  rules: {
    'react/jsx-props-no-spreading': 'off',
    'react/destructuring-assignment': 'off',
    'no-underscore-dangle': 'off',
    'import/prefer-default-export': 'off',
    radix: 'off',
    'consistent-return': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.jsx'] }],
  },
  settings: {
    'import/resolver': {
      node: {},
      webpack: {},
    },
  },
};
