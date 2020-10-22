/* eslint-disable no-console */
const logCli = require("./build-utils/log-cli");
const exec = require("child_process").execSync;
require("dotenv").config();

let { theme, tenant, DEPLOY_ENV } = process.env;

if (!theme || !theme.length) {
  theme = "brk";
}

if (!tenant || !tenant.length) {
  tenant = "";
}

if (!DEPLOY_ENV || !DEPLOY_ENV.length) {
  DEPLOY_ENV = "staging";
}

const fs = require("fs");

const build = () => {
  logCli("building theme", theme);

  if (tenant) {
    logCli("building tenant", tenant);
  }

  const cmd = `rm -rf  ../../public/assets/app/{js,css,img} && cross-env NODE_ENV=production vue-cli-service build --mode=${DEPLOY_ENV}`;
  try {
    exec(
      cmd,
      {
        env: {
          ...process.env,
          VUE_APP_THEME: theme,
          VUE_APP_TENANT: tenant,
          VUE_APP_CONTEXT: "build",
        },
        timeout: 600000, // 10 minutes
        stdio: "inherit",
      },
      (error, stdout, stderr) => {
        if (error) {
          console.error("threw the error");
          throw new Error(error);
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
      }
    );
  } catch (error) {
    console.error(error);
    process.exit();
  }
};

build();
