const { merge } = require("webpack-merge");
const paths = require("./paths");
const commonConfig = require("./webpack.common");

module.exports = merge(
    commonConfig,
    {
        mode: "development",
        devtool: "eval-source-map",
        devServer: {
            static: paths.public,
            open: true,
            compress: true,
            port: 3000,
            hot: true,
            historyApiFallback: true,
        },
    }
);