const path = require('path');

module.exports = (env) => ({
    mode: "none",
    entry: path.resolve('frontend/src/index.js'),
    output: {
        path: path.resolve('src/main/webapp'),
        filename: 'assets/js/main.js',
        assetModuleFilename: 'assets/images/[hash][ext]'
    },
    module: {
        rules: [{
            test: /\.(png|gif|jpe?g|svg|ico|tiff?|bmp)$/i,
            type: 'asset/resource'
        }, {
            test: /\.css$/i,
            use: [
                "style-loader",
                "css-loader"
            ],
        }, {
            test: /\.(sa|sc)ss$/i,
            use: [
                "style-loader",
                { loader: "css-loader", options: { modules: false } },
                "sass-loader",
            ],
        }, {
            test: /\.js|jsx$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
                configFile: path.resolve('frontend/config/babel.config.json')
            }
        }]
    },
    devtool: "eval-source-map",
    devServer: {
        contentBase: path.resolve('frontend/public'),
        watchContentBase: true,
        host: "0.0.0.0",
        port: 9999,
        proxy: {
            '/api': 'http://localhost:8080',
            '/images': 'http://localhost:8080',

        },
        inline: true,
        liveReload: true,
        hot: false,
        compress: true,
        historyApiFallback: true
    },

});