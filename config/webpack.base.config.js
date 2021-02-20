const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const Webpackbar = require('webpackbar')
const path = require('path')

const config = {
  entry: {
    app: './src/index.tsx',
    verndor: ['react', 'react-dom'],
  },
  output: {
    filename: 'js/[name].[hash:6].js',
    path: path.join(__dirname, '../', 'dist'),
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.jsx'],
    alias: {
      '@@': path.resolve(__dirname, '../src'),
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
  plugins: [new CleanWebpackPlugin(), new Webpackbar()],
}

module.exports = config
