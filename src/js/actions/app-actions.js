import AppConstants from '../constants/app-constants';
import AppDispatcher from '../dispatcher/app-dispatcher';
import TodoApi from '../apis/todo-api';

const AppActions = {
  addTodo: function(todo) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.ADD_TODO,
      todo: todo
    });

    TodoApi.create(todo, (todo) => {
      AppDispatcher.handleServerAction({
        actionType: AppConstants.ADD_TODO_SUCCESS,
        todo: todo
      });
    }, (error) => {
      AppDispatcher.handleServerAction({
        actionType: AppConstants.ADD_TODO_FAIL,
        error: error
      });
    });
  },

  getTodo: function(id) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.GET_TODO,
      id: id
    });

    TodoApi.get(id, (todo) => {
      AppDispatcher.handleServerAction({
        actionType: AppConstants.GET_TODO_SUCESS,
        todo: todo
      });
    }, (error) => {
      AppDispatcher.handleServerAction({
        actionType: AppConstants.GET_TODO_FAIL,
        error: error
      });
    });
  },

  getTodos: function() {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.GET_TODOS
    });

    TodoApi.getAll( (todos) => {
      AppDispatcher.handleServerAction({
        actionType: AppConstants.GET_TODOS_SUCCESS,
        todos: todos
      });
    }, (error) => {
      AppDispatcher.handleServerAction({
        actionType: AppConstants.GET_TODOS_FAIL,
        error: error
      });
    });
  },

  removeTodo: function(id) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.REMOVE_TODO,
      id: id
    });

    TodoApi.destroy(id, () => {
      AppDispatcher.handleServerAction({
        actionType: AppConstants.REMOVE_TODO_SUCCESS,
        id: id
      });
    }, (error) => {
      AppDispatcher.handleServerAction({
        actionType: AppConstants.REMOVE_TODO_FAIL,
        error: error
      });
    });
  },

  updateTodo: function(id, props) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.UPDATE_TODO,
      id: id,
      props: props
    });

    TodoApi.update(id, props, (todo) => {
      AppDispatcher.handleServerAction({
        actionType: AppConstants.UPDATE_TODO_SUCCESS,
        id: todo._id,
        props: todo
      });
    }, (error) => {
      AppDispatcher.handleServerAction({
        actionType: AppConstants.UPDATE_TODO_FAIL,
        error: error
      });
    });
  }
};

export default AppActions;
