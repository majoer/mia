const Sox = require('../private_modules/sox');
const fs = require('fs');
const Logger = require('../Logger').initialize(__filename);

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
    //   Logger.info('Process Exit: Ears');
    //   this.soxProcess.stop();
    // })
    // process.kill();
  }

  plug() {
    Logger.info('Plugging ears');
    this.soxProcess.getStream().unpipe(this.audioCenter.instream);
    this.soxProcess.stop();
  }

  unplug() {
    Logger.info('Unplugging ears');
    this.soxProcess.start();
    this.soxProcess.getStream().pipe(this.audioCenter.instream);
  }
}

module.exports = Ears;
