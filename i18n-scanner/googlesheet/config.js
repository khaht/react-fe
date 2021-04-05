const path = require('path');
const config = require('../i18next-scanner.config');

const languages = config.options.lngs;

module.exports = {
  credentialsPath: path.join(__dirname, 'credentials.json'),
  tokenPath: path.join(__dirname, 'token.json'),
  languages,
  defaultLanguage: 'en_US',
  languagesRootPath: path.join(__dirname, '../../src/languages'),
  languagePathPattern: '{{language}}/index.json',
  header: ['Note', 'Date', 'key', ...languages],
  spreadsSheetId: '1YHkhB6OmTVcezzsNkMCgT2J2emA0Eg9x-ExGB_958ic',
  sheetName: 'Main',
  // G100 => 100 lines
  range: 'A1:F1500',
};
