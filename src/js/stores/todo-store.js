import AppDispatcher from '../dispatcher/app-dispatcher';
import AppConstants from '../constants/app-constants';
import {EventEmitter} from 'events';
// polyfill since 6to5 does not currently support Object.assign
import assign from 'object-assign';

const CHANGE_EVENT = 'change';

let _todos = {};

// Our client-side CRUD methods for Todos:
function create (todo) {
  todo.synced = false;
  _todos[todo.id] = todo;
}

function createAll (todos) {
  _todos = {};
  todos.forEach( (todo) => {
    todo.synced = true;
    _todos[todo.id] = todo;
  });
}

function destroy (id) {
  delete _todos[id];
}

function update (id, props, synced) {
  let todo = _todos[id];
  /* This is a simplistic way of tracking whether Todo's state is currently
  synced with the server and should probably be replaced with a more
  sophisticated method for production, but for our demo purposes it's fine */
  _todos[id] = assign(todo, props, { synced: synced });
}

/* The store only needs to allow components to register/unregister listeners,
and emit change events. Since we have just one top-level component managing
state for all components interested in Todos, the only other method necessary
is one for getting all the Todos */
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

/* Register with the App Dispatcher, and declare how the store handles various
actions. This should be the sole way in which a client side model gets updated */
AppDispatcher.register( (payload) => {
  let action = payload.action;

  switch(action.actionType) {
    case AppConstants.UPDATE_TODO:
      update(action.todo.id, action.props, false);
      TodoStore.emitChange();
      break;

    case AppConstants.UPDATE_TODO_SUCCESS:
      update(action.todo.id, action.props, true);
      TodoStore.emitChange();
      break;

    case AppConstants.GET_TODOS_SUCCESS:
      createAll(action.todos);
      TodoStore.emitChange();
      break;

    case AppConstants.ADD_TODO:
      create(action.todo);
      TodoStore.emitChange();

    case AppConstants.ADD_TODO_SUCCESS:
      update(action.todo.id, action.todo, true);
      TodoStore.emitChange();
      break;

    case AppConstants.REMOVE_TODO:
      destroy(action.todo.id);
      TodoStore.emitChange();
      break;

    default:
      // no op
  }
});

export default TodoStore;
