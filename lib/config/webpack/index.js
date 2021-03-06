const {merge} = require('webpack-merge');
// 获取公用配置
const commonConfig = () => {
    const entry = require('./entry.config');
    const output = require('./output.config');
    const resolve = require('./resolve.config');
    const plugins = require('./plugins.config');
    const rules = require('./rules');
    return {
        entry,
        output,
        resolve,
        module: {
            rules
        },
        plugins
    };
};

const devConfig = () => {
    const config = {
        devtool: 'cheap-module-source-map',
        devServer: {
            open: true
        }
    }
    return merge(commonConfig(), config);
}

const proConfig = () => {

}

module.exports =  {commonConfig, devConfig, proConfig};