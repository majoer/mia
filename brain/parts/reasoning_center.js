const BrainPart = require('../brain_part');

function findKeyword(alternatives, keyword) {
  return alternatives.find((alternative => alternative.transcript.trim().includes(keyword)));
}

class ReasoningCenter extends BrainPart {
  reasonAudio(alternatives) {
    if (findKeyword(alternatives, 'hello')) {
      this.neuralPathways.speechCenter.speak('Why hello there. How can I help you?');
    }

    if (findKeyword(alternatives, 'Mia')) {
      this.neuralPathways.speechCenter.speak('Yes?. How can I help you?');
    }
  }
}

module.exports = ReasoningCenter;
