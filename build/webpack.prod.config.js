const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config.js');
const CompressionWebpackPlugin = require('compression-webpack-plugin'); //gzip 压缩
// const ImageminPlugin = require('imagemin-webpack-plugin').default //图像压缩
const os = require('os');
const fs = require('fs');
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const Version = new Date().getTime();

fs.open('./build/env.js', 'w', function (err, fd) {
    const buf = 'export default "production";';
    fs.write(fd, buf, 0, 'utf-8', function (err, written, buffer) {}); //node 升级10.0后
});

module.exports = merge(webpackBaseConfig, {
    output: {
        publicPath: '/system/', //  服务器域名 
        filename: 'js/[name].[chunkhash:8].' + Version + '.js',
        chunkFilename: 'js/[name].[chunkhash:8].chunk.js'
    },
    plugins: [
        new cleanWebpackPlugin(['dist/*'], {
            root: path.resolve(__dirname, '../')
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new ExtractTextPlugin({
            filename: 'css/[name].[chunkhash:8].css',
            allChunks: false
        }),
        new webpack.optimize.CommonsChunkPlugin({ // 抽离第三方库
            name: 'vendors',
            filename: 'js/[name].js',
            minChunks: function (module, count) {
                return (
                    module.resource &&
                    /\.js$/.test(module.resource) &&
                    module.resource.indexOf(path.join(__dirname, '../node_modules')) === 0
                )
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({ // 抽离webpack运行文件
            name: 'runtime',
            filename: 'js/[name].js',
            chunks: ['vendors']
        }),
        new webpack.optimize.CommonsChunkPlugin({
            children: true,
            async: 'children-async'
        }),
        new ParallelUglifyPlugin({ // 多进程并行处理压缩。
            cacheDir: '.cache/', // 缓存压缩后的结果，下次遇到一样的输入时直接从缓存中获取压缩后的结
            uglifyJS: {
                output: {
                    comments: false, // 删除所有注释
                    beautify: false // 最紧凑的输出，不保留空格和制表符
                },
                compress: {
                    warnings: false, // 删除无用代码时不输出警告
                    drop_console: true, // 删除所有console语句，可以兼容IE
                    collapse_vars: true, // 内嵌已定义但只使用一次的变量
                    reduce_vars: true, // 提取使用多次但没定义的静态值到变量
                }
            }
        }),
        // new ImageminPlugin({
        //     pngquant: {
        //         quality: '95-100'
        //     }
        // }),
        new CopyWebpackPlugin([{
            from: 'src/assets/js/stomp.js',
            to: 'assets/js'
        }, ]),
        new CompressionWebpackPlugin({
            asset: '[path].gz[query]', // 目标文件名
            algorithm: 'gzip', // 使用gzip压缩
            test: /\.js$|\.html$|\.css$/,
            threshold: 10240, // 资源文件大于10240B=10kB时会被压缩
            minRatio: 0.8 // 最小压缩比达到0.8时才会被压缩
        }),
        new HtmlWebpackPlugin({
            title: '后台管理中心',
            favicon: './td_icon.ico',
            filename: 'index.html',
            template: './src/template/index.html'
        }),
        // new BundleAnalyzerPlugin()
    ]
});