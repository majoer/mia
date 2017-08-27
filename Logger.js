class Logger {
  initialize(fileName) {
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

module.exports = new Logger();
