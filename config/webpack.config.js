const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const WebpackBar = require('webpackbar');

// 获取文件路径，相对于根目录
const getFileUrl = url => path.resolve(__dirname, `../${url}`);

// 是否是生产
const isProduction = process.env.NODE_ENV === 'production';

// 入口配置
const getEntry = () => {
	const initEntry = {
		hot: 'react-hot-loader/patch',
		app: getFileUrl('/src/index.js'),
	};
	if (isProduction) {
		Reflect.deleteProperty(initEntry, 'hot');
	}
	return initEntry;
};

// 开发环境server配置
const getDevServer = () => {
	if (isProduction) {
		return {};
	}
	return {
		static: false,
		compress: true,
		static: './dist',
		port: 8080,
		hot: true,
		client: {
			logging: 'error',
		},
		proxy: {
			'/api': {
				target: 'http://localhost:3000',
				pathRewrite: { '^/api': '' },
			},
		},
	};
};

// 插件配置
const getPlugins = () => {
	const normalPlugins = [
		new HtmlWebpackPlugin({
			title: '页面默认标题',
			env: process.env.NODE_ENV,
			description: '页面描述',
			filename: 'index.html',
			template: getFileUrl('/src/index.html'),
			minify: false,
		}),
		new WebpackBar(),
	];
	if (isProduction) {
		normalPlugins.push(new MiniCssExtractPlugin({ filename: 'css/[name].[contenthash].css', chunkFilename: '[id].css' }));
	}
	return normalPlugins;
};

const config = {
	entry: getEntry(),
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
					isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
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
							outputPath: 'fonts',
						},
					},
				],
			},
		],
	},
	optimization: {
		usedExports: true,
		minimize: true,
		minimizer: [
			new TerserPlugin({
				parallel: true,
				terserOptions: {
					format: {
						comments: false,
					},
				},
				extractComments: false,
			}),
		],
		splitChunks: {
			cacheGroups: {
				commons: {
					name: 'commons',
					chunks: 'initial',
					minChunks: 2,
					reuseExistingChunk: true,
					priority: -20,
				},
				vendors: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
					priority: -10,
					chunks: 'all',
				},
			},
		},
	},
	stats: isProduction ? 'normal' : 'errors-only',
	resolve: {
		alias: {
			'@@': getFileUrl('/src'),
		},
		extensions: ['.tsx', '.ts', '.js'],
	},
	// externals: {
	// 	react: 'react',
	// 	'react-dom': 'react-dom',
	// },
	devtool: isProduction ? 'hidden-source-map' : 'eval-source-map',
	devServer: getDevServer(),
	plugins: getPlugins(),
};

module.exports = config;
