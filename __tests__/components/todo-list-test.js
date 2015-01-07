jest.dontMock('../../src/js/components/todo-list.jsx');

describe('TodoList', function() {
  it('exists', function() {
    var TodoList = require('../../src/js/components/todo-list.jsx');
    expect(TodoList).toBeDefined();
  });
});
