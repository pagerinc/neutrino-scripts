const neutrinoAirbnbBase = require('@neutrinojs/airbnb-base');
const neutrinoStylelint = require('@neutrinojs/stylelint');
const neutrinoWeb = require('@neutrinojs/web');
const loaderMerge = require('@neutrinojs/loader-merge');
const defineCongig = require('@pager/neutrino-define-config');
const merge = require('deepmerge');

module.exports = (neutrino, opts = {}) => {
  neutrino.use(defineCongig, opts);
  neutrino.use(neutrinoAirbnbBase, opts);
  neutrino.use(neutrinoStylelint, opts.stylelint);
  neutrino.use(neutrinoWeb, opts);

  neutrino.config.when(neutrino.config.module.rules.has('lint'), () => {
    neutrino.use(loaderMerge('lint', 'eslint'), {
      baseConfig: {
        extends: ['plugin:prettier/recommended', 'prettier/react']
      }
    });
  });

  neutrino.config.when(neutrino.config.plugins.has('stylelint'), () => {
    neutrino.config.plugin('stylelint').tap(([options, ...args]) => [
      merge(options, {
        config: {
          extends: require.resolve('stylelint-config-standard'),
          rules: {}
        }
      }),
      ...args
    ]);
  });
};
