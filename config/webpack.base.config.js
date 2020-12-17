const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const Webpackbar = require('webpackbar')
const path = require('path')

const config = {
  entry: {
    app: './src/index.js',
    verndor: ['react', 'react-dom'],
  },
  output: {
    filename: 'js/[name].[hash:6].js',
    path: path.join(__dirname, '../', 'dist'),
  },
  resolve: {
    extensions: ['.js', 'ts', '.tsx', '.jsx'],
    alias: {
      '@@': path.resolve(__dirname, '../src'),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'My app',
      template: './template/index.html',
      filename: 'index.html',
      minify: true, // 开启关闭html压缩
    }),
    new CleanWebpackPlugin(),
    new Webpackbar(),
  ],
}

module.exports = config
