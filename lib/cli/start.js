const path = require('path');
const _ = require('lodash');

const { devConfig } = require("../config/webpack");
const server = require('../config/server');

exports.command = 'start-cli';

exports.description = '这是开启start 服务的命令';

exports.args = [
    ['--order', '我是start的命令'],
    ['--port <value>', '设置端口']
]

exports.run = function() {
    const devConfiInfo = devConfig();
    devConfiInfo.mode = 'development';

    server(devConfiInfo);
}