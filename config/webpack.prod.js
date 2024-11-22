const { merge } = require("webpack-merge");
// extract css into seperate files, instead of injecting <style> into HTML like in dev mode
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); 
// compress the extracted css file, replacing the original optimize-css-assets-webpack-plugin
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
// delete the unnessasary space and comments, optimizing the js files
const TerserPlugin = require("terser-webpack-plugin");

const paths = require("./paths");
const commonConfig = require("./webpack.common");


module.exports = merge(
    commonConfig,
    {
        mode: "production",
        output: {
            filename: "[name].[contenthash].js",
            publicPath: "/",
        },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [MiniCssExtractPlugin.loader, "css-loader"],
                },
            ],
        },
        optimization: {
            minimize: true,
            minimizer: [
                new TerserPlugin({
                    extractComments: false,
                }),
                new CssMinimizerPlugin(),
            ],
            splitChunks: {
                chunks: "all",
            },
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: "assets/[name].[contenthash].css",
            }),
        ],
    }
)