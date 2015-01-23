var rewireModule = function rewireModule(rewiredModule, varValues) {
  var rewiredReverts = [];

  beforeEach(function() {
    var key, value, revert;
    for (key in varValues) {
      if (varValues.hasOwnProperty(key)) {
        oldValue = rewiredModule[key];
        newValue = varValues[key];
        rewiredModule.__set__(key, newValue);
        revert = function() { rewiredModule.__set__(key, oldValue); };
        rewiredReverts.push(revert);
      }
    }
  });

  afterEach(function() {
    rewiredReverts.forEach(function(revert) {
      revert();
    });
  });

  return rewiredModule;
};

module.exports = rewireModule;