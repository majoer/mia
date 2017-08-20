const Speech = require('@google-cloud/speech');
const { Transform } = require('stream');
const ReasoningCenter = require('../brain/reasoning_center');

const GOOGLE_SPEECH_PROJECT_ID = 'mia-176720';
const speechClient = Speech({
  projectId: GOOGLE_SPEECH_PROJECT_ID
});

class AudioCenter {
  constructor() {
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
        ReasoningCenter.reasonAudio(results[0].alternatives);
      }
    }).on('error', (error) => {
      console.log(error);
    });
  }
}

module.exports = new AudioCenter();
