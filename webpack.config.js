const { version } = require("./package.json");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const path = require("path");

const config = {
  mode: process.env.NODE_ENV,
  context: path.join(__dirname, "/src"),
  entry: {
    background: "./background.ts",
    content: "./content.ts",
    options: "./options.ts",
  },
  output: {
    filename: "[name].js",
    path: path.join(__dirname, "dist/"),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
          },
          {
            loader: "sass-loader",
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  optimization: {
    splitChunks: {
      name: "vendor",
      chunks: "all",
    },
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: "icons", to: "icons" },
        { from: "options/options.html", to: "options/options.html" },
        {
          from: "manifest.json",
          to: "manifest.json",
          transform: (content) => {
            const jsonContent = JSON.parse(content);
            jsonContent.version = version;
            return JSON.stringify(jsonContent, null, 2);
          },
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: "options/css/bulma.css",
    }),
    new CleanWebpackPlugin(),
  ],
  performance: {
    assetFilter: function (assetFilename) {
      return assetFilename.endsWith(".js");
    },
  },
};

if (process.env.HMR === "true") {
  config.plugins = (config.plugins || []).concat([
    new ExtensionReloader({
      manifest: path.join(__dirname, "/src/manifest.json"),
    }),
  ]);
}

module.exports = config;
