const BrainPart = require('../brain_part');
const Mouth = require('../../body/mouth');

class SpeechCenter extends BrainPart {
  constructor() {
    super();
    this.mouth = new Mouth(this);
  }
  speak(text) {
    this.neuralPathways.audioCenter.disable();
    this.mouth.speak(text, () => {
      this.neuralPathways.audioCenter.enable();
    });
  }
}

module.exports = SpeechCenter;
