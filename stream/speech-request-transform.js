const { Transform } = require('stream');

const DEFAULT_CONFIG = {
  encoding: 'LINEAR16',
  sampleRateHertz: 16000,
  languageCode: 'en-US',
  profanityFilter: false
}

class SpeechRequestTransform extends Transform {
  constructor(options) {
    options = Object.assign(options || {}, { objectMode: true });
    super(options);
    this.config = options.config || DEFAULT_CONFIG;
  }

  _transform(chunk, encoding, callback) {
    console.log('Received Sentence');
    this.push({
      config: this.config,
      audio: {
        content: chunk
      }
    });
    callback();
  }
}

module.exports = SpeechRequestTransform;
