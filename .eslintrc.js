// https://eslint.org/docs/user-guide/configuring
const path = require('path');

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
  },
  env: {
    browser: true,
    es6: true,
  },
  // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
  // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
  extends: ['plugin:vue/essential', 'airbnb-base'],
  // required to lint *.vue files
  plugins: ['vue'],
  // check if imports actually resolve
  settings: {
    'import/resolver': {
      webpack: {
        config: path.resolve(__dirname, './build/webpack.base.conf.js'),
      },
      // https://www.npmjs.com/package/eslint-import-resolver-alias
      // eslint只识别部分alias的解决方案
      alias: {
        map: [['_modules', './node_modules']],
        extensions: ['.ts', '.tsx', '.d.ts', '.js', '.vue', '.json'],
      },
    },
  },
  // add your custom rules here
  rules: {
    // don't require .vue extension when importing
    'import/extensions': [
      'error',
      'always',
      {
        ts: 'never',
        js: 'never',
        vue: 'never',
      },
    ],
    // disallow reassignment of function parameters
    // disallow parameter object manipulation except for specific exclusions
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: [
          'state', // for vuex state
          'acc', // for reduce accumulators
          'e', // for e.returnvalue
        ],
      },
    ],
    // allow optionalDependencies
    'import/no-extraneous-dependencies': [
      'error',
      {
        optionalDependencies: ['test/unit/index.js'],
      },
    ],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // https://eslint.org/docs/rules/linebreak-style
    'linebreak-style': [0, 'error', 'windows'],
    // remove console
    'no-console': 'off',
  },
  // https://eslint.org/docs/user-guide/configuring#specifying-globals
  globals: {
    $vue: 'off',
  },
};
