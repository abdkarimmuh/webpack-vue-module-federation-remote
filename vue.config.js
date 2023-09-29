const { defineConfig } = require("@vue/cli-service");
const webpack = require("webpack");
// const path = require("path");

module.exports = defineConfig({
  pages: {
    index: {
      entry: "./src/index.js",
    },
  },
  publicPath: "auto",
  configureWebpack: {
    optimization: {
      splitChunks: {
        cacheGroups: {
          defaultVendors: {
            name: "chunk-vendors",
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            chunks: "async",
            reuseExistingChunk: true,
          },
          common: {
            name: "chunk-common",
            minChunks: 2,
            priority: -20,
            chunks: "async",
            reuseExistingChunk: true,
          },
        },
      },
    },
    plugins: [
      new webpack.container.ModuleFederationPlugin({
        name: "remote",
        filename: "remoteEntry.js",
        exposes: {
          "./HelloWorld.vue": "./src/components/HelloWorld.vue",
          "./AboutView.vue": "./src/pages/AboutView.vue",
        },
        shared: {
          vue: {
            singleton: true,
          },
        },
      }),
    ],
    // resolve: {
    //   alias: {
    //     "@": path.resolve(__dirname, "./src"),
    //   },
    // },
  },
  transpileDependencies: true,
});
