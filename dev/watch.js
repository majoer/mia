const _ = require('lodash');
const watch = require('node-watch');
const MiaDevRunner = require('./MiaDevRunner');

const WATCH_IGNORE_FOLDERS = [ '.git', 'node_modules', 'npm-debug.log', '\\out' ];
const WATCH_FOLDER = '../';
const WATCH_OPTIONS = {
 recursive: true,
 filter: (name) => {
   if (name === '..\\Mia') return false;
   return !WATCH_IGNORE_FOLDERS.find((ignoreFile) => name.includes(ignoreFile));
 }
};

(function run() {
  let miaDevRunner = new MiaDevRunner();
  miaDevRunner.run();

  let watcher = watch(WATCH_FOLDER, WATCH_OPTIONS, (evt, name) => {
    console.log(`Watch.js: Mia updated: ${evt}, ${name}`);
    run();
    watcher.close();
  });
})();
