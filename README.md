# mt-demo

## Project setup

```
yarn install
```

## Configuration

See vue.config.js file in the repository for more info.

The tenant and tenantDir options need to be set to the following.

```js
let { theme, tenant } = process.env;

module.exports = {
  configureWebpack: {
    plugins: [
      WebpackMultitenancyPlugin({
        // theme: theme, //Doesn't seem to be necessary
        tenant: tenant,
        tenantDir: "themes",
      }),
    ],
  },
};
```

### Compiles and hot-reloads for development

```
tenant=brk yarn dev
```

### Compiles and minifies for production with Multi Tenancy

```

tenant=brk yarn build
tenant=mbnd yarn build
```
