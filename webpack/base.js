const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
	entry: "./src/index.js",
	mode: "development",
	devtool: "eval-source-map",
	devServer: {
		port: 3000,
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
				},
			},
			{
				test: [/\.vert$/, /\.frag$/],
				use: "raw-loader",
			},
			{
				test: /\.(gif|png|jpe?g|svg|xml|ttf|ogg|mp3|wav|m4a)$/i,
				use: {
					loader: "file-loader",
					options: {
						name: "[name].[ext]",
					},
				},
			},
			{
				test: /\.css$/i,
				use: ["style-loader", "css-loader"],
			},
		],
	},
	plugins: [
		new CleanWebpackPlugin({
			root: path.resolve(__dirname, "../"),
		}),
		new webpack.DefinePlugin({
			CANVAS_RENDERER: JSON.stringify(true),
			WEBGL_RENDERER: JSON.stringify(true),
		}),
		new HtmlWebpackPlugin({
			template: "./index.html",
		}),
	],
};
