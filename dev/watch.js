const Logger = require('../Logger').initialize(__filename);
const _ = require('lodash');
const watch = require('node-watch');
const MiaDevRunner = require('./MiaDevRunner');

const WATCH_IGNORE_FOLDERS = [ '.git', 'node_modules', 'npm-debug.info', '\\out' ];
const WATCH_FOLDER = '../';
const WATCH_OPTIONS = {
 recursive: true,
 filter: (name) => {
   if (name === '..\\Mia') return false;
   return !WATCH_IGNORE_FOLDERS.find((ignoreFile) => name.includes(ignoreFile));
 }
};

(function run() {
  Logger.info('Initialized');
  let miaDevRunner = new MiaDevRunner();
  miaDevRunner.start();

  let watcher = watch(WATCH_FOLDER, WATCH_OPTIONS, (evt, name) => {
    Logger.info(`Mia updated: ${evt}, ${name}`);
    miaDevRunner.restart();
  });

  process.once('SIGTERM', () => {
    Logger.info('SIGTERM');
    process.exit(0);
  });

  process.once('SIGINT', () => {
    Logger.info('SIGINT');
    process.exit(0);
  });

  process.once('exit', () => {
    Logger.info('exit');
    miaDevRunner.stop();
    watcher.close();
  });
})();
