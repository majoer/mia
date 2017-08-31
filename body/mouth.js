const Logger = requireModule('Logger').initialize(__filename);
const say = require('say');

class Mouth {
  constructor(speechCenter) {
    this.speechCenter = speechCenter;
  }

  speak(text, cb) {
    say.speak(text, '', 1.0, (err) => {
      if (err) {
        cb();
        Logger.error(err);
        return;
      }
      Logger.info('Done speaking');
      cb();
    });
  }
}

module.exports = Mouth;
