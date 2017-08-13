const _ = require('lodash');
const watch = require('node-watch');
const MiaDevRunner = require('./MiaDevRunner');

const WATCH_IGNORE_FOLDERS = [ '.git', 'dev', 'node_modules'];
const WATCH_FOLDER = '../';
const WATCH_OPTIONS = {
 recursive: true,
 filter: (name) => {
   return !WATCH_IGNORE_FOLDERS.find((ignoreFile) => name.includes(ignoreFile));
 }
};

(function run() {
  let miaDevRunner = new MiaDevRunner();
  //miaDevRunner.run();

  watch(WATCH_FOLDER, WATCH_OPTIONS, (evt, name) => {
    console.log(`Watch.js: Mia updated: ${evt}, ${name}`);
    miaDevRunner.run();
  })
})();
