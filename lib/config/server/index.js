
const devMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');
const {createProxyMiddleware} = require('http-proxy-middleware');
const webpack = require('webpack');
const express = require('express');
const chalk = require('chalk');
const cp = require('child_process');
const path = require('path');

const {createMockConfig} = require('../../utils/createMock');
const app = express();
const ctx = process.cwd();

module.exports = function(config) {
    const portParam = process.argv.find(item => item.includes('--port='));
    const port = portParam && portParam.split('=')[1];
    const serverPort = portParam ? port : 8888;
    
    // 绝对定位获取到react-config的dev 配置
    const filePath = path.join(ctx, './react-config.js')
    const customConfig = require(filePath);
    // const customConfig = require(path.resolve(__dirname, '../../../react-config.js'));
    const {proxy, proxyTarget, proxySuffix} = createMockConfig(customConfig);

    const compiler = webpack(config);
    app.use(devMiddleware(compiler));

    // 首先设置proxyTarget
    const suffix = proxySuffix || '/api';
    proxyTarget && app.use(suffix, createProxyMiddleware(
        {
            target: proxyTarget,
            changeOrigin: true,
            pathRewrite: {
                [`^${suffix}`]: ''
            }
        }
    ));
    
    // 更细致的设置
    if (proxy) {
        for(let key in proxy) {
            app.use(key, createProxyMiddleware(proxy[key]));
        }
    }

    // 热更新
    app.use(hotMiddleware(compiler));
    app.listen(serverPort, function() {
        console.log(chalk.green(`please open localhost:${serverPort}`))
    });

    // 另启动服务开启浏览器
    // 这里需要判断是不是mac还是windows
    // 如果是darwin，判断是mac
    if(process.platform === 'darwin') {
        cp.exec(`open http://localhost:${serverPort}`);
    }else {
        cp.exec(`start http://localhost:${serverPort}`);
    }
}