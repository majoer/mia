const BrainPart = require('../brain_part');
const Mouth = require('../../body/mouth');

class SpeechCenter extends BrainPart {
  constructor() {
    super();
    this.mouth = new Mouth(this);
  }
  speak(text) {
    this.neuralPathways.audioCenter.stop();
    this.mouth.speak(text, () => {
      this.neuralPathways.audioCenter.start();
    });
  }
}

module.exports = SpeechCenter;
