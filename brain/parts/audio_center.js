const Logger = requireModule('Logger').initialize(__filename);
const BrainPart = require('../brain_part');
const Speech = require('@google-cloud/speech');
const Ears = require('../../body/ears');
const { Duplex } = require('stream');
const { fft: fft, util: fftUtil  } = require('fft-js');
const SilenceTransform = requireModule('stream/silence-transform');
const SpeechRequestTransform = requireModule('stream/speech-request-transform');

const GOOGLE_SPEECH_PROJECT_ID = 'mia-176720';

class AudioCenter extends BrainPart {
  constructor() {
    super();

    let speechRequestTransform = new SpeechRequestTransform();
    const speechClient = Speech({
      projectId: GOOGLE_SPEECH_PROJECT_ID
    });

    this.instream = new SilenceTransform();
    this.instream.pipe(speechRequestTransform);

    speechRequestTransform.on('data', (request) => {
      speechClient.recognize(request).then((response) => {
        Logger.info(JSON.stringify(response, 4, null));
        this.neuralPathways.reasoningCenter.reasonAudio(response[0].results[0].alternatives);
      }).catch((err) => {
        Logger.info(err);
      });
    });

    this.ears = new Ears(this);
  }

  start() {
    this.ears.unplug();
  }

  stop() {
    this.ears.plug();
  }
}

module.exports = AudioCenter;
