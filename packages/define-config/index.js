const { DefinePlugin } = require('webpack');
const { join } = require('path');

function tryRequire(modulePath) {
  try {
    // eslint-disable-next-line global-require
    return require(modulePath);
  } catch (e) {
    if (e.code === 'MODULE_NOT_FOUND') {
      return false;
    }
    throw e;
  }
}

function loadConfig(path, target) {
  const config = tryRequire(join(__dirname, path, target));
  if (!config) {
    return {};
  }

  return Object.entries(config).reduce(
    (result, [key, value]) =>
      Object.apply(result, {
        [`process.env.${key}`]: JSON.stringify(value)
      }),
    {}
  );
}

module.exports = (neutrino, opts = { pager: { path: 'config' } }) => {
  const defineArgs = opts.pager.envs || {};

  const target = process.env.TARGET || 'default';

  Object.assign(
    defineArgs,
    loadConfig(opts.pager.path, 'base'),
    loadConfig(opts.pager.path, target),
    {
      'process.env.TARGET': JSON.stringify(target)
    }
  );

  console.log(DefinePlugin, defineArgs);
  neutrino.config
    .plugin('pagerConfig')
    .use(DefinePlugin, defineArgs)
    .init((Plugin, args) => new Plugin(args));
};
