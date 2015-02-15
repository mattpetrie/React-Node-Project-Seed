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