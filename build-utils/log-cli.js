/* eslint-disable no-console */
const chalk = require('chalk')

function logCli(msgType, message) {
  if (message && typeof message === 'string') {
    console.log(
      chalk.bgBlue.black(` ${msgType.toUpperCase()} `),
      `${message.toUpperCase()}`
    )
  } else if (msgType && typeof msgType === 'string') {
    console.log(chalk.bgBlue.black(` ${msgType.toUpperCase()} `))
  }
}

module.exports = logCli
