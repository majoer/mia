const { spawn } = require('child_process');

class MiaDevRunner {
  constructor() {
    this.process = undefined;
  }

  run() {
    if (this.process) {
      //Stop process
      this.stop();
    }

    //Start process
    this.process = spawn(/^win/.test(process.platform) ? 'npm.cmd' : 'npm', [ 'run', 'mia-dev' ]);
    this.process.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });

    this.process.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`);
    });

    this.process.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
      this.process = undefined;
    });
  }

  stop() {
    this.process.kill('SIGHUP');
    this.process = undefined;
  }
}

module.exports = MiaDevRunner;
