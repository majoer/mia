const AudioCenter = require('./parts/audio_center');
const SpeechCenter = require('./parts/speech_center');
const ReasoningCenter = require('./parts/reasoning_center');

class Brain {
  constructor() {
    console.log('Setting up neural pathways');
    this.neuralPathways = {
      audioCenter: new AudioCenter(),
      reasoningCenter: new ReasoningCenter(),
      speechCenter: new SpeechCenter()
    };

    for (let key in this.neuralPathways) {
      if (this.neuralPathways.hasOwnProperty(key)) {
        let brainPart = this.neuralPathways[key];
        console.log(`Connecting ${key} to neural pathway`);
        brainPart.neuralPathways = this.neuralPathways;
      }
    }
    console.log('All neural pathways connected');
  }
}

module.exports = Brain;
