require('./globals');
const path = require('path');
const Brain = require('./brain/brain.js');
const Logger = require('./Logger').initialize(__dirname);

process.env.GOOGLE_APPLICATION_CREDENTIALS = path.resolve('credentials/Mia--eacd283bbbc4.json');

function setup() {
  process.once('exit', () => Logger.info('Mia Exited'));
  process.once('close', () => Logger.info('Mia Closed'));
  process.once('SIGTERM', () => Logger.info('Mia received SIGTERM signal'));
  process.once('SIGINT', () => Logger.info('Mia received SIGINT signal'));
  process.on('message', (message) => {
    Logger.info(`Message from parent process: ${message}`);
    let parts = message.split(':');

    if (parts[0] === 'kill') {
      // process.kill(process.pid, parts[1]);
      process.exit(0);
    }
  });
  Logger.info('Setup Complete');
}

(function Mia() {
  Logger.info('Starting');

  setup();
  let brain = new Brain();

  process.once('exit', () => {
    Logger.info('Stopping brain');
    brain.stop();
  });
})();
