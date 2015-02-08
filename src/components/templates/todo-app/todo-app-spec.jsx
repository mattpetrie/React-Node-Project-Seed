import React from 'react/addons';
import rewire from 'rewire';
import rewireModule from '../../../../test/helpers/rewire-module.js';
import mockComponent from '../../../../test/helpers/mock-component.jsx'

const TestUtils = React.addons.TestUtils;

describe('Todo-App', () => {
  const TodoApp = rewire('./todo-app.jsx');
  let todoApp;

  let getTodosSpy = sinon.spy();
  let addChangeListenerSpy = sinon.spy();

  rewireModule(TodoApp, {
    TodoList: mockComponent('todo-list'),
    Header: mockComponent('header'),
    'TodoStore.getAll': sinon.stub().returns(['todo']),
    'TodoStore.addChangeListener': addChangeListenerSpy,
    'AppActions.getTodos': getTodosSpy,
  });

  beforeEach( () => {
    todoApp = TestUtils.renderIntoDocument(
      <TodoApp />
    );
  });

  it('renders',  () => {
    let component = TestUtils.findRenderedDOMComponentWithClass(
      todoApp, 'todoApp'
    );

    expect(component).to.exist();
  });

  it('registers a change listener with the TodoStore', () => {
    expect(addChangeListenerSpy).to.have.been.called;
  });

  it('Calls the getTodos action on mount', () => {
    expect(getTodosSpy).to.have.been.called;
  });

  it('renders the todo TodoList', () => {
    let todoList = TestUtils.findRenderedDOMComponentWithClass(
      todoApp, 'todo-list'
    );

    expect(todoList).to.exist();
  });
});