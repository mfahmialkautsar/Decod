const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

const isProduction = process.env.NODE_ENV == 'production';
const stylesHandler = isProduction
  ? MiniCssExtractPlugin.loader
  : 'style-loader';

const sharedConfig = {
  mode: isProduction ? 'production' : 'development',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};

const browserConfig = {
  ...sharedConfig,
  entry: './src/client',
  output: {
    path: path.resolve(__dirname, 'build/client'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.s[ac]ss$/i,
        use: [stylesHandler, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: 'asset',
      },
    ],
  },
  plugins: [
    new NodePolyfillPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: 'public',
        },
      ],
    }),
  ],
};

const serverConfig = {
  ...sharedConfig,
  entry: './bin/www',
  target: 'node',
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/env',
              {
                modules: 'commonjs',
              },
            ],
          ],
        },
      },
      {
        test: /\.(c|s[ac])ss$/i,
        use: [stylesHandler, "css-loader", "sass-loader"],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: 'asset',
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    filename: 'index.js',
  },
  plugins: [new CleanWebpackPlugin()],
};

module.exports = () => {
  if (isProduction) {
    browserConfig.plugins.push(
      new MiniCssExtractPlugin(),
      new WorkboxWebpackPlugin.GenerateSW()
    );
    serverConfig.plugins.push(
      new MiniCssExtractPlugin(),
      new WorkboxWebpackPlugin.GenerateSW()
    );
  }

  return [browserConfig, serverConfig];
};
