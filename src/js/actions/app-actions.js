var AppConstants = require('../constants/app-constants.js');
var AppDispatcher = require('../dispatcher/app-dispatcher.js');
var TodoApi = require('../apis/todo-api.js');

var AppActions = {
  addTodo: function(todo) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.ADD_TODO,
      todo: todo
    });

    TodoApi.create(todo, function(todo) {
      AppDispatcher.handleServerAction({
        actionType: AppConstants.ADD_TODO_SUCCESS,
        todo: todo
      });
    }, function(error) {
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

    TodoApi.get(id, function(todo) {
      AppDispatcher.handleServerAction({
        actionType: AppConstants.GET_TODO_SUCESS,
        todo: todo
      });
    }, function(error) {
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

    TodoApi.getAll(function(todos) {
      AppDispatcher.handleServerAction({
        actionType: AppConstants.GET_TODOS_SUCCESS,
        todos: todos
      });
    }, function(error) {
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

    TodoApi.destroy(id, function() {
      AppDispatcher.handleServerAction({
        actionType: AppConstants.REMOVE_TODO_SUCCESS,
        id: id
      });
    }, function(error) {
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

    TodoApi.update(id, props, function(todo) {
      AppDispatcher.handleServerAction({
        actionType: AppConstants.UPDATE_TODO_SUCCESS,
        id: todo._id,
        props: todo
      });
    }, function(error) {
      AppDispatcher.handleServerAction({
        actionType: AppConstants.UPDATE_TODO_FAIL,
        error: error
      });
    });
  }
};

module.exports = AppActions;