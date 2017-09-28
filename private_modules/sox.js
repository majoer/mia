const SoxProcess = requireModule('private_modules/sox_process');

const DEFAULT_RECORD_OPTIONS = {
  bitwidth: '16',
  endian: 'little',
  channels: '1',
  rate: '16000',
  encoding: 'signed-integer',
  inputFileName: 'default'
};

class Sox {
  constructor() {
  }

  record(options) {
    options = Object.assign(DEFAULT_RECORD_OPTIONS, options);

    return new SoxProcess([
      '-b', options.bitwidth,
      '--endian', options.endian,
      '-c', options.channels,
      '-r', options.rate,
      '-e', options.encoding,
      '-t', 'waveaudio',
      options.inputFileName,
      '-t', 'wav',
      '-'
    ]);
  }
}

module.exports = Sox;
