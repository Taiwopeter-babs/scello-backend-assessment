const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const webpackNodeExternals = require('webpack-node-externals');

module.exports = {
    entry: './src/app.ts',
    target: 'node',
    externals: [webpackNodeExternals()],
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js'],
        plugins: [new TsconfigPathsPlugin({})]
    },
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'dist')
    }
};
