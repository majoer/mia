const Logger = requireModule('Logger').initialize(__filename);
const { fork } = require('child_process');

class MiaDevRunner {
  constructor() {
    this.running = false;
  }

  start() {
    Logger.info('MiaDevRunner PID: ' + process.pid);
    this.running = true;
    this.miaProcess = fork('Mia.js');
    this.miaProcess.once('exit', (code, signal) => {
      this.running = false;
      if (code) {
        Logger.info(`Mia child process exited on its own: ${code}`);
      } else if (signal) {
        Logger.info(`Mia child process exited forcibly: ${signal}`);
      } else {
        Logger.info('Mia child process exited');
      }
    });
  }

  restart() {
    Logger.info('Mia is restarting...');
    if (!this.running) {
      Logger.info('Mia already shut down');
      this.start();
      return;
    }

    this.miaProcess.once('exit', () => {
      Logger.info('Mia finally exited, restarting.');
      this.start();
    });
    this.miaProcess.send('kill:SIGTERM');
  }

  stop() {
    if (!this.running) {
      Logger.info('Mia already shut down');
      return;
    }
    this.miaProcess.send('kill:SIGTERM');
  }
}

module.exports = MiaDevRunner;
