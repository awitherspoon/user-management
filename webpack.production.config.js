var path = require('path')
var nodeModulesPath = path.resolve(__dirname, 'node_modules')
var buildPath = path.resolve(__dirname, 'dist')
var mainPath = path.resolve(__dirname, 'src', 'index.jsx')

var config = {

  devtool: 'cheap-module-source-map',
  entry: mainPath,
  output: {
    path: buildPath,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: [nodeModulesPath]
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.less$/,
        loader: 'style!css!less'
      },
      {
        test: /\.css$/,
        loader: 'style!css'
      },
      {
        test: /\.gif$/,
        loader: 'url-loader?mimetype=image/png'
      },
      {
        test: /\.woff(2)?(\?v=[0-9].[0-9].[0-9])?$/,
        loader: 'url-loader?mimetype=application/font-woff'
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9].[0-9].[0-9])?$/,
        loader: 'file-loader?name=[name].[ext]'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.less', '.css'],
    alias: {
      components: path.join(__dirname, 'src', 'app', 'components'),
      js: path.join(__dirname, 'src')
    }
  }
}

module.exports = config
