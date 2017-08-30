const { Transform, Duplex } = require('stream');
const { fft: fft, util: fftUtil  } = require('fft-js');
const Logger = requireModule('Logger').initialize(__dirname);

const FREQUENCY_HEARABLE_LOW_END = 300;
const FREQUENCY_HEARABLE_HIGH_END = 3500;
const SAMPLE_RATE_HZ = 16000;

function calculateAvgPower(chunk) {
  let phasors = fft(chunk);
  let frequencies = fftUtil.fftFreq(phasors, SAMPLE_RATE_HZ);
  let magnitudes = fftUtil.fftMag(phasors);
  let powers = magnitudes
    .filter((frequency, i) => frequencies[i] >= FREQUENCY_HEARABLE_LOW_END && frequencies[i] <= FREQUENCY_HEARABLE_HIGH_END)
    .map((magnitude) => magnitude ^2);

  let avgPower = powers.reduce((sum, power) => {
    return sum + power;
  }, 0) / powers.length;

  return avgPower;
}

class SilenceTransform extends Transform {
  constructor(options) {
    super(options);
    this.sumPower = 0;
    this.includedSilenceBlocks = 0;
    this.iterations = 1;
    this.buffer = new Buffer([]);
  }

  _transform(chunk, encoding, callback) {
    let avgPowerInSample = calculateAvgPower(chunk);
    let totalAvg = this.sumPower / this.iterations;
    let deviation = totalAvg - avgPowerInSample;

    if (deviation > 500) {
      Logger.info('Found speech block');
      this.includedSilenceBlocks = 0;
      this.inSentence = true;
      this.buffer = Buffer.concat([ this.buffer, chunk ]);
    } else {
      Logger.info('silence, adding to average');
      this.sumPower += avgPowerInSample;
      this.iterations++;

      if (this.inSentence) {
        if (this.includedSilenceBlocks < 2) {
          this.includedSilenceBlocks++;
          this.buffer = Buffer.concat([ this.buffer, chunk ]);
        } else {
          this.includedSilenceBlocks = 0;
          this.inSentence = false;
          this.push(this.buffer);
          this.buffer = new Buffer([]);
        }
      }
    }

    callback();
  }
}

module.exports = SilenceTransform;
