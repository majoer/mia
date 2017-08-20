let say = require('say');

class Mouth {
  speak(text) {
    say.speak(text);
  }
}

module.exports = new Mouth();
