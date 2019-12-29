const path = require('path');
module.exports = {
    mode: 'none',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: path.resolve(__dirname, "./loaders/replaceLoader.js"),
                        options: {
                            style: path.resolve(__dirname, './src/index.css'),
                        }
                    }
                ]
            } 
        ]
    }
}