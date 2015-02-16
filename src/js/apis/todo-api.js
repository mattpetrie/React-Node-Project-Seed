// The API layer which handles the actual syncing of Todos  with the server
import $ from 'jquery';

const BASE_URL = '/api/todos/';

const TodoApi = {
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

  destroy: function(todo, success, failure) {
    $.ajax({
      url: BASE_URL + todo.id,
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
      type: 'GET',
      dataType: 'json',
      success: function(data) {
        success(data);
      },
      error: function(xhr, status, error) {
        failure(error);
      }
    });
  },

  get: function(id, success, failure) {
    $.ajax({
      url: BASE_URL + id,
      type: 'GET',
      dataType: 'json',
      success: function(data) {
        success(data);
      },
      error: function(xhr, status, error) {
        failure(error);
      }
    });
  },

  update: function(todo, props, success, failure) {
    $.ajax({
      url: BASE_URL + todo.id,
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

export default TodoApi;
