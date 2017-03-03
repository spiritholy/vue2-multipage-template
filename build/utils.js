var path = require('path')
var config = require('../config')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')

var ExtractCss = require('./extract-css')

exports.assetsPath = function (_path) {
  var assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
  options = options || {}

  var cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: process.env.NODE_ENV === 'production',
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    var loaders = [cssLoader]
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractCss.customExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // http://vuejs.github.io/vue-loader/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  var output = []
  var loaders = exports.cssLoaders(options)
  for (var extension in loaders) {
    var loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader,
      exclude: process.env.NODE_ENV === 'production' ? [path.resolve(__dirname, '..', 'node_modules')] : []
    })
  }
  if (options.extract) {
    output.push({
      test: new RegExp('\\.' + 'css' + '$'),
      enforce: "pre",
      use: ExtractCss.vendorExtractTextPlugin.extract({
        use: {
          loader: 'css-loader',
          options: {
            minimize: process.env.NODE_ENV === 'production',
            sourceMap: options.sourceMap
          }
        },
        fallback: 'vue-style-loader'
      }),
      include: [path.resolve(__dirname, '..', 'node_modules')]
    })
  }
  return output
}


exports.createHtmlWebpackPlugins = function () {
  return config.build.pages.map(item => {
    var obj = process.env.NODE_ENV === 'production' ? {
      filename: path.join(__dirname, `../dist/${item}.html`),
      template: 'index.html',
      inject: true,
      chunks: [item, 'vendor', 'manifest'],
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    } : {
      filename: `${item}.html`,
      template: 'index.html',
      inject: true,
      chunks: [item, 'vendor', 'manifest'],
    }

    return new HtmlWebpackPlugin(obj)
  })
}
