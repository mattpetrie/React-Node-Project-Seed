import React from 'react/addons';
import rewire from 'rewire';
import rewireModule from '../../../../test/helpers/rewire-module.js';

const TestUtils = React.addons.TestUtils;

describe('TodoForm', () => {
  const TodoForm = rewire('./todo-form.jsx');
  let todoForm;
  let addTodoSpy = sinon.spy();

  rewireModule(TodoForm, {
    'AppActions.addTodo': addTodoSpy,
  });

  beforeEach( () => {
    todoForm = TestUtils.renderIntoDocument(
      <TodoForm />
    );

    todoForm.generateUUID = function() { return 1; };
  });

  it('renders', () => {
    let component = TestUtils.findRenderedDOMComponentWithClass(
      todoForm, 'todoForm'
    );

    expect(component).to.exist();
  });

  it('updates the name field when changed', () => {
    let field = TestUtils.scryRenderedDOMComponentsWithTag(
       todoForm, 'input'
    )[0];

    TestUtils.Simulate.change(field, { target: { value: 'foo' } });

    expect(field.getDOMNode().value).to.equal('foo');
  });

  describe('submitting a new todo', () => {
    let form;

    beforeEach( () => {
      form = TestUtils.findRenderedDOMComponentWithTag(
        todoForm, 'form'
      );

      todoForm.setState({ name: 'bar' });

      TestUtils.Simulate.submit(form);
    });

    it('calls the update todo action on submit', () => {

      expect(addTodoSpy).to.have.been.calledWith({ id: 1, name: 'bar', completed: false });
    });

    it('resets the name field to empty on submit', () => {
      let field = TestUtils.scryRenderedDOMComponentsWithTag(
         todoForm, 'input'
      )[0];

      expect(field.getDOMNode().value).to.equal('');
    })
  })
});