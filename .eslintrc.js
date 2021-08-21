module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'react/jsx-filename-extension': [0, { allow: 'as-needed' }],
    'react/prop-types': 0,
    'react/destructuring-assignment': 0,
    'jsx-a11y/label-has-associated-control': 0,
    'object-curly-newline': 0,
    'no-console': 0,
    'operator-linebreak': 0,
  },
};
