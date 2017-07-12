const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
    source: path.join(__dirname,'source'),
    build: path.join(__dirname,'build')
}

module.exports = {
    entry: PATHS.source +'/index.js',
    devServer: {
        contentBase: PATHS.source,
        inline:true,
        port: 5000
    },
    output:{
        path: PATHS.build,
        filename: '[name].js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: PATHS.source+'/index.pug'
        })
    ],
    module:{
        rules:[{
            test:/\.pug$/,
            loader:'pug-loader',
            options:{
                pretty:true
            }
        }]
    }
}

