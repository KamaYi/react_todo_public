/* config-overrides.js */
const { override, fixBabelImports, addLessLoader, addWebpackAlias, } = require("customize-cra");
const path = require("path");
module.exports = override(
    fixBabelImports("import", {
        libraryName: "antd",
        libraryDirectory: "es",
        style: "css"
    }),
    addLessLoader({
        lessOptions: {
            javascriptEnabled: true,
            modifyVars: { '@primary-color': '#2abfe1cf' },
        },
    }),
    // 配置路径别名
    addWebpackAlias({
        "@": path.resolve(__dirname, 'src')
    }),
);