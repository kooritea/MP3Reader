const path = require("path");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
module.exports = {
  mode: "production",
  entry: "./src/index.ts",
  optimization: {
    minimizer: [
      new UglifyJSPlugin({
        uglifyOptions: {
          ecma: 6,
          keep_fnames: true,
          keep_classnames: true
        }
      })
    ]
  },
  output: {
    filename: "index.js",
    path: path.join(__dirname, "./dist"),
    library: "MP3Reader",
    libraryExport: "default",
    libraryTarget: "umd",
    globalObject: "this",
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader"
      }
    ]
  },
  resolve: {
    extensions: [".ts"]
  },
  performance: {
    hints: false
  }
};
