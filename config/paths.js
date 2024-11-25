const path = require("path");

module.exports = {
    root: path.resolve(__dirname, "../"),
    src: path.resolve(__dirname, "../src"),
    dist: path.resolve(__dirname, "../dist"),
    public: path.resolve(__dirname, "../public"),
    html: path.resolve(__dirname, "../public/index.html"),
    components: path.resolve(__dirname, "../src/components"),
    assets: path.resolve(__dirname, "../src/assets"),
};