const path = require('path');
const nodeExternals = require('webpack-node-externals');

const tsRule = {
    test: /\.tsx?$/,
    loader: 'esbuild-loader',
    options: {
        loader: 'tsx', target: 'es2015'
    }
};

const backendConf = {
    entry: './x.ts',
    module: {
        rules: [tsRule]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        path: path.resolve('./'),
        filename: 'x.js',
    },

    target: 'node',
    externals: [nodeExternals()],

    mode: 'development',
    watch: true
};

const frontendConf = {
    entry: './src/browser/ts/AppFrontend',
    module: {
        rules: [tsRule]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        path: path.resolve('./'),
        filename: 'min.js',
    },
    target: 'web',
    mode: 'development',
    watch: true
};

module.exports = [backendConf, frontendConf];
module.exports.parallelism = 1;