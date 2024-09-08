const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

class ModifyHtmlLinksPlugin {
  apply(compiler) {
    compiler.hooks.compilation.tap("ModifyHtmlLinksPlugin", (compilation) => {
      HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync("ModifyHtmlLinksPlugin", (data, cb) => {
        // 这里修改 HTML 文件的内容
        data.html = data.html.replace(
          /<link href="(.+?)" rel="stylesheet">/g,
          `<link rel="preload" as="style" href="$1" onload="this.onload=null;this.rel='stylesheet'">`
        );
        // 调用回调函数继续编译
        cb(null, data);
      });
    });
  }
}

module.exports = {
  entry: path.resolve(__dirname, "../src/index.tsx"),
  output: {
    path: path.resolve(__dirname, "../dist"), // 打包后的代码放在dist目录下
    filename: "[name].js", // 打包的文件名
  },
  resolve: {
    // 配置 extensions 来告诉 webpack 在没有书写后缀时，以什么样的顺序去寻找文件
    extensions: [".mjs", ".js", ".json", ".jsx", ".ts", ".tsx"],
    alias: {
      "@": path.resolve(__dirname, "../src"),
    },
  },
  module: {
    rules: [
      {
        test: /.(jsx?)|(tsx?)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { loose: true }], "@babel/preset-typescript", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.(css|less)$/,
        use: [
          // 使用 MiniCssExtractPlugin.loader 代替 style-loader
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "less-loader",
        ],
        // 排除 node_modules 目录
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        type: "asset",
        generator: {
          filename: "assets/images/[name][ext]",
        },
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/i,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 25 * 1024, // 25kb
          },
        },
        generator: {
          filename: "assets/fonts/[name][ext]",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../index.html"),
      scriptLoading: "defer",
    }),
    new MiniCssExtractPlugin({
      // 将 css 单独提测出来放在 assets/css 下
      filename: "assets/css/[name].css",
    }),
    new ModifyHtmlLinksPlugin(),
  ],
  optimization: {
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        vendors: {
          name: "vendors",
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          enforce: true,
        },
        react: {
          name: "react",
          test: /[\\/]node_modules[\\/]react[\\/]/,
          enforce: true,
        },
        reactDom: {
          name: "react-dom",
          test: /[\\/]node_modules[\\/]react-dom[\\/]/,
        },
        antd: {
          name: "antd",
          test: /[\\/]node_modules[\\/]antd[\\/]/,
        },
      },
    },
  },
};
