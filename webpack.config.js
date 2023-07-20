const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: {
    main: './src/index.js',
  },
  resolve: {
    modules: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, './src'),
    ],
    alias: {
      "@": path.resolve(__dirname, './src')
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.styl$/,
        loader: "stylus-loader", // compiles Styl to CSS
      }
    ],
  },
  plugins: [
      new HtmlWebpackPlugin({
          template: path.join(__dirname, 'public', 'index.html'),
      }),
  ],
}