const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  const config = {
    entry: './src/index.tsx',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/',
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        },
        {
          test: /\.s?css$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.(jpg|png|gif|svg|webp)$/i,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8192,
                name: '[name].[ext]',
                outputPath: 'images',
                publicPath: '/images',
              },
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    plugins: [
      new webpack.ProgressPlugin(),
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html',
      }),
      new CopyWebpackPlugin({
        patterns: [
          { from: 'public/_redirects', to: '.' },
          { from: 'public/images', to: 'images' },
        ],
      }),
    ],
    devServer: {
      historyApiFallback: true,
      open: true,
      hot: true,
      port: 9080,
    },
  };

  if (isProduction) {
    config.plugins.push(
      new MiniCssExtractPlugin({
        filename: '[name].css',
      }),
    );
  } else {
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
  }

  return config;
};
