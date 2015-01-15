var AppDispatcher = require('../dispatcher/app-dispatcher.js');
var AppConstants = require('../constants/app-constants.js');
var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var _todos = {};

function createAll (todos) {
  _todos = {};
  todos.forEach(function(todo) {
    todo.synced = true;
    _todos[todo._id] = todo;
  });
}

function update (id, props, synced) {
  var todo = _todos[id];
  assign(todo, props, synced);
  _todos[id] = assign(todo, props, { synced: synced });
}

var TodoStore = assign({}, EventEmitter.prototype, {
  emitChange: function () {
    console.log('TodoStore Change Event Emitted');
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getAll: function() {
    return _todos;
  },
});

AppDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.actionType) {
    case AppConstants.UPDATE_TODO:
      update(action.id, action.props, false);
      TodoStore.emitChange();
      break;

    case AppConstants.GET_TODOS_SUCCESS:
      createAll(action.todos);
      TodoStore.emitChange();
      break;

    default:
      // no op
  }
});

module.exports = TodoStore;