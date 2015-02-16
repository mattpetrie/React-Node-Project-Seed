/* A module for mocking all passed in dependencies via Rewire for a passed
in module. For more info on Rewire, see https://github.com/jhnns/rewire */
var rewireModule = function rewireModule(rewiredModule, varValues) {
  var rewiredReverts = [];

  beforeEach(() => {
    var key, revert;
    for (key in varValues) {
      if(varValues.hasOwnProperty(key)) {
        revert = rewiredModule.__set__(key, varValues[key]);
        rewiredReverts.push(revert);
      }
    }
  });

  afterEach(() => {
    rewiredReverts.forEach((revert) => {
      revert();
    });
  });

  return rewiredModule;
};

module.exports = rewireModule;