const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    //webpack配置
    entry: './index.js', //入口文件
    output: {
        filename: 'built.js', //输出文件名和路径
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader', 'css-loader',
                ]
            },
            {
                //处理
                test: /\.html$/,
                loader: 'html-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
        template: './index.html'
        })
    ],
    //模式 开发环境/生产环境
    mode: 'development'
}
