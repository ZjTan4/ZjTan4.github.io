const HtmlWebpackPlugin = require("html-webpack-plugin");
const paths = require("./paths");

module.exports = {
    entry: `${paths.src}/index.tsx`,
    output: {
        path: paths.dist, 
        filename: "[name].[contenthash].js",
        clean: true,
        assetModuleFilename: `${paths.assets}/[hash][ext][query]`
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
    module: {
        rules: [
            { 
                // .ts, .tsx files
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                // .css files
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: paths.html,
            filename: "index.html",
        }),
    ],
};