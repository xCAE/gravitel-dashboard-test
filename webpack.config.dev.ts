import 'webpack-dev-server';
import * as path from 'path';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as webpack from 'webpack';
// eslint-disable-next-line import/no-extraneous-dependencies
import * as CopyWebpackPlugin from 'copy-webpack-plugin';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
module.exports = (env: any, argv: any) => {
	return ({
		mode: 'development',
		context: path.join(__dirname, '/src'),
		entry: {
			// styles: [
			// 'font-awesome/css/font-awesome.min.css',
			// ],
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
		devtool: 'eval-source-map',
		devServer: {
			host: '0.0.0.0',
			disableHostCheck: true,
			historyApiFallback: true,
			hot: true,
			clientLogLevel: 'debug',
			contentBase: [path.join(__dirname, '/src')],
		},
		plugins: [
			new webpack.HotModuleReplacementPlugin(),
			new HtmlWebpackPlugin({
				template: path.join(__dirname, './src/index.html'),
				filename: 'index.html',
				inject: 'body',
			}),
			new webpack.DefinePlugin({
				'process.env': {
					// eslint-disable-next-line quote-props
					'NODE_ENV': '\'development\'',
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
	});
};
