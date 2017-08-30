const BrainPart = require('../brain_part');
const Logger = requireModule('logger').initialize(__dirname);

function findKeyword(alternatives, keyword) {
  return alternatives.find((alternative => alternative.transcript.trim().includes(keyword)));
}

class ReasoningCenter extends BrainPart {
  reasonAudio(alternatives) {
    Logger.info(`Reasoning alternatives: ${JSON.stringify(alternatives)}`)
    if (findKeyword(alternatives, 'hello')) {
      this.neuralPathways.speechCenter.speak('Why hello there. How can I help you?');
    }

    if (findKeyword(alternatives, 'Mia')) {
      this.neuralPathways.speechCenter.speak('Yes? How can I help you?');
    }
  }
}

module.exports = ReasoningCenter;
