class Logger {
  constructor(fileName) {
    this.name = fileName;
    return this;
  }

  info(message) {
    console.log(`${this.name} (${process.pid}): ${message}`);
  }

  error(message) {
    console.error(`${this.name} (${process.pid}): ${message}`);
  }
}

Logger.initialize = (fileName) => {
  return new Logger(fileName);
}

module.exports = Logger;
