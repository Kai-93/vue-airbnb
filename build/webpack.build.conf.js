'use strict';
const path = require('path');
const utils = require('./utils');
const webpack = require('webpack');
const config = require('../config');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const env = require(`../config/${process.env.BUILD_ENV}.env`);
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const webpackConfig = merge(baseWebpackConfig, {
  mode: process.env.BUILD_ENV,
  module: {},
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[name].[chunkhash].js'),
  },
  optimization: {
    // 使用之后，公用模块中修改不影响bundel的hash值
    // webpack的runtime
    runtimeChunk: {
      name: 'manifest',
    },
    splitChunks: {
      chunks: 'all',
      minSize: 10000, // 形成一个新代码块最小的体积
      maxSize: 0,
      minChunks: 1, // 引入一次及以上被打包
      maxAsyncRequests: 10, // 按需加载时候最大的并行请求数
      maxInitialRequests: 10, // 最大初始化请求数
      automaticNameDelimiter: '.', // 打包分割符
      name: true,
      cacheGroups: {
        vue: {
          test(module, chunks) {
            return (
              module.resource &&
              module.resource.includes('node_modules') &&
              module.resource.includes('node_modules/vue')
            );
          },
          chunks: 'all',
          priority: 100, // 设置高于async-commons，避免打包到async-common中
          minChunks: 1,
          name: 'vue',
        },
        'element-ui.common': {
          test(module, chunks) {
            return (
              module.resource &&
              module.resource.includes('node_modules') &&
              module.resource.includes('element-ui.common')
            );
          },
          chunks: 'all',
          priority: 95,
          minChunks: 1,
          name: 'element-ui.common',
        },
        'element-other': {
          test(module, chunks) {
            return (
              module.resource &&
              module.resource.includes('node_modules') &&
              module.resource.includes('element')
            );
          },
          chunks: 'all',
          priority: 90,
          minChunks: 1,
          name: 'element-other',
        },
        // 第三方代码
        // 使用一次以上的
        vendor: {
          test(module, chunks) {
            return module.resource && module.resource.includes('node_modules');
          },
          // https://webpack.docschina.org/plugins/split-chunks-plugin/#splitchunks-chunks
          chunks: 'all',
          priority: 85,
          // https://webpack.docschina.org/plugins/split-chunks-plugin/#splitchunks-minchunks
          minChunks: 1,
          name: 'vendor',
        },
        // 不管同/异步，使用两次以上的模块抽离
        // 使用两次以上的
        common: {
          test(module, chunks) {
            return module.resource && !module.resource.includes('node_modules');
          },
          // https://webpack.docschina.org/plugins/split-chunks-plugin/#splitchunks-chunks
          chunks: 'all',
          // https://webpack.docschina.org/plugins/split-chunks-plugin/#splitchunks-minchunks
          minChunks: 2,
          priority: 80,
          name: 'common',
        },
      },
    },
    minimizer: [
      // https://github.com/webpack-contrib/uglifyjs-webpack-plugin
      // https://github.com/webpack-contrib/uglifyjs-webpack-plugin#minify
      // https://github.com/mishoo/UglifyJS2
      // 此处配置跟mode相关， production开启
      new UglifyJsPlugin({
        test: /\.jsx?$/,
        // 过滤掉以".min.js"结尾的文件，我们认为这个后缀本身就是已经压缩好的代码，没必要进行二次压缩
        exclude: /\.min\.js$/,
        cache: true,
        // https://github.com/webpack-contrib/uglifyjs-webpack-plugin#parallel
        // 开启并行压缩，充分利用cpu
        parallel: true,
        // https://github.com/webpack-contrib/uglifyjs-webpack-plugin#extractcomments
        // 提取所有的注释成单独的文件
        extractComments: false,
        sourceMap: config.build.productionSourceMap,
        // https://github.com/mishoo/UglifyJS2#compress-options
        uglifyOptions: {
          compress: {
            // 内嵌己定义但是只用到了一次 的变量
            collapse_vars: true,
            // 移出无法访问的代码
            dead_code: true,
            // 移除console
            drop_console: true,
            // 移除 debugger
            drop_debugger: true,
            // 移除没有引用的函数和变量
            unused: true,
          },
          // https://github.com/mishoo/UglifyJS2#output-options
          output: {
            // 是否输出美化的代码，false意为压缩
            beautify: false,
            // 是否保留注释
            comments: false,
          },
        },
      }),
    ],
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(env),
    }),
    // 分离css
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: utils.assetsPath('css/[name].[chunkhash].css'),
      chunkFilename: utils.assetsPath('css/[name].[chunkhash].css'),
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    // https://github.com/nmfr/optimize-css-assets-webpack-plugin
    new OptimizeCSSPlugin({
      cssProcessorOptions: config.build.productionSourceMap
        ? { safe: true, map: { inline: false } }
        : { safe: true },
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: config.build.index,
      template: 'src/index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        // removeAttributeQuotes: true,
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency',
    }),
    // keep module.id stable when vendor modules does not change
    new webpack.HashedModuleIdsPlugin(),
    // enable scope hoisting
    new webpack.optimize.ModuleConcatenationPlugin(),
    // 依赖图
    // new BundleAnalyzerPlugin(),
  ],
});

if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin');

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' + config.build.productionGzipExtensions.join('|') + ')$',
      ),
      threshold: 10240,
      minRatio: 0.8,
    }),
  );
}

if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin;
  webpackConfig.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = webpackConfig;
