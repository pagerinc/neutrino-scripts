const neutrinoAirbnbBase = require('@neutrinojs/airbnb-base');
const neutrinoStylelint = require('@neutrinojs/stylelint');
const neutrinoVue = require('@neutrinojs/vue');
const loaderMerge = require('@neutrinojs/loader-merge');
const defineCongig = require('@pager/neutrino-define-config');

module.exports = (neutrino, opts = {}) => {
  neutrino.use(neutrinoAirbnbBase, opts);
  neutrino.use(neutrinoStylelint, opts);
  neutrino.use(neutrinoVue, opts);
  neutrino.use(defineCongig, opts);

  neutrino.config.when(neutrino.config.module.rules.has('lint'), () => {
    neutrino.use(loaderMerge('lint', 'eslint'), {
      baseConfig: {
        extends: ['plugin:prettier/recommended', 'prettier/react']
      },
      rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
      }
    });
  });
};
