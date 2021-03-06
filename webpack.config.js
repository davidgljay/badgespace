const execSync = require('child_process').execSync
const path = require('path')
const autoprefixer = require('autoprefixer')
const Copy = require('copy-webpack-plugin')
const LicenseWebpackPlugin = require('license-webpack-plugin').LicenseWebpackPlugin
const webpack = require('webpack')
const GIT_HASH = execSync('git rev-parse HEAD').toString().trim()

// Edit the build targets and embeds below.

module.exports = {
  devtool: '#cheap-module-source-map',
  entry: Object.assign({}, {
    'app': [
      'babel-polyfill',
      path.join(__dirname, 'client/scripts/app')
    ],
    'landing': [
      'babel-polyfill',
      path.join(__dirname, 'client/scripts/landing')
    ],
    'embed': [
      'babel-polyfill',
      path.join(__dirname, 'client/scripts/embed')
    ]
  }),
  output: {
    path: path.join(__dirname, 'dist', 'public', 'scripts'),
    publicPath: '/public/',
    filename: '[name].js',
    sourceMapFilename: '[name].js.map',
    library: 'Nametag'
  },
  module: {
    rules: [
      {
        loader: 'babel-loader',
        exclude: /node_modules/,
        test: /\.js$/,
        query: {
          cacheDirectory: true,
          sourceMap: true
        }
      },
      {
        loader: 'json-loader',
        test: /\.json$/,
        exclude: /node_modules/
      },
      {
        loader: 'url-loader?limit=100000',
        test: /\.png$/
      },
      {
        loader: 'file-loader',
        test: /\.(jpg|png|gif|svg)$/
      },
      {
        loader: 'url-loader?limit=100000',
        test: /\.woff$/
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader'
      }
    ]
  },
  plugins: [
    new LicenseWebpackPlugin({
      pattern: /^(MIT|ISC|BSD.*)$/,
      addUrl: true
    }),
    new Copy([
      {
        from: path.join(__dirname, 'client', 'images'),
        to: path.join(__dirname, 'dist', 'public', 'images')
      },
      {
        from: path.join(__dirname, 'client', 'well-known'),
        to: path.join(__dirname, 'dist', 'public', 'well-known')
      },
      {
        from: path.join(__dirname, 'client', 'locales'),
        to: path.join(__dirname, 'dist', 'public', 'locales')
      },
      {
        from: path.join(__dirname, 'client', 'firebase-messaging-sw.js'),
        to: path.join(__dirname, 'dist', 'public', 'firebase-messaging-sw.js')
      },
      {
        from: path.join(__dirname, 'client', 'favicon.ico'),
        to: path.join(__dirname, 'dist', 'public', 'favicon.ico')
      },
      {
        from: path.join(__dirname, 'client', 'manifest.json'),
        to: path.join(__dirname, 'dist', 'public', 'manifest.json')
      },
      {
        from: path.join(__dirname, 'client', 'yaml.js'),
        to: path.join(__dirname, 'dist', 'public', 'yaml.js')
      },
      {
        from: path.join(__dirname, 'client', 'styles'),
        to: path.join(__dirname, 'dist', 'public', 'styles')
      }
    ]),
    autoprefixer,
    new webpack.ProvidePlugin({
      'fetch': 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'VERSION': `"${require('./package.json').version}"`,
        'CLIENT_GIT_HASH': JSON.stringify(GIT_HASH)
      }
    }),
    new webpack.ExtendedAPIPlugin()
  ],
  resolve: {
    modules: [
      path.resolve(__dirname, 'client'),
      'node_modules'
    ]
  }
}
