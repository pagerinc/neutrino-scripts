const neutrinoAirbnb = require('@neutrinojs/airbnb');
const neutrinoStylelint = require('@neutrinojs/stylelint');
const neutrinoReact = require('@neutrinojs/react');
const defineCongig = require('@pager/neutrino-define-config');
const loaderMerge = require('@neutrinojs/loader-merge');
const merge = require('deepmerge');

module.exports = (neutrino, opts = {}) => {
  neutrino.use(defineCongig, opts);
  neutrino.use(neutrinoAirbnb, opts);
  neutrino.use(neutrinoStylelint, opts.stylelint);
  neutrino.use(neutrinoReact, opts);

  neutrino.config.when(neutrino.config.module.rules.has('lint'), () => {
    neutrino.use(loaderMerge('lint', 'eslint'), {
      baseConfig: {
        extends: ['plugin:prettier/recommended', 'prettier/react']
      },
      rules: {
        'react/jsx-filename-extension': [1, { extensions: ['.js'] }]
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
