const path = require('path');

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    mode: 'development',
    // module: {
    //     rules: [
    //         {
    //             test: /\.js$/,
    //             include: [
    //               path.resolve(__dirname, "src")
    //             ],
    //             loader: "babel-loader",
    //             options: {
    //               presets: ["es2015"]
    //             }
    //           }
    //     ]
    // },
    devtool: "source-map",
    target: 'web'
}