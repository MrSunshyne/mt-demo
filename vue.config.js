const WebpackMultitenancyPlugin = require("./webpack-multitenancy-plugin");
const path = require("path");
let { theme, tenant } = process.env;

module.exports = {
  configureWebpack: {
    plugins: [
      WebpackMultitenancyPlugin({
        // theme: theme,
        tenant: tenant,
        tenantDir: "themes",
      }),
    ],
    resolve: {
      alias: {
        "~": path.resolve(__dirname, "src/"),
        "@assets": path.resolve(__dirname, "src/assets/"),
      },
    },
  },
};
