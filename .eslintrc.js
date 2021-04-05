module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'import'],
  rules: {
    'import/no-named-as-default': 0,
    'import/no-named-as-default-member': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.js'] }],
    'import/prefer-default-export': 0,
    'import/operator-linebreak': 0,
    'react/react-in-jsx-scope': 0,
    'react/no-array-index-key': 0,
    'import/max-length': 0,
    'arrow-body-style': 0,
    'no-unused-vars': 'warn',
    'object-curly-newline': 0,
    'default-case': 0,
    'dot-notation': 0,
    'no-param-reassign': 0,
    'no-shadow': 0,
    'no-restricted-syntax': 0,
    'no-prototype-builtins': 0,
    'prefer-template': 0,
    'lines-between-class-members': 0,
    'class-methods-use-this': 0,
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js'],
      },
    },
  },
  root: true,
};
