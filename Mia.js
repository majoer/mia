const path = require('path');
process.env.GOOGLE_APPLICATION_CREDENTIALS = path.resolve('credentials/Mia--eacd283bbbc4.json');
console.log(`Set env GOOGLE_APPLICATION_CREDENTIALS=${process.env.GOOGLE_APPLICATION_CREDENTIALS}`);

const Ear = require('./communication/ear');

const master = "Matss";

(function Mia() {
  Ear.listen();
})();
