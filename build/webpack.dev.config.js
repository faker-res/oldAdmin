const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config.js');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const fs = require('fs');
const ip = require('ip');
const IP = ip.address();
const path = require("path");

fs.open('./build/env.js', 'w', function (err, fd) {
    const buf = 'export default "development";';
    fs.write(fd, buf, 0, 'utf-8', function (err, written, buffer) {}); //node 升级10.0后
});

module.exports = merge(webpackBaseConfig, {
    // watch选项优化开发体验，减少Webpack消耗的内存
    watch: true,
    watchOptions: {
        ignored: /node_modules/, // 设置不监听的目录
        aggregateTimeout: 300, // 文件变动后多久发起构建，越大越好
        poll: 1000, // 每秒询问次数，越小越好
    },
    devtool: 'source-map',
    output: {
        publicPath: '/system/', // publicPath 相当于虚拟路径，其映射于指定的output.path
        filename: '[name].js',
        chunkFilename: '[name].chunk.js'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"'
            }
        }),
        new OpenBrowserPlugin({
            url: 'http://localhost:8888'
        }),
        new ExtractTextPlugin({
            filename: '[name].css',
            allChunks: true
        }),
        new webpack.optimize.CommonsChunkPlugin({ // 抽离第三方库
            name: 'vendors',
            filename: '[name].js',
            minChunks: function (module, count) {
                return (
                    module.resource &&
                    /\.js$/.test(module.resource) &&
                    module.resource.indexOf(path.join(__dirname, '../node_modules')) === 0
                )
            }
        }),
        new HtmlWebpackPlugin({
            title: '后台管理中心',
            favicon: './td_icon.ico',
            filename: 'index.html',
            template: './index.html',
            inject: true
        })
    ],
    devServer: {
        historyApiFallback: true,
        stats: {
            colors: true
        },
        host: '0.0.0.0',
        port: '8888',
        proxy: { //匹配代理的url
            '/api': {
                // target: 'http://admin.lx851.com/', // 不分库
                target: 'http://fkadmin.lx851.com', // 分库
                // target: 'http://tg-backend.lx861.com/', // 目标服务器地址
                changeOrigin: true
            }
        }
    }
});

// 分库：
// 前台：http://fk.lx851.com
// 后台：http://fkadmin.lx851.com/system

// 不分库：
// 前台：http://tg.7900005.com
// 后台：http://admin.lx851.com/system