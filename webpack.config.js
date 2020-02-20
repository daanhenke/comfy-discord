const path = require('path')

module.exports = {
    mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',
    entry: {
        'comfy-discord': path.resolve(__dirname, 'source/discord/main.js')
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    'babel-loader'
                ]
            }
        ]
    },
    resolve: {
        extensions: [
            '.js', '.jsx'
        ]
    }
}