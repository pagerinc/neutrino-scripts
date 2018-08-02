const merge = require('deepmerge');
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
  const config = tryRequire(join(process.cwd(), path, target));
  if (!config) {
    return {};
  }

  return Object.entries(config).reduce(
    (result, [key, value]) =>
      Object.assign(result, {
        [`process.env.${key}`]: JSON.stringify(value)
      }),
    {}
  );
}

module.exports = (neutrino, opts = { pager: { path: 'config' } }) => {
  const options = merge(
    { pager: { path: 'config', defaultTarget: 'default' } },
    opts
  );

  const defineArgs = options.pager.envs || {};

  const target = process.env.TARGET || options.pager.defaultTarget || 'default';

  Object.assign(
    defineArgs,
    loadConfig(options.pager.path, 'base'),
    loadConfig(options.pager.path, target),
    {
      'process.env.TARGET': JSON.stringify(target)
    }
  );

  neutrino.config
    .plugin('pagerConfig')
    .use(DefinePlugin, defineArgs)
    .init((Plugin, args) => new Plugin(args));
};
