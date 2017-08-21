const Sox = require('../private_modules/sox');
const fs = require('fs');

class Ears {
  constructor(audioCenter) {
    this.soxProcess = Sox.record({
      inputFileName: '0'
    });

    this.soxProcess.start();
    this.soxProcess.getStream().pipe(audioCenter.instream);
  }

  plug() {
    this.soxProcess.getStream().unpipe();
  }

  unplug() {
    this.soxProcess.getStream().pipe(audioCenter.instream);
  }
}

module.exports = Ears;
