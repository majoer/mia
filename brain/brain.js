const Logger = require('../Logger').initialize(__filename);
const AudioCenter = require('./parts/audio_center');
const SpeechCenter = require('./parts/speech_center');
const ReasoningCenter = require('./parts/reasoning_center');

class Brain {
  constructor() {
    Logger.info('Setting up neural pathways');
    this.neuralPathways = {
      audioCenter: new AudioCenter(),
      reasoningCenter: new ReasoningCenter(),
      speechCenter: new SpeechCenter()
    };

    for (let key in this.neuralPathways) {
      if (this.neuralPathways.hasOwnProperty(key)) {
        let brainPart = this.neuralPathways[key];
        Logger.info(`Connecting ${key} to neural pathway`);
        brainPart.neuralPathways = this.neuralPathways;
      }
    }
    Logger.info('All neural pathways connected');
  }

  stop() {
    for (let key in this.neuralPathways) {
      if (this.neuralPathways.hasOwnProperty(key)) {
        let brainPart = this.neuralPathways[key];
        Logger.info(`Shutting down ${key}`);
        brainPart.stop();
      }
    }
  }
}

module.exports = Brain;
