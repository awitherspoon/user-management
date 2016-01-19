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
        test: /\.less$/,
        loader: 'style!css!less'
      },
      {
        test: /\.css$/,
        loader: 'style!css'
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
