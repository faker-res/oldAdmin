const path = require("path");
const os = require("os");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HappyPack = require("happypack");
const happyThreadPool = HappyPack.ThreadPool({
    size: os.cpus().length
});

function resolve(dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    cache: true,  //开启缓存功能，这样只有变化的文件才会重新加载，可提升构建速度
    entry: {
        main: ["@/main", "babel-polyfill", "es6-string-polyfills"],
    },
    output: {
        path: path.resolve(__dirname, "../dist")
    },
    module: {
        rules: [{
                test: /\.vue$/,
                loader: "vue-loader",
                options: {
                    loaders: {
                        css: "vue-style-loader!css-loader",
                        less: "vue-style-loader!css-loader!less-loader"
                    },
                    transformToRequire: {
                        "audio": "src"
                    },
                    postLoaders: {
                        html: "babel-loader"
                    }
                }
            },
            {
                test: /iview\/.*?js$/,
                loader: "happypack/loader?id=happybabel",
                exclude: /node_modules/
            },
            {
                test: /\.js$/,
                loader: "happypack/loader?id=happybabel",
                exclude: /node_modules/
            },
            {
                test: /\.js[x]?$/,
                include: [resolve("src")],
                exclude: /node_modules/,
                loader: "happypack/loader?id=happybabel"
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: ["css-loader?minimize", "autoprefixer-loader"],
                    fallback: "style-loader"
                })
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    use: ["css-loader?minimize", "autoprefixer-loader", "less-loader"],
                    fallback: "style-loader"
                })
            },
            {
                test: /\.(woff|svg|eot|ttf)\??.*$/,
                loader: "url-loader"
            },
            {
                test: /\.(html|tpl)$/,
                loader: "html-loader"
            },
            {
                test: /\.(gif|jpg|png)\??.*$/,
                loader: 'url-loader',
                options: {
                    limit: 1,
                    name: '[name].[hash:8].[ext]',
                    // publicPath: 'assets/' // cdn
                    outputPath: 'assets/imgs/'
                }
            },
            {
                test: /\.(mp3|wav)\??.*$/,
                loader: 'url-loader',
                options: {
                    limit: 1,
                    name: '[name].[hash:8].[ext]',
                    // publicPath: 'assets/' // cdn
                    outputPath: 'assets/audio/'
                }
            }
        ]
    },
    plugins: [
        new HappyPack({
            id: "happybabel",
            loaders: ["babel-loader"],
            threadPool: happyThreadPool,
            verbose: true
        })
    ],
    resolve: {
        extensions: [".js", ".vue", ".json", ".css"], // 可使用的拓展名
        modules: [ // 告诉 webpack 解析模块时应该搜索的目录
            resolve('../src'), //实际返回了src的路径，会优先于node_modules搜索
            resolve('../node_modules')
        ],
        alias: {
            vue: "vue/dist/vue.esm.js",
            "@": resolve("../src")
        }
    }
};