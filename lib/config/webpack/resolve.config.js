const path = require('path');
const ctx = process.cwd();
const {join} = path;
module.exports = {
    extensions: ['.js', '.ts', '.tsx'],
    alias: {
        components: join(ctx, './src/components')
    }
}