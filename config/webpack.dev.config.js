const WebpackBaseConfig = require('./webpack.base.config')
const { merge } = require('webpack-merge')
const { HotModuleReplacementPlugin } = require('webpack')
const path = require('path')

module.exports = merge(WebpackBaseConfig, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    hot: true,
    port: 7000,
    stats: 'errors-only',
  },
  module: {
    rules: [
      {
        test: /\.js|.jsx|.tsx|.ts/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.less/,
        use: [
          'style-loader',
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
        test: /\.css/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
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
  plugins: [new HotModuleReplacementPlugin()],
})
