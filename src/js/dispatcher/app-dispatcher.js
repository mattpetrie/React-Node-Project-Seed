/*
* Copyright (c) 2014, Facebook, Inc.
* All rights reserved.
*
* This source code is licensed under the BSD-style license found in the
* LICENSE file in the root directory of this source tree. An additional grant
* of patent rights can be found in the PATENTS file in the same directory.
*
* AppDispatcher
*
* A singleton that operates as the central hub for application updates.
*/

var Dispatcher = require('flux').Dispatcher;
var assign = require('object-assign');

var AppDispatcher = assign(new Dispatcher(), {
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

module.exports = AppDispatcher;