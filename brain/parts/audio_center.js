const BrainPart = require('../brain_part');
const Speech = require('@google-cloud/speech');
const Ears = require('../../body/ears');

const GOOGLE_SPEECH_PROJECT_ID = 'mia-176720';

class AudioCenter extends BrainPart {
  constructor() {
    super();

    const speechClient = Speech({
      projectId: GOOGLE_SPEECH_PROJECT_ID
    });
    this.instream = speechClient.streamingRecognize({
      config: {
        encoding: 'LINEAR16',
        sampleRateHertz: 16000,
        languageCode: 'en-US'
      }
    }).on('data', (response) => {
      console.log(`AudioCenter: Response: ${JSON.stringify(response, null, 4)}`)
      let results = response.results;
      if (results.length > 0) {
        this.neuralPathways.reasoningCenter.reasonAudio(results[0].alternatives);
      }
    }).on('error', (error) => {
      console.log(error);
    });

    this.ears = new Ears(this);
  }
}

module.exports = AudioCenter;
