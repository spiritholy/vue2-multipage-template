var ExtractTextPlugin = require('extract-text-webpack-plugin')

exports.vendorExtractTextPlugin = new ExtractTextPlugin('css/vendor.css')

exports.customExtractTextPlugin = new ExtractTextPlugin('css/[name].css')
