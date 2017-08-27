let { spawn } = require('child_process');

module.exports.spawnNpmProcess = (...args) => {
  let command = /^win/.test(process.platform) ? 'npm.cmd' : 'npm';
  return spawn(command, ...args);
  // this.miaProcess =   spawn(/^win/.test(process.platform) ? 'npm.cmd' : 'npm', [ 'run', 'mia-dev' ]);)
}

module.exports.spawnNodeProcess = (file) => {
  let command = 'node';
  let process = spawn('node', [ file ], {
    detached: true
  });

  process.stdout.on('data', (data) => console.log(data));
}
