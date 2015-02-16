/*
AppDispatcher

A singleton that operates as the central hub for application updates.
*/

import {Dispatcher} from 'flux';

// polyfill since 6to5 does not currently support Object.assign
import assign from 'object-assign';

const AppDispatcher = assign(new Dispatcher(), {
  handleViewAction: function(action) {
    console.log('view action', action);
    this.dispatch({
      source: 'VIEW_ACTION',
      action: action
    });
  },

  handleServerAction: function(action) {
    console.log('server action', action);
    this.dispatch({
      source: 'SERVER_ACTION',
      action: action
    });
  }
});

export default AppDispatcher;
