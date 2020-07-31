// webpack配置文件 运行webpack时会加载配置
// resolve用来拼接绝对路径
const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
    //webpack配置
    entry: './src/js/index.js', //入口文件
    output: {
        filename: 'built.js', //输出文件名和路径
        path: resolve(__dirname, 'build') //__dirname nodejs的一个变量，代表当前文件的绝对路径
    },
    //loader的配置
    module: {
        rules: [
            //详细loader配置
            {
                test: /\.css$/,//匹配哪些文件
                use: [ /*使用哪些loader，从右到左执行
                       创建style标签，将js中的样式资源添加进去，放到head中生效*/
                    'style-loader', 'css-loader',
                    /*将css文件变成commonjs模块加载到js中，内容为样式字符串*/
                    // MiniCssExtractPlugin.loader,//打包多个css
                    // {
                    //     loader: 'css-loader'
                    // }
                ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader',
                options: {
                    limit: 8 * 1024,//8kb
                    name: '[hash:10].[ext]',
                    esModule: false //关闭ES6模块化
                }
            },
            {
                //处理
                test: /\.html$/,
                loader: 'html-loader'
            }
        ]
    },
    //plugins的配置
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: "../build/styles.css"
            }) 
    ],
    //模式 开发环境/生产环境
    mode: 'development',
    // mode: 'production' //压缩代码
    devServer: {
        contentBase: resolve(__dirname, 'build'),
        compress: true,
        port: 5500,
        open: true,
        hot: true
    }
}
