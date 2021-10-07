//archivo de configuracion para traducir código de vue.js
const { VueLoaderPlugin } = require('vue-loader');
module.exports = {
    entry: './src/app/index.js',
    output: {
        path: __dirname + '/src/public/js',
        filename: 'bundle.js'
    },
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        // Here you should change 'env' to '@babel/preset-env'
                        presets: ['@babel/preset-env'],
                    },
                }

            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ]
};