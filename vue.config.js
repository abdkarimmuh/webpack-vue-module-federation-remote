const { defineConfig } = require("@vue/cli-service");
const { ModuleFederationPlugin } = require("webpack").container;
const deps = require("./package.json").dependencies;

module.exports = defineConfig({
  pages: {
    index: {
      entry: "./src/index.js",
    },
  },
  publicPath: "auto",
  configureWebpack: {
    devServer: {
      headers: { "Access-Control-Allow-Origin": "*" },
    },
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
          "./store": "./src/store/index.js",
          "./HelloWorld": "./src/components/HelloWorld.vue",
          "./AboutView": "./src/pages/AboutView.vue",
        },
        shared: {
          ...deps,
          vue: {
            eager: true,
            singleton: true,
            requiredVersion: deps.vue,
            strictVersion: true,
          },
        },
      }),
    ],
  },
  transpileDependencies: true,
});
