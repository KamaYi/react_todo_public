/* config-overrides.js */
const { override, fixBabelImports, addLessLoader, addWebpackAlias, overrideDevServer } = require("customize-cra");

const path = require("path");

const proxySetting = {
    '/user/': {
        target: 'http://127.0.0.1:4000',
        changeOrigin: true,
        pathRewrite: {
            '^/user': '/',
        },
    }
}
module.exports = {
    webpack: override(
        fixBabelImports("import", {
            libraryName: "antd",
            libraryDirectory: "es",
            style: "css"
        }),
        addLessLoader({
            lessOptions: {
                javascriptEnabled: true,
                modifyVars: { '@primary-color': '#1DA57A' },
            },
        }),
        // 配置路径别名
        addWebpackAlias({
            "@": path.resolve(__dirname, 'src')
        })
    ),
    devServer: overrideDevServer(config => {
        console.log('config: ', config);
        config.proxy = proxySetting
        config.host = '127.0.0.1'
        console.log('config: ', config);
        return config
    })
};