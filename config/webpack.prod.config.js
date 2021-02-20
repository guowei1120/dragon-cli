const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const WebpackBaseConfig = require('./webpack.base.config')
const TerserPlugin = require('terser-webpack-plugin')
// const PurgeCSSPlugin = require('purgecss-webpack-plugin')
// const path = require('path')
// const glob = require('glob-all')
const { merge } = require('webpack-merge')

module.exports = merge(WebpackBaseConfig, {
  mode: 'development',
  devtool: 'hidden-source-map',
  optimization: {
    usedExports: true, // 开启js tree saking
    minimize: true,
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true, // 使用多进程并发运行以提高构建速度
        terserOptions: {
          format: {
            comments: false, // 是否保留注释
          },
        },
        extractComments: false, // 提取注释到一个文件
      }),
    ],
    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'commons',
          chunks: 'initial',
          minChunks: 2,
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.(less|css)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
            },
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 3,
              modules: {
                localIdentName: '[local]__[hash:base64:5]',
              },
            },
          },
          'postcss-loader',
          'less-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './template/index.html',
      filename: 'index.html',
      minify: {
        // 压缩HTML文件
        removeComments: true, // 移除HTML中的注释
        collapseWhitespace: true, // 删除空白符与换行符
        minifyCSS: true, // 压缩内联css
      },
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name]-[contenthash:6].css',
    }),
    new OptimizeCSSAssetsPlugin({
      cssProcessor: require('cssnano'), // 指定使用 cssnano压缩
    }),
    // css-loader 开启模块后，会导致css tree-shaking失败
    // new PurgeCSSPlugin({
    //   paths: glob.sync([
    //     // 要做 CSS Tree Shaking 的路径文件
    //     path.resolve(__dirname, '../', './template/*.html'), // 对 html 文件中的css进行 tree shaking
    //     path.resolve(__dirname, '../', './src/*.js'), // 对js中引入的css进行tree shaking
    //     path.resolve(__dirname, '../', './src/*.tsx'),
    //   ]),
    // }),
  ],
})
