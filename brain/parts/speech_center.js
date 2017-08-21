const BrainPart = require('../brain_part');
const Mouth = require('../../body/mouth');

class SpeechCenter extends BrainPart {
  constructor() {
    super();
    this.mouth = new Mouth(this);
  }
  speak(text) {
    // Ear.plug();
    this.mouth.speak(text);
    // Ear.unplug();
  }
}

module.exports = SpeechCenter;
