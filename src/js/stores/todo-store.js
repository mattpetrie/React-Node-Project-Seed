import AppDispatcher from '../dispatcher/app-dispatcher';
import AppConstants from '../constants/app-constants';
import {EventEmitter} from 'events';
// polyfill since 6to5 does not currently support Object.assign
import assign from 'object-assign';

const CHANGE_EVENT = 'change';

let _todos = {};

function create (todo) {
  todo.synced = true;
  _todos[todo._id] = todo;
}

function createAll (todos) {
  _todos = {};
  todos.forEach( (todo) => {
    todo.synced = true;
    _todos[todo._id] = todo;
  });
}

function destroy (id) {
  delete _todos[id];
}

function update (id, props, synced) {
  let todo = _todos[id];
  assign(todo, props, synced);
  _todos[id] = assign(todo, props, { synced: synced });
}

const TodoStore = assign({}, EventEmitter.prototype, {
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

AppDispatcher.register( (payload) => {
  let action = payload.action;

  switch(action.actionType) {
    case AppConstants.UPDATE_TODO:
      update(action.id, action.props, false);
      TodoStore.emitChange();
      break;

    case AppConstants.UPDATE_TODO_SUCCESS:
      update(action.id, action.props, true);
      TodoStore.emitChange();
      break;

    case AppConstants.GET_TODOS_SUCCESS:
      createAll(action.todos);
      TodoStore.emitChange();
      break;

    case AppConstants.ADD_TODO_SUCCESS:
      create(action.todo);
      TodoStore.emitChange();
      break;

    case AppConstants.REMOVE_TODO:
      destroy(action.id);
      TodoStore.emitChange();
      break;

    default:
      // no op
  }
});

export default TodoStore;
