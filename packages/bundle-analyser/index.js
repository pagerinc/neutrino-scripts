const merge = require('deepmerge');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = (neutrino, opts = {}) => {
  const options = merge(
    {
      pager: {
        analyse: false,
        analyserOpts: {
          analyzerMode:
            process.env.NODE_ENV === 'development' ? 'server' : 'static'
        }
      }
    },
    opts
  );

  if (options.pager.analyse) {
    neutrino.config
      .plugin('pagerBundleAnalyzer')
      .use(BundleAnalyzerPlugin, options.pager.analyserOpts)
      .init((Plugin, args) => new Plugin(args));
  }
};
