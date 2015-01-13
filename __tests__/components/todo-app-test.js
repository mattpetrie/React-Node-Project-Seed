jest.dontMock('../../src/js/components/todo-app.jsx');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var $ = require('jquery');

describe('TodoApp', function() {
  var TodoApp = require('../../src/js/components/todo-app.jsx');

  var todoApp, mockData;
  beforeEach(function() {
    todoApp = TestUtils.renderIntoDocument(
      <TodoApp />
    );

    mockData = [
      {_id: 1, name: 'foo', done: false},
      {_id: 2, name: 'bar', done: true}
    ];
    todoApp.state.data = mockData;
  });

  it('exists', function() {
    expect(TodoApp).toBeDefined();
  });

  it('initializes with an empty data array', function() {
    expect(todoApp.getInitialState().data).toEqual([]);
  });

  describe('#handleTodoUpdate', function() {
    it('optimistically updates the todo in the collection', function() {
      var updatedTodo = {_id: 2, name: 'changed', done: false};
      todoApp.updateTodo = jest.genMockFunction();

      todoApp.handleTodoUpdate(updatedTodo);
      expect(todoApp.updateTodo).toBeCalledWith(updatedTodo);
    });

    it('calls into $.ajax with the correct params', function() {
      var updatedTodo = {_id: 2, name: 'changed', done: false};
      todoApp.updateTodo = jest.genMockFunction();

      todoApp.handleTodoUpdate(updatedTodo);
      expect($.ajax).toBeCalledWith({
        url: '/api/todos/2',
        type: 'PUT',
        dataType: 'json',
        data: updatedTodo,
        success: jasmine.any(Function),
        error: jasmine.any(Function)
      });
    });
  });

  describe('#updateTodo', function() {
    beforeEach(function() {
      todoApp.setState = jest.genMockFunction();
    });

    it('calls setState with the updated Todo', function() {
      var updatedTodo = {_id: 2, name: 'changed', done: false};
      var updatedMockData = [mockData[0], updatedTodo];

      todoApp.updateTodo(updatedTodo);

      expect(todoApp.setState).toBeCalledWith({data: updatedMockData});
    });

    it('does not call set state if the todo has not changed', function() {
      var updatedTodo = mockData[1];
      todoApp.updateTodo(updatedTodo);

      expect(todoApp.setState).not.toBeCalled();
    });

    it('throws an error when the updatedTodo does not exist in the collection', function() {
      var newTodo = {_id: 3, name: 'baz', done: true};

      expect(function() {todoApp.updateTodo(newTodo)}).toThrow();
    });
  });
});
