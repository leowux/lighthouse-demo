// webpack.prod.js
const { merge } = require("webpack-merge");
const base = require("./webpack.base.js");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const path = require("path");

module.exports = merge(base, {
  mode: "production", // 生产模式
  plugins: [
    process.env.ANALYZER && new BundleAnalyzerPlugin(),
  ],
  resolve: {
    alias: {
      "@ant-design/icons/lib/dist$": path.resolve(__dirname, "../src/assets/icons/index.ts"),
    },
  },
});
