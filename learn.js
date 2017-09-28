require('./globals');
const Logger = requireModule('logger').initialize(__filename);
const Sox = requireModule('private_modules/sox');
const { fft: fft, util: fftUtil  } = require('fft-js');

const SAMPLE_RATE_HZ = 16000;

function compareMagnitudes(magnitudesA, magnitudesB) {
  let diff = magnitudesB.map((magnitudeB, i) => {
    let magnitudeA = magnitudesA[i];
    return magnitudeB - magnitudeA;
  });
  return diff.reduce((sum, entry) => sum + entry, 0) / diff.length;
}

function onComplete(results) {
  console.log(compareMagnitudes(results[0][0], results[1][0]));
}

class Learn {
  constructor() {
    this.iteration = 0;
    this.results = [];
  }

  start() {
    Logger.info(`Starting learning process. Iteration: ${this.iteration}`);
    if (!this.results[this.iteration]) {
      this.results[this.iteration] = [];
    }

    let sox = new Sox();
    let soxProcess = sox.record({
      inputFileName: '0'
    });

    soxProcess.start();
    console.log('Speak NOW!');
    let stream = soxProcess.getStream();

    stream.on('data', (data) => {
      let phasors = fft(data);
      let frequencies = fftUtil.fftFreq(phasors, SAMPLE_RATE_HZ);
      let magnitudes = fftUtil.fftMag(phasors);

      let both = frequencies.map((frequency, i) => {
        return {
          frequency: frequency,
          magnitude: magnitudes[i]
        };
      });

      this.results[this.iteration].push(magnitudes);
    });

    setTimeout(() => {
      console.log('STOP!');
      soxProcess.stop();

      if (this.iteration < 1) {
        this.iteration++;
        this.start();
      } else {
        onComplete(this.results);
      }
    }, 3000);
  }
}

(function learn() {
  let learn = new Learn();
  learn.start();
})();
