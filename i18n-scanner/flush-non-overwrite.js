/* eslint-disable import/no-extraneous-dependencies */
const _ = require('lodash');
const fs = require('fs');
const eol = require('eol');
const path = require('path');
const VirtualFile = require('vinyl');
const flattenObjectKeys = require('i18next-scanner/lib/flatten-object-keys').default;
const omitEmptyObject = require('i18next-scanner/lib/omit-empty-object').default;

function getFileJSON(resPath) {
  try {
    return JSON.parse(fs.readFileSync(fs.realpathSync(path.join('src', resPath))).toString('utf-8'));
  } catch (e) {
    return {};
  }
}

// This function help
function flush(done) {
  const { parser } = this;
  const { options } = parser;

  // Flush to resource store
  const resStore = parser.get({ sort: options.sort });
  const { jsonIndent } = options.resource;
  const lineEnding = String(options.resource.lineEnding).toLowerCase();

  Object.keys(resStore).forEach((lng) => {
    const namespaces = resStore[lng];

    Object.keys(namespaces).forEach((ns) => {
      let obj = namespaces[ns];
      const resPath = parser.formatResourceSavePath(lng, ns);

      let resContent = getFileJSON(resPath);

      if (options.removeUnusedKeys) {
        const namespaceKeys = flattenObjectKeys(obj);
        const resContentKeys = flattenObjectKeys(resContent);

        const unusedKeys = _.differenceWith(resContentKeys, namespaceKeys, _.isEqual);

        for (let i = 0; i < unusedKeys.length; i += 1) {
          _.unset(resContent, unusedKeys[i]);
        }

        resContent = omitEmptyObject(resContent);
      }

      obj = { ...obj, ...resContent };

      let text = `${JSON.stringify(obj, null, jsonIndent)}\n`;

      if (lineEnding === 'auto') {
        text = eol.auto(text);
      } else if (lineEnding === '\r\n' || lineEnding === 'crlf') {
        text = eol.crlf(text);
      } else if (lineEnding === '\n' || lineEnding === 'lf') {
        text = eol.lf(text);
      } else if (lineEnding === '\r' || lineEnding === 'cr') {
        text = eol.cr(text);
      } else {
        // Defaults to LF
        text = eol.lf(text);
      }

      this.push(
        new VirtualFile({
          path: resPath,
          contents: Buffer.from(text),
        }),
      );
    });
  });

  done();
}

module.exports.flush = flush;
