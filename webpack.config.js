var webpack = require('webpack');
var path = require('path');

var src_path = path.resolve('./src');
var dist_path = path.resolve('./dist');

module.exports = {
    context: src_path,
    entry: [
        'webpack-dev-server/client?http://0.0.0.0:8080', 'webpack/hot/only-dev-server', 'babel-polyfill', './index.js'
    ],
    output: {
        path: dist_path,
        filename: 'index.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['react'],
                        plugins: ['transform-es2015-destructuring', 'transform-es2015-parameters', 'transform-object-rest-spread', 'transform-es2015-modules-commonjs', 'react-hot-loader/babel']
                    }
                }
            }, {
                test: /\.css$/,
                use: 'style-loader!css-loader'
            }, {
                test: /\.png$/,
                use: 'url-loader?limit=100000'
            }, {
                test: /\.jpg$/,
                use: 'file-loader'
            }, {
                test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                use: 'url-loader?limit=10000&mimetype=application/font-woff'
            }, {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                use: 'url-loader?limit=10000&mimetype=application/octet-stream'
            }, {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                use: 'file-loader'
            }, {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                use: 'url-loader?limit=10000&mimetype=image/svg+xml'
            }, {
                test: /\.json$/,
                use: 'json-loader'
            }, {
                test: /\.swf$/,
                use: "file-loader?name=[path][name].[ext]"
            }, {
                test: require.resolve('snapsvg'),
                use: 'imports-loader?this=>window,fix=>module.exports=0'
            },
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({$: 'jquery', jQuery: 'jquery'}),
        new webpack.HotModuleReplacementPlugin(),
    ],
    devServer: {
        contentBase: dist_path,
        inline: false,
        hot: true,
        host: 'localhost' // originally 0.0.0.0
    },
    devtool: 'source-map'
};
