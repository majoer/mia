const mouth = require('../communication/mouth');

class SpeechCenter {
  speak(text) {
    mouth.speak(text);
  }
}

module.exports = new SpeechCenter();
