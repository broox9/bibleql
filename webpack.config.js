const path = require('path')

module.exports = (env) => {
  return {
    devtool: 'cheap-eval-source-map',
    entry: {
      app: [path.resolve(__dirname, 'client/index.js')]
    },
    resolve: {
      extensions: ['.js', '.html']
    },
    output: {
      filename: 'app.js',
      path: path.resolve(__dirname, 'public')
    },

    module: {
      rules: [
        {
          test: /\.html$/,
          exclude: /node_modules/,
          use: {
            loader: 'svelte-loader',
            options: {
              // emitCss: true,
              // cascade: false,
              store: true
            }
          }
        }
      ]
    }
  }
}