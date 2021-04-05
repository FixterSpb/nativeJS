const path = require('path')
const HTMLWebpackPlugin = require("html-webpack-plugin")
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCSSExtractPlugin = require("mini-css-extract-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const OptimizeCssAssetWebpackPlugin = require("optimize-css-assets-webpack-plugin")
const TerserWebpackPlugin= require("terser-webpack-plugin")

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const optimization = () => {
    const config = {
        splitChunks: {
            chunks: "all"
        }
    }

    if (isProd) {
        config.minimizer = [
            new OptimizeCssAssetWebpackPlugin(),
            new TerserWebpackPlugin()
        ]
    }
    return config
}

module.exports = {
    context: path.resolve(__dirname, "src"),
    mode: "development",
    entry: {
        main: ["@babel/polyfill", "./js/main.js"]
    },
    optimization: optimization(),
    output: {
        filename: "[name].[contenthash].js",
        path: path.resolve(__dirname, "dist")
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: "./index.html",
            minify: {
                collapseWhitespace: isProd
            }
        }), //Позволяет подключать скрипты
        new CleanWebpackPlugin(),
        new MiniCSSExtractPlugin({
            filename: "./css/[name].[contenthash].css"
        }),
        new CopyWebpackPlugin({patterns: [
            {
                from: path.resolve(__dirname, "./src/favicon.ico"),
                to: path.resolve(__dirname, "dist")
            }
        ]})
    ],
    module:{
        rules: [
            {
                test: /.css$/,
                use: [
                    MiniCSSExtractPlugin.loader,
                    "css-loader"
                ]
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }
            }
        ]
    }
}