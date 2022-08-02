const { ExtractKeysPlugin } = require('../../dist/main')

const {
  addWebpackPlugin,
  useBabelRc,
  override,
} = require('customize-cra');

module.exports = override(
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useBabelRc(),
  addWebpackPlugin(new ExtractKeysPlugin())
);
