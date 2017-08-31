const Logger = requireModule('Logger').initialize(__filename);
const { fork } = require('child_process');

class DevProcess {
  constructor(moduleName) {
    this.moduleName = moduleName;
    this.running = false;
  }

  start() {
    Logger.info(`Starting DevProcess: ${this.moduleName}`);
    this.running = true;
    this.devProcess = fork(this.moduleName);
    this.devProcess.once('exit', (code, signal) => {
      this.running = false;
      if (code) {
        Logger.info(`Child process exited on its own: ${code}`);
      } else if (signal) {
        Logger.info(`Child process exited forcibly: ${signal}`);
      } else {
        Logger.info('Child process exited');
      }
    });
  }

  restart() {
    Logger.info('DevProcess is restarting...');
    if (!this.running) {
      Logger.info('DevProce already shut down');
      this.start();
      return;
    }

    this.devProcess.once('exit', () => {
      Logger.info('DevProcess finally exited, restarting.');
      this.start();
    });
    this.devProcess.send('kill:SIGTERM');
  }

  stop() {
    if (!this.running) {
      Logger.info('DevProcess already shut down');
      return;
    }
    this.devProcess.send('kill:SIGTERM');
  }
}

module.exports = DevProcess;
