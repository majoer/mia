let say = require('say');

class Mouth {
  constructor(speechCenter) {
  }
  speak(text) {
    say.speak(text);
  }
}

module.exports = Mouth;
