const BrainPart = require('../brain_part');
const Speech = require('@google-cloud/speech');
const Ears = require('../../body/ears');
const { Duplex } = require('stream');
const { fft: fft, util: fftUtil  } = require('fft-js');

const GOOGLE_SPEECH_PROJECT_ID = 'mia-176720';

class AudioCenter extends BrainPart {
  constructor() {
    super();

    // const speechClient = Speech({
    //   projectId: GOOGLE_SPEECH_PROJECT_ID
    // });
    // this.instream = speechClient.streamingRecognize({
    //   config: {
    //     encoding: 'LINEAR16',
    //     sampleRateHertz: 16000,
    //     languageCode: 'en-US'
    //   }
    // }).on('data', (response) => {
    //   console.log(`AudioCenter: Response: ${JSON.stringify(response, null, 4)}`)
    //   let results = response.results;
    //   if (results.length > 0) {
    //     this.neuralPathways.reasoningCenter.reasonAudio(results[0].alternatives);
    //   }
    // }).on('error', (error) => {
    //   console.log(error);
    // });
    let largestMagnitude = 1;
    let db = 0;

    this.instream = new Duplex({
      read() {

      },

      write(chunk, encoding, callback) {
        // console.log(chunk);
        let phasors = fft(chunk);
        let frequencies = fftUtil.fftFreq(phasors, 16000);
        let magnitudes = fftUtil.fftMag(phasors);

        magnitudes.forEach((magnitude) => {
          if (magnitude > largestMagnitude) {
            largestMagnitude = magnitude;
          }
          db = 20 * Math.log(magnitude / largestMagnitude);
        });
        //console.log(db);
        callback();
      }
    });

    this.ears = new Ears(this);
  }

  start() {
    this.ears.unplug();
  }

  stop() {
    this.ears.plug();
  }

  enable() {
    this.ears.unplug();
  }

  disable() {
    this.ears.plug();
  }
}

module.exports = AudioCenter;
