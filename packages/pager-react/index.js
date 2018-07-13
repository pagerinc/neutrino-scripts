const neutrinoAirbnb = require('@neutrinojs/airbnb');
const neutrinoReact = require('@neutrinojs/react');
const loaderMerge = require('@neutrinojs/loader-merge');

module.exports = (neutrino, opts = {}) => {
  neutrino.use(neutrinoAirbnb, opts);
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
};
