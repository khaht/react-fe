const fs = require('fs');
const chalk = require('chalk');

function transform(file, enc, done) {
  const { parser } = this;
  const content = fs.readFileSync(file.path, enc);
  let count = 0;

  parser.parseFuncFromString(
    content,
    { list: ['i18next._', 'i18next.__', 'i18next.t', 'i18n.t', 't'] },
    (key, options) => {
      parser.set(
        key,
        {
          ...options,
          nsSeparator: false,
          keySeparator: false,
        },
      );
      count += 1;
    },
  );

  if (count > 0) {
    // eslint-disable-next-line no-console
    console.log(`i18next-scanner: count=${chalk.cyan(count)}, file=${chalk.yellow(JSON.stringify(file.path))}`);
  }

  done();
}

module.exports.transform = transform;
