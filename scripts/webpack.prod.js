// webpack.prod.js
const { merge } = require("webpack-merge");
const base = require("./webpack.base.js");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = merge(base, {
  mode: "production", // 生产模式
  plugins: [
    process.env.ANALYZER && new BundleAnalyzerPlugin(), 
  ],
});
