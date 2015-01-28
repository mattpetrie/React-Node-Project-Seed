var rewireModule = function rewireModule(rewiredModule, varValues) {
  var rewiredReverts = [];

  function revertFn(key, oldValue) {
    return function() {
      rewiredModule.__set__(key, oldValue);
    };
  }

  beforeEach(function() {
    var key, oldValue, newValue, revert;
    for (key in varValues) {
      if (varValues.hasOwnProperty(key)) {
        oldValue = rewiredModule[key];
        newValue = varValues[key];
        rewiredModule.__set__(key, newValue);
        revert = revertFn(key, oldValue);
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