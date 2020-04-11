const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const merge = require("webpack-merge");
const PnpWebpackPlugin = require(`pnp-webpack-plugin`);

const common = {
  entry: {
    main: "./src/index.tsx",
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "gabeacon.js",
    library: `GaBeacon`,
    libraryTarget: "umd",
    libraryExport: "default",
    globalObject: "this",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: "ts-loader",
        options: {
          transpileOnly: true,
        },
      },
    ],
  },
  plugins: [new webpack.ProgressPlugin()],
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    plugins: [PnpWebpackPlugin],
  },
  resolveLoader: {
    plugins: [PnpWebpackPlugin.moduleLoader(module)],
  },
};

const development = {
  mode: "development",
  devtool: "eval-source-map",
  devServer: {
    port: 8000,
    host: "0.0.0.0",
    hot: true,
  },
  plugins: [new webpack.HotModuleReplacementPlugin(), new HtmlWebpackPlugin()],
};

const production = {
  mode: "production",
  plugins: [new CleanWebpackPlugin()],
};

module.exports = (env = {}) => {
  return merge(common, env.production ? production : development);
};
