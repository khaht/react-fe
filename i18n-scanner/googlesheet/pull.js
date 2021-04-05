const { pull } = require('google-sheet-translation-sync');
const config = require('./config');

pull(config);
