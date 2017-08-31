require('../globals');
const Logger = requireModule('Logger').initialize(__filename);
const DevProcess = requireModule('dev/dev-process');
const watch = require('node-watch');

const WATCH_IGNORE_FOLDERS = [ '.git', 'node_modules', 'npm-debug.info', '\\out' ];
const WATCH_FOLDER = '../';
const WATCH_OPTIONS = {
  recursive: true,
  filter: (name) => {
    if (name === '..\\Mia') return false;
    return !WATCH_IGNORE_FOLDERS.find((ignoreFile) => name.includes(ignoreFile));
  }
};

const moduleName = process.argv[2];

if (!moduleName) {
  throw new Error('You must supply a module name');
}

(function run() {
  Logger.info('Initialized');
  let devProcess = new DevProcess(moduleName);
  devProcess.start();

  let watcher = watch(WATCH_FOLDER, WATCH_OPTIONS, (evt, name) => {
    Logger.info(`Project updated: ${evt}, ${name}`);
    devProcess.restart();
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
    devProcess.stop();
    watcher.close();
  });
})();
