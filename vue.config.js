const WebpackMultitenancyPlugin = require("./webpack-multitenancy-plugin");

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
  },
};
