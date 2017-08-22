let say = require('say');

class Mouth {
  constructor(speechCenter) {
  }

  speak(text, cb) {
    say.speak(text, '', 1.0, (err) => {
      if (err) {
        return console.error(err);
        cb();
      }
      console.log('Done speaking');
      cb();
    });
  }
}

module.exports = Mouth;
