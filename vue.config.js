const { defineConfig } = require("@vue/cli-service");
const { ModuleFederationPlugin } = require("webpack").container;
// const { VueLoaderPlugin } = require("vue-loader");

module.exports = defineConfig({
  pages: {
    index: {
      entry: "./src/index.js",
    },
  },
  publicPath: "auto",
  configureWebpack: {
    devServer: {
      headers: { "Access-Control-Allow-Origin": "*" }
    },
    // module: {
    //   rules: [
    //     {
    //       test: /\.vue$/,
    //       loader: "vue-loader",
    //     },
    //   ],
    // },
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
      // new VueLoaderPlugin(),
      new ModuleFederationPlugin({
        name: "remote",
        filename: "remoteEntry.js",
        exposes: {
          "./HelloWorld": "./src/components/HelloWorld.vue",
          "./AboutView": "./src/pages/AboutView.vue",
        },
        shared: {
          vue: { singleton: true },
          tailwindcss: {},
          ...require("./package.json").dependencies
        },
      }),
    ],
  },
  transpileDependencies: true,
});
