const Logger = require('../Logger').initialize(__filename);
const say = require('say');

class Mouth {
  constructor(speechCenter) {
  }

  speak(text, cb) {
    say.speak(text, '', 1.0, (err) => {
      if (err) {
        return console.error(err);
        cb();
      }
      Logger.info('Done speaking');
      cb();
    });
  }
}

module.exports = Mouth;
