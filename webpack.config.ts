import 'webpack-dev-server';
import * as path from 'path';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as webpack from 'webpack';
import * as CopyWebpackPlugin from 'copy-webpack-plugin';

module.exports = (env: any, argv: any) => {
	return ({
		mode: 'production',
		context: path.join(__dirname, '/src'),
		entry: {
			bundle: [
				path.join(__dirname, '/src/index.tsx'),
			],
		},
		output: {
			filename: '[name].[hash].js',
			chunkFilename: '[name].[hash].js',
			path: path.join(__dirname, '/dist'),
			publicPath: '/',
		},
		resolve: {
			extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
			modules: ['node_modules'],
		},
		module: {
			rules: [
				{
					enforce: 'pre',
					test: /\.(ts|js)x?$/,
					exclude: /node_modules/,
					loader: 'eslint-loader',
				},
				{
					test: /\.(graphql|gql)$/,
					exclude: /node_modules/,
					loader: 'graphql-tag/loader',
				},
				{
					test: /\.(ts|js)x?$/,
					exclude: /node_modules/,
					use: {
						loader: 'babel-loader',
						query: {
							presets: [
								[
									'@babel/preset-env',
									{
										targets: {
											node: 'current',
										},
									},
								],
								'@babel/preset-typescript',
								'@babel/preset-react',
							],
							plugins: [
								'@babel/plugin-transform-runtime',
								['@babel/plugin-proposal-decorators', { legacy: true }],
								['@babel/plugin-proposal-class-properties', { loose: true }],
								// ['@babel/plugin-transform-typescript', {allowNamespaces: true}],
								'@babel/proposal-object-rest-spread',
								'@babel/plugin-proposal-optional-chaining',
								'@babel/plugin-proposal-nullish-coalescing-operator',
							],
						},
					},
				},
				{
					enforce: 'pre',
					test: /\.jsx?$/,
					loader: 'source-map-loader',
				},
				{
					test: /\.css$/,
					use: ['style-loader', 'css-loader'],
				},
				{
					test: /.(png|jpe?g|gif|ttf|otf|eot|svg|woff(2)?|pdf)(\?[a-z0-9]+)?$/,
					use: [{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
						},
					}],
				},
			],
		},
		plugins: [
			new HtmlWebpackPlugin({
				template: path.join(__dirname, './src/index.html'),
				filename: 'index.html',
				inject: 'body',
			}),
			new webpack.DefinePlugin({
				'process.env': {
					// eslint-disable-next-line quote-props
					'NODE_ENV': '\'production\'',
				},
			}),
			new CopyWebpackPlugin([
				{
					from: '**/*',
					to: path.join(__dirname, '../images'),
					force: true,
					context: path.join(__dirname, './src/resources/img'),
					toType: 'dir',
				},
			]),
		],
		optimization: {
			minimize: true,
		},
	});
};
