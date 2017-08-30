const path = require('path');

global.requireModule = (modulePath) => require(path.resolve(modulePath));
