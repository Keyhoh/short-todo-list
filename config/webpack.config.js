const path = require('path');
const PROJECT_ROOT = path.resolve(__dirname, '..');

module.exports = {
    target: 'electron-main',
    mode: 'development',
    entry: path.resolve(PROJECT_ROOT, 'src', 'main.js'),
    output: {
        path: path.resolve(PROJECT_ROOT, 'app'),
        filename: 'main.js'
    },
    resolve: {
        extensions: [".js", ".jsx"]
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }]
    }
}