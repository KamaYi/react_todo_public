/* config-overrides.js */
const { override, fixBabelImports, addLessLoader, addWebpackAlias, overrideDevServer, addWebpackPlugin } = require("customize-cra");
const TerserPlugin = require("terser-webpack-plugin");

const path = require("path");

// 跨域配置
const devServerConfig = () => config => {
    return {
        ...config,
        // 服务开启gzip
        compress: true,
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:4000',
                changeOrigin: true,
                pathRewrite: {
                    '^/': '/',
                },
            }
        }
    }
}

// 引入全局的less
const lessGlobalConfiguration = () => config => {
    //修改、添加loader 配置 :
    // 所有的loaders规则是在config.module.rules(数组)的第二项
    // 即：config.module.rules[2].oneof  (如果不是，具体可以打印 一下是第几项目)
    // 修改 less 配置 ，规则 loader 在第7项(具体可以打印配置)
    const loaders = config.module.rules.find(rule => Array.isArray(rule.oneOf)).oneOf;
    console.log(loaders)
    loaders[7].use.push({
        loader: 'style-resources-loader',
        options: {
            patterns: path.resolve(__dirname, 'src/assets/index.less')//全局引入公共的less 文件
        }
    })
    return config
}
module.exports = {
    webpack: override(
        fixBabelImports("import", {
            libraryName: "antd",
            libraryDirectory: "es",
            style: true //这里一定要写true，css和less都不行
        }),
        addLessLoader({
            appendData: `@import "${path.resolve('./src/assets/less/index.less')}";`, // 全局变量引入
            lessOptions: {
                javascriptEnabled: true,
                modifyVars: { '@primary-color': '#1DA57A' },
            },
        }),
        // 配置路径别名
        addWebpackAlias({
            "@": path.resolve(__dirname, 'src')
        }),
        // 判断环境，只有在生产环境的时候才去使用这个插件
        // 如果不想这样做的话可以只修改build的命令为"build": "react-app-rewired build"
        process.env.NODE_ENV === 'production' && addWebpackPlugin(new TerserPlugin({
            test: /\.js(\?.*)?$/i,    //匹配参与压缩的文件
            parallel: true,    //使用多进程并发运行
            terserOptions: {    //Terser 压缩配置
                output: { comments: false }
            },
            extractComments: true,    //将注释剥离到单独的文件中
        }))
    ),
    devServer: overrideDevServer(devServerConfig())
};