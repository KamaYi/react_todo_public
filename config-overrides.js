/* config-overrides.js */
const { override, fixBabelImports, addLessLoader, addWebpackAlias, } = require("customize-cra");
const path = require("path");
console.log('path: ', path);
console.log('path: ', path.resolve(__dirname, "src"));
function resolve(dir) {
    return path.join(__dirname, dir);
}
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
        ["@"]: path.resolve(__dirname, "src")
    }),
    config =>{
        config.resolve.alias = {
            "@": path.resolve(__dirname, "src")
        };
        return config;
    }
);