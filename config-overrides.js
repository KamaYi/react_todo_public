/* config-overrides.js */
const { override, fixBabelImports, addLessLoader, addWebpackAlias, overrideDevServer } = require("customize-cra");

const path = require("path");

// 打包配置
const addCustomize = () => config => {
    if (process.env.NODE_ENV === 'production') {
        // 关闭sourceMap
        config.devtool = false;
        // 配置打包后的文件位置
        config.output.path = __dirname + '../dist/';
        config.output.publicPath = './';
        // 添加js打包gzip配置
        config.plugins.push(
            new CompressionWebpackPlugin({
                test: /\.js$|\.css$/,
                threshold: 1024,
            }),
        )
    }
    return config;
}

// 跨域配置
const devServerConfig = () => config => {
    return {
        ...config,
        // 服务开启gzip
        compress: true,
        proxy: {
            '/user': {
                target: 'http://127.0.0.1:4000',
                changeOrigin: true,
                pathRewrite: {
                    '^/': '/',
                },
            }
        }
    }
}
module.exports = {
    webpack: override(
        fixBabelImports("import", {
            libraryName: "antd",
            libraryDirectory: "es",
            style: true //这里一定要写true，css和less都不行
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
        }),
        // addCustomize(),
    ),
    devServer: overrideDevServer(devServerConfig())
};