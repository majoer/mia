let speechCenter = require('./speech_center');

function findKeyword(alternatives, keyword) {
  return alternatives.find((alternative => alternative.transcript.trim().includes(keyword)));
}

class ReasoningCenter {
  reasonAudio(alternatives) {
    if (findKeyword(alternatives, 'hello')) {
      speechCenter.speak('Why, hello there. How can I help you?');
    }

    if (findKeyword(alternatives, 'Mia')) {
      speechCenter.speak('Yes?. How can I help you?');
    }
  }
}

module.exports = new ReasoningCenter();
