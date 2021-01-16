const cp = require('child_process');
const { devConfig } = require("../config/webpack");
const server = require('../config/server');

exports.command = 'start-cli';

exports.description = '这是开启start 服务的命令';

exports.args = [
    ['--order', '我是start的命令']
]

exports.run = function() {
    const devConfiInfo = devConfig();
    devConfiInfo.mode = 'development';
    server(devConfiInfo);

    // 另启动服务开启浏览器
    // 这里需要判断是不是mac还是windows
    // 如果是darwin，判断是mac
    if(process.platform === 'darwin') {
        cp.exec('open http://localhost:8888');
    }else {
        cp.exec('start http://localhost:8888');
    }
    
}