const neutrinoAirbnbBase = require('@neutrinojs/airbnb-base');
const neutrinoStylelint = require('@neutrinojs/stylelint');
const neutrinoVue = require('@neutrinojs/vue');
const loaderMerge = require('@neutrinojs/loader-merge');
const defineCongig = require('@pager/neutrino-define-config');
const bundleAnalizer = require('@pager/neutrino-bundle-analyser');
const momentLocale = require('@pager/neutrino-moment-locale');

module.exports = (neutrino, opts = {}) => {
  neutrino.use(defineCongig, opts);
  neutrino.use(bundleAnalizer, opts);
  neutrino.use(momentLocale, opts);
  neutrino.use(neutrinoAirbnbBase, opts);
  neutrino.use(neutrinoStylelint, opts.stylelint);
  neutrino.use(neutrinoVue, opts);

  neutrino.config.when(neutrino.config.module.rules.has('lint'), () => {
    neutrino.use(loaderMerge('lint', 'eslint'), {
      baseConfig: {
        extends: ['plugin:prettier/recommended', 'prettier']
      }
    });
  });
};
