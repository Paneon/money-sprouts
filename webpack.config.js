const Encore = require('@symfony/webpack-encore');
const path = require('node:path');

// Manually configure the runtime environment if not already configured yet by the "encore" command.
// It's useful when you use tools that rely on webpack.config.js file.
if (!Encore.isRuntimeEnvironmentConfigured()) {
  Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
}

Encore
  // directory where compiled assets will be stored
  .setOutputPath('public/dist/')
  // public path used by the web server to access the output path
  .setPublicPath('/dist')
  // only needed for CDN's or subdirectory deploy
  //.setManifestKeyPrefix('build/')

  /*
   * ENTRY CONFIG
   *
   * Each entry will result in one JavaScript file (e.g. app.js)
   * and one CSS file (e.g. app.css) if your JavaScript imports CSS.
   */
  .addEntry('app', './assets/client/main.tsx')

  .splitEntryChunks()
  .enableSingleRuntimeChunk()

  /*
   * FEATURE CONFIG
   *
   * Enable & configure other features below. For a full
   * list of features, see:
   * https://symfony.com/doc/current/frontend.html#adding-more-features
   */
  .cleanupOutputBeforeBuild()
  .enableBuildNotifications()
  .enableSourceMaps(!Encore.isProduction())
  .enableVersioning(Encore.isProduction())

  // enables and configure @babel/preset-env polyfills
  // .configureBabel((config) => {
  //   config.plugins = ['@babel/plugin-proposal-class-properties'];
  // })
  .configureBabelPresetEnv((config) => {
    config.useBuiltIns = 'usage';
    config.corejs = '3.23';
  })

  .enableSassLoader()
  .enableTypeScriptLoader()
  .enableReactPreset()
  .addAliases({
    '@': path.resolve(__dirname, 'assets'),
  })

  // Asset modules (new in Webpack 5)
  .configureImageRule({
    type: 'asset',
    maxSize: 4 * 1024, // 4kb
  })
  .configureFontRule({
    type: 'asset',
  });

// uncomment to get integrity="..." attributes on your script & link tags
// requires WebpackEncoreBundle 1.4 or higher
//.enableIntegrityHashes(Encore.isProduction())

// uncomment if you're having problems with a jQuery plugin
//.autoProvidejQuery()

module.exports = Encore.getWebpackConfig();
