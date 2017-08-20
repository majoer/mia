const Sox = require('../private_modules/sox');
const AudioCenter = require('../brain/audio_center');
const fs = require('fs');

class Ear {
  listen() {
    let soxProcess = Sox.record({
      inputFileName: '0'
    });

    soxProcess.start();
    soxProcess.getStream().pipe(AudioCenter.instream);
  }
}

module.exports = new Ear();
