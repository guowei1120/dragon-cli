const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const path = require('path')

const config = {
  entry: {
    app: './src/index.js',
    verndor: ['react', 'react-dom'],
  },
  output: {
    filename: 'js/[name].[hash:6].js',
    path: path.resolve(__dirname, '../', 'dist'),
  },
  resolve: {
    extensions: ['.js', 'ts', '.tsx', '.jsx'],
    alias: {
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@utils': path.resolve(__dirname, 'src/utils'),
    },
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    hot: true,
    port: 7000,
    quiet: true,
  },
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
  mode: 'production',
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

  plugins: [
    new HtmlWebpackPlugin({
      title: 'My app',
      template: './template/index.html',
      filename: 'index.html',
      minify: true, // 开启关闭html压缩
    }),
    new CleanWebpackPlugin(),
  ],
}

module.exports = config
