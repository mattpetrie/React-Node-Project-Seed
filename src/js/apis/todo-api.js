var $ = require('jquery');

var BASE_URL = '/api/todos/';

var TodoApi = {
  create: function(todo, success, failure) {
    $.ajax({
      url: BASE_URL,
      type: 'POST',
      dataType: 'json',
      data: todo,
      success: function(data) {
        success(data);
      },
      error: function() {
        failure();
      }
    });
  },

  destroy: function(_id, success, failure) {
    $.ajax({
      url: BASE_URL + _id,
      type: 'DELETE',
      dataType: 'json',
      success: function(data) {
        success(data);
      },
      error: function(xhr, status, error) {
        failure(error);
      }
    });
  },

  getAll: function(success, failure) {
    $.ajax({
      url: BASE_URL,
      dataType: 'json',
      success: function(data) {
        success(data);
      },
      error: function(xhr, status, error) {
        failure(error);
      }
    });
  },

  get: function(_id, success, failure) {
    $.ajax({
      url: BASE_URL + _id,
      dataType: 'json',
      success: function(data) {
        success(data);
      },
      error: function(xhr, status, error) {
        failure(error);
      }
    });
  },

  update: function(_id, props, success, failure) {
    $.ajax({
      url: BASE_URL + _id,
      type: 'PUT',
      dataType: 'json',
      data: props,
      success: function(data) {
        success(data);
      },
      error: function(xhr, status, error) {
        failure(error);
      }
    });
  },
};

module.exports = TodoApi;