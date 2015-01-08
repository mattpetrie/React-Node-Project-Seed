jest.dontMock('../../src/js/components/todo-list.jsx');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

describe('TodoList', function() {
  var TodoList = require('../../src/js/components/todo-list.jsx');

  it('exists', function() {
    expect(TodoList).toBeDefined();
  });

  // it('renders a TodoItem for each todo', function() {
  //   var TodoItem = require('../../src/js/components/todo-item');
  //   TestUtils.mockComponent(TodoItem, 'todoItem');
  //   var mockData = [ 'todo1', 'todo2'];
  //   var handleTodoUpdateMock = jest.genMockFunction();
  //   var todoList = TestUtils.renderIntoDocument(
  //     <TodoList data={mockData} handleTodoUpdate={handleTodoUpdateMock} />
  //   );
  //
  //   var todoItems = TestUtils.scryRenderedDOMComponentsWithTag(todoList, 'todoItem');
  //
  //   expect(todoItems.length).toBe(2);
  //   // expect(todoItems[0]._owner.props.data).toBe('todo1');
  //   console.log(todoList._renderedComponent.props.children);
  // });
});
