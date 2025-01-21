const webpack = require('webpack');
const path = require('path');

const TerserPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const EslintWebpackPlugin = require('eslint-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const IS_DEVELOPMENT = process.env.NODE_ENV === 'dev';
const dirApp = path.join(__dirname, 'app');
const dirShared = path.join(__dirname, 'shared');
const dirStyles = path.join(__dirname, 'styles');
const dirNode = 'node_modules';

module.exports = {
  stats: {
    warnings: false
  },
	entry: {
		main: path.join(dirApp, 'index.js'),
		styles: path.join(dirStyles, 'index.scss')
	},

	resolve: {
		modules: [
			dirApp,
			dirShared,
			dirStyles,
			dirNode
		]
	},

	plugins: [
		new webpack.DefinePlugin({
			IS_DEVELOPMENT
		}),

		new CopyWebpackPlugin({
			patterns: [{
				from: path.resolve(__dirname, 'shared'), to: ''
			}]
		}),

		new MiniCssExtractPlugin({
			filename: '[name].css',
			chunkFilename: '[id].css'
		}),

		new ImageMinimizerPlugin({
			minimizer: {
				implementation: ImageMinimizerPlugin.imageminMinify,
				options: {
					plugins: [
						['gifsicle', { interlaced: true }],
						['jpegtran', { progressive: true }],
						['optipng', { optimizationLevel: 5 }]
					]
				}
			}
		}),

		new EslintWebpackPlugin({
			extensions: ['js', 'jsx', 'ts', 'tsx'], // Specify file extensions to lint
			fix: true,  // Automatically fix issues
		}),

		new CleanWebpackPlugin()
	],

	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: path.resolve(__dirname, 'node_modules'),
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /\.scss$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							publicPath: '',
						},
					},
					{
						loader: 'css-loader',
					},
					{
						loader: 'postcss-loader',
					},
					{
						loader: 'sass-loader',
            options: {
              sassOptions: {
                quietDeps: true, // Suppress deprecation warnings from dependencies
              },
            },
					},
				],
			},
			{
				test: /\.(jpe?g|png|gif|svg|woff2?|fnt|webp)$/,
				type: 'asset/resource',
				generator: {
					filename: 'fonts/[hash][ext]'
				}
			},
			{
				test: /\.(jpe?g|png|gif|svg|webp)$/i,
				use: [
					{
						loader: ImageMinimizerPlugin.loader,
						options: {
							minimizer: {
								implementation: ImageMinimizerPlugin.imageminMinify,
								options: {
									plugins: [
										'imagemin-gifsicle',
										'imagemin-mozjpeg',
										'imagemin-pngquant',
										'imagemin-svgo',
									],
								},
							},
						},
					},
				],
			},
			{
				test: /\.(glsl|frag|vert)$/,
				loader: 'raw-loader',
				exclude: '/node_modules/',
			},
			{
				test: /\.(glsl|frag|vert)$/,
				loader: 'glslify-loader',
				exclude: '/node_modules/',
			},
		],
	},
	optimization: {
		minimize: true,
		minimizer: [
			new TerserPlugin({
				test: /\.js(\?.*)?$/i,
			}),
		],
	},
};
