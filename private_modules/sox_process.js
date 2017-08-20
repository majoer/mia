const { spawn } = require('child_process');

class SoxProcess {
  constructor(...args) {
    this.args = args;
  }

  start() {
    console.log(`Starting sox process: ${this.args[0].join(' ')}`);
    this.process = spawn('sox', ...this.args);
  }

  stop() {
    console.log('Killing sox process');
    this.process.kill('SIGTERM');
  }

  getStream() {
    return this.process.stdout;
  }
}

module.exports = SoxProcess;
