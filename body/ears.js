const Sox = require('../private_modules/sox');
const fs = require('fs');

class Ears {
  constructor(audioCenter) {
    this.audioCenter = audioCenter;
    this.soxProcess = Sox.record({
      inputFileName: '0'
    });

    this.soxProcess.start();
    this.soxProcess.getStream().pipe(this.audioCenter.instream);
    //
    // process.on('exit', () => {
    //   console.log('Process Exit: Ears');
    //   this.soxProcess.stop();
    // })
    // process.kill();
  }

  plug() {
    console.log('Plugging ears');
    this.soxProcess.getStream().unpipe(this.audioCenter.instream);
    this.soxProcess.stop();
  }

  unplug() {
    console.log('Unplugging ears');
    this.soxProcess.start();
    this.soxProcess.getStream().pipe(this.audioCenter.instream);
  }
}

module.exports = Ears;
