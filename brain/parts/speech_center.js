const BrainPart = requireModule('brain/brain_part');
const Mouth = requireModule('body/mouth');

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
