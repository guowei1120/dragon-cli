const WebpackBaseConfig = require('./webpack.base.config')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { merge } = require('webpack-merge')

module.exports = merge(WebpackBaseConfig, {
  mode: 'production',
  devtool: 'hidden-source-map',
  optimization: {
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
        test: /\.js|.jsx|.tsx|.ts/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(less|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
          'postcss-loader',
          'less-loader',
        ],
      },
      {
        test: /\.(png|svg|jpe?g)$/i,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: 'images/[name].[hash:7].[ext]',
          publicPath: './',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        loader: 'file-loader',
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
  ],
})
