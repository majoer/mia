let say = require('say');
const Logger = require('../Logger').initialize(__filename);

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
