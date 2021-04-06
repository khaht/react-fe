const CracoEsbuildPlugin = require('craco-esbuild');
const path = require('path');

const resolveAliasPath = (dir = '') => {
  return path.resolve(__dirname, dir.startsWith('src') ? dir : `src/${dir}`);
};

module.exports = {
  plugins: [
    {
      plugin: CracoEsbuildPlugin,
    },
  ],

  webpack: {
    alias: {
      core: resolveAliasPath('core'),
      modules: resolveAliasPath('modules'),
      locales: resolveAliasPath('locales'),
      assets: resolveAliasPath('assets'),
      router: resolveAliasPath('router'),
    },
    configure: (webpackConfig, { env, paths }) => {
      return webpackConfig;
    },
  },
};
