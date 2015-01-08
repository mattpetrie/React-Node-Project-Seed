jest.dontMock('../../src/js/components/todo-item.jsx');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

describe('TodoItem', function() {
  var TodoItem = require('../../src/js/components/todo-item.jsx');

  it('exists', function() {
    expect(TodoItem).toBeDefined();
  });

  var mockData, handleTodoUpdateMock, todoItem;
  beforeEach(function() {
    mockData = { name: 'Foo', done: false };
    handleTodoUpdateMock = jest.genMockFn();
    todoItem = TestUtils.renderIntoDocument(
      <TodoItem data={mockData} handleTodoUpdate={handleTodoUpdateMock} />
    );
  });

  it('calls handleTodoUpdate when checkbox is changed', function() {
    var input = TestUtils.findRenderedDOMComponentWithTag(todoItem, 'input');
    TestUtils.Simulate.change(input);
    expect(handleTodoUpdateMock).toBeCalled();
  });

  it('toggles the done prop when checkbox is checked', function() {
    var done = todoItem.props.data.done;
    var input = TestUtils.findRenderedDOMComponentWithTag(todoItem, 'input');
    TestUtils.Simulate.change(input);
    expect(todoItem.props.data.done).toEqual(!done);
  });
});
