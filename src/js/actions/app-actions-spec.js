import AppActions from './app-actions';
import AppDispatcher from '../dispatcher/app-dispatcher';
import TodoApi from '../apis/todo-api';

describe('AppActions', () => {
  let todo = {id: '1', name: 'foo', completed: 'false'};

  beforeEach(() => {
    sinon.stub(AppDispatcher, 'handleViewAction');
    sinon.stub(TodoApi);
  });

  afterEach(() => {
    AppDispatcher.handleViewAction.restore();
    for (var key in TodoApi) {
      if (TodoApi.hasOwnProperty(key)) {
        TodoApi[key].restore();
      }
    }
  });

  describe('#addTodo', () => {
    it('Sends an action to the Dispatcher', () => {
      AppActions.addTodo(todo);

      expect(AppDispatcher.handleViewAction).to.have.been.called;
    });

    it('Calls on the TodoApi to create the todo', () => {
      AppActions.addTodo(todo);

      expect(TodoApi.create).to.have.been.called;
    });
  });

  describe('#getTodo', () => {
    it('Sends an action to the Dispatcher', () => {
      AppActions.getTodo('1');

      expect(AppDispatcher.handleViewAction).to.have.been.called;
    });

    it('Calls on the TodoApi to get the todo', () => {
      AppActions.getTodo('1');

      expect(TodoApi.get).to.have.been.called;
    });
  });

  describe('#getTodos', () => {
    it('Sends an action to the Dispatcher', () => {
      AppActions.getTodos();

      expect(AppDispatcher.handleViewAction).to.have.been.called;
    });

    it('Calls on the TodoApi to get the todos', () => {
      AppActions.getTodos();

      expect(TodoApi.getAll).to.have.been.called;
    });
  });

  describe('#removeTodo', () => {
    it('Sends an action to the Dispatcher', () => {
      AppActions.removeTodo(todo);

      expect(AppDispatcher.handleViewAction).to.have.been.called;
    });

    it('Calls on the TodoApi to delete the todo', () => {
      AppActions.removeTodo(todo);

      expect(TodoApi.destroy).to.have.been.called;
    });
  });

  describe('#updateTodo', () => {
    it('Sends an action to the Dispatcher', () => {
      AppActions.updateTodo(todo);

      expect(AppDispatcher.handleViewAction).to.have.been.called;
    });

    it('Calls on the TodoApi to update the todo', () => {
      AppActions.updateTodo(todo);

      expect(TodoApi.update).to.have.been.called;
    });
  });
});