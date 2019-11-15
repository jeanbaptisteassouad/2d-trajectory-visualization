const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = env => {
  return {
    entry: {
      app: './src/app.js'
    },

    plugins: [
      new CopyWebpackPlugin(['static']),
      new HtmlWebpackPlugin({
        inject: 'head',
        filename: 'index.html',
        template: 'static/index.html',
        chunks: ['app']
      }),
      new webpack.DefinePlugin({
        'DEV': env.DEV
      })
    ],

    resolve: {
      modules: [
        path.resolve(__dirname, 'src'),
        'node_modules'
      ]
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel-loader'
        },
        {
          test: /\.vert$|\.frag$/,
          exclude: /(node_modules|bower_components)/,
          use: 'raw-loader'
        },
      ]
    },

    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      globalObject: 'this'
    }
  }
}
