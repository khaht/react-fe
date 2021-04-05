const { transform } = require('./transform');
const { flush } = require('./flush-non-overwrite');

module.exports = {
  input: [
    'src/**/*.{js,jsx}',
    // Use ! to filter out files or directories
    '!src/**/*.spec.{js,jsx}',
    '!src/languages/**',
    '!**/node_modules/**',
  ],
  output: 'src',
  options: {
    debug: true,
    removeUnusedKeys: false,
    sort: true,
    func: {
      list: ['i18next.t', 'i18n.t', 't'],
      extensions: ['.js', '.jsx'],
    },
    trans: {
      component: 'Trans',
      i18nKey: 'i18nKey',
      defaultsKey: 'defaults',
      extensions: ['.js', '.jsx'],
      fallbackKey(ns, value) {
        return value;
      },
      acorn: {
        ecmaVersion: 10, // defaults to 10
        sourceType: 'module', // defaults to 'module'
        // Check out https://github.com/acornjs/acorn/tree/master/acorn#interface for additional options
      },
    },
    lngs: ['en_US', 'ja_JP', 'zh_TW'],
    ns: ['index'],
    defaultLng: 'en_US',
    fallbackLng: 'en_US',
    defaultNs: 'index',
    defaultValue: '__NOT_TRANSLATED__',
    resource: {
      loadPath: 'languages/{{lng}}/{{ns}}.json',
      savePath: 'languages/{{lng}}/{{ns}}.json',
      jsonIndent: 2,
      lineEnding: '\n',
    },
    nsSeparator: false,
    keySeparator: false,
    pluralSeparator: '_',
    contextSeparator: '_',
    interpolation: {
      prefix: '{{',
      suffix: '}}',
    },
  },
  transform,
  flush,
};
