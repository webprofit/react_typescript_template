const path = require('path');
var webpack = require("webpack");

module.exports = (env) => {
    return {
        entry: {
          "index": "./src/index.tsx",
          "admin": "./src/admin.tsx",
        },
        output: {
            filename: '[name].bundle.js',
            publicPath: '/',
            path: path.resolve("./", 'dist'),
        },
        devtool: 'source-map',
        devServer: {
            contentBase: [path.join(__dirname, "public"), path.join(__dirname, "dist")],
            index: './public/index.html',
            proxy: {
                "/proxy/*": {
                    target: "https://localhost",
                    secure: false,
                }
            },
            historyApiFallback: true
        },
        resolve: {
            extensions: ['.js', '.json', '.ts', '.tsx'],
            alias: {
                CORE: path.resolve(__dirname, 'src/core/'),
                COMMON: path.resolve(__dirname, 'src/common/'),
            }
        },
        module: {

            rules: [
                {
                    test: /\.(png|jpg|gif)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {}
                        }
                    ]
                },
                {
                  test: /\.mp3$/,
                  loader: 'file-loader',
                },
                {
                    test: /\.(ts|tsx)$/,
                    loader: 'awesome-typescript-loader',
                },
                { test: /\.css$/, use: ['style-loader', 'css-loader'] },
                {
                    test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                    use: [{
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts/'
                        }
                    }]
                }
            ],
        },

        plugins: [
            new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
            new webpack.DefinePlugin({ 'process.env.API': JSON.stringify(env.API) }),
        ]
    }
};
