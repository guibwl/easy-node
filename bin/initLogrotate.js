var fs = require('fs')
var $HOME = require('os').homedir()
var spawn = require('child_process').spawn
var chalk = require('chalk')
var pm2LogrotatePath = `${$HOME}/.pm2/modules/pm2-logrotate`

if (!fs.existsSync(pm2LogrotatePath)) {
  try {
    initLogrotate()
  } catch (error) {
    unInstallLogrotate()
  }
} else {
  if (!fs.existsSync(`${pm2LogrotatePath}/node_modules`) || !fs.existsSync(`${pm2LogrotatePath}/etc`)) {
    unInstallLogrotate()
  }
}

function initLogrotate () {
  console.log(chalk.bold.green('[init] ') + 'module ' + chalk.bold.green('pm2-logrotate'))
  var instalInstance = spawn('npm', ['run', 'i:log'], {
    stdio: 'inherit',
    env: process.env,
    shell: true
  })

  instalInstance.on('close', () => {
    var files = fs.readdirSync(pm2LogrotatePath)
    console.log('check files ' + chalk.bold.green('pm2-logrotate: ') + chalk.bold.green(files))
  })

  instalInstance.on('error', function (err) {
    console.error(err.stack || err)
  })
}

function unInstallLogrotate () {
  console.log(chalk.bold.red('[ERROR] ') + 'in ' + chalk.bold.green('pm2-logrotate') + ' ,reset...')
  console.log(chalk.bold.green('It takes some time. Please be patient...'))
  var unInstalInstance = spawn('npm', ['run', ' uni:log'], {
    stdio: 'inherit',
    env: process.env,
    shell: true
  })

  unInstalInstance.on('close', () => {
    console.log(chalk.bold.green('[PM2][Module] ') + 'reset successfully')
    initLogrotate()
  })

  unInstalInstance.on('error', function (err) {
    console.error(err.stack || err)
  })
}
