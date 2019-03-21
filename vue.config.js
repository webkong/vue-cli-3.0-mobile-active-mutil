const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
module.exports = {
  publicPath: "/",
  pages: {
    index: {
      // page 的入口
      entry: "src/main.js",
      // 模板来源
      template: "public/index.html",
      // 在 dist/index.html 的输出
      filename: "index.html",
      chunks: ["chunk-vendors", "chunk-common", "index"]
    },
    vote: {
      entry: "src/subpages/vote/main.js"
    },
    share: {
      entry: "src/subpages/share/main.js"
    }
  },
  productionSourceMap: false,
  configureWebpack: {
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              warnings: false,
              drop_console: process.env.NODE_ENV === "production", //console
              drop_debugger: false,
              pure_funcs: ["console.log"] //移除console
            }
          }
        })
      ]
    }
  },
  devServer: {
    proxy: {
      "/api": {
        target: process.env.VUE_APP_API_URL,
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/"
        }
      }
    }
  }
};
