'use strict';
const path = require('path');
const utils = require('./utils');
const config = require('../config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const HappyPack = require('happypack');
// 构造出共享进程池，进程池中包含5个子进程
const happyThreadPool = HappyPack.ThreadPool({ size: 5 });

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

const createLintingRule = () => ({
  test: /\.(js|vue|ts)$/,
  // loader: 'eslint-loader',
  use: 'happypack/loader?id=eslint',
  enforce: 'pre',
  include: [
    resolve('src'),
    // resolve('test')
  ],
});

module.exports = {
  // Webpack 使用的根目录， string 类型必须是绝对路径
  context: path.resolve(__dirname, '../'),
  entry: {
    main: './src/main.js',
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].[hash].js',
    publicPath:
      process.env.BUILD_ENV !== 'local'
        ? config.build.assetsPublicPath
        : config.dev.assetsPublicPath,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.d.ts', '.js', '.vue', '.json'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      _modules: resolve('node_modules'),
    },
    // https://webpack.docschina.org/configuration/resolve/#resolve-modules
    // 告诉 webpack 解析模块时应该搜索的目录。
    modules: [resolve('node_modules'), resolve('src')],
  },
  module: {
    // https://webpack.js.org/configuration/module/#modulenoparse
    // Ignored files should not have calls to import, require, define or any other importing mechanism.
    noParse: content => {
      const conditions = /现在还没有/;
      return conditions.test(content);
    },
    rules: [
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it uses publicPath in webpackOptions.output
              hmr: !process.env.BUILD_ENV,
            },
          },
          'happypack/loader?id=css',
        ],
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.BUILD_ENV,
            },
          },
          'happypack/loader?id=css',
          'happypack/loader?id=sass',
          // 定义全局sass样式
          {
            loader: 'sass-resources-loader',
            options: {
              // Provide path to the file with resources
              resources: [
                path.resolve(__dirname, './../src/style/theme.scss'),
                path.resolve(__dirname, './../src/style/common.scss'),
              ],
            },
          },
        ],
      },
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      {
        test: /\.jsx?$/,
        use: 'happypack/loader?id=babel',
        include: [
          resolve('src'),
          // resolve('test'),
          resolve('node_modules/webpack-dev-server/client'),
        ],
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: { appendTsSuffixTo: [/\.vue$/] },
        exclude: /node_modules/,
        include: [resolve('src')],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]'),
        },
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]'),
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]'),
        },
      },
    ],
  },
  plugins: [
    // make sure to include the plugin for the magic
    // The plugin is required!
    // https://vue-loader.vuejs.org/guide/#manual-setup
    new VueLoaderPlugin(),
    // 显示打包时间
    new ProgressBarPlugin({
      format: '  build [:bar] ' + ':percent' + ' (:elapsed seconds)',
    }),
    // happypack - babel-loader
    new HappyPack({
      id: 'babel',
      loaders: [
        {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            plugins: ['dynamic-import-webpack'],
          },
        },
      ],
      // 使用共享进程池中的子进程去处理任务
      threadPool: happyThreadPool,
    }),
    // happypack - css-loader
    new HappyPack({
      id: 'css',
      loaders: [
        {
          loader: 'css-loader',
          options: { importLoaders: 1 },
        },
        'postcss-loader',
      ],
      // 使用共享进程池中的子进程去处理任务
      threadPool: happyThreadPool,
    }),
    // happypack - sass-loader
    new HappyPack({
      id: 'sass',
      loaders: [
        {
          loader: 'sass-loader',
          options: {
            // 全局变量定义
            data: '$value: red;',
          },
        },
      ],
      // 使用共享进程池中的子进程去处理任务
      threadPool: happyThreadPool,
    }),
    // happypack - eslint-loader
    new HappyPack({
      id: 'eslint',
      loaders: [
        {
          loader: 'eslint-loader',
          options: {
            formatter: require('eslint-friendly-formatter'),
            emitWarning: !config.dev.showEslintErrorsInOverlay,
          },
        },
      ],
    }),
  ],
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
};
