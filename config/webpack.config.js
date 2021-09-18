const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// 获取文件路径，相对于根目录
const getFileUrl = url => path.resolve(__dirname, `../${url}`);
// console.log(process.env.NODE_ENV);

module.exports = {
	mode: 'development',
	entry: getFileUrl('/src/index.js'),
	output: {
		path: getFileUrl('/dist'),
		filename: 'js/[name].[contenthash].js',
		clean: true,
	},
	module: {
		rules: [
			{
				test: /\.ts|tsx|js$/,
				exclude: [/(node_modules)/],
				use: {
					loader: 'babel-loader',
					options: {
						cacheDirectory: true,
					},
				},
			},
			{
				test: /\.css|less/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							importLoaders: 2,
							modules: {
								localIdentName: '[name]__[local]--[hash:base64:5]',
							},
						},
					},
					'postcss-loader',
					'less-loader',
				],
			},
			{
				test: /\.(jpg|png|jpe?g|gif|svg)(\?.*)?$/i,
				use: [
					{
						loader: 'url-loader',
						options: {
							outputPath: 'images', // 输出目录
							limit: 3 * 1024,
						},
					},
				],
			},
			{
				test: /\.(eot|woff2?|ttf|svg)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							name: '[name]-[hash:5].min.[ext]',
							limit: 5000,
							publicPath: '/fonts',
							outputPath: 'fonts',
						},
					},
				],
			},
		],
	},
	devServer: {
		static: false,
		compress: true,
		static: './dist',
		port: 8080,
		hot: true,
		client: {
			logging: 'none',
			progress: true,
		},
		proxy: {
			'/api': {
				target: 'http://localhost:3000',
				pathRewrite: { '^/api': '' },
			},
		},
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			title: '页面标题',
			filename: 'index.html',
			template: getFileUrl('/src/index.html'),
			minify: false,
		}),
	],
};
