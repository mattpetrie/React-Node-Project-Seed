var Todo = require('../../models/todo');
var express = require('express');
var router = express.Router();

router.route('/todos')

  // create a Todo (accessed at POST http://localhost:8080/api/todos)
  .post(function(req, res) {

    var todo = new Todo();
    todo.name = req.body.name;
    todo.done = req.body.done;

    // save the Todo and check for errors
    todo.save(function(err) {
      if (err) {
        res.send(err);
      }

      res.json({ message: 'Todo created!' });
    });
  })

  // get all the Todos (accessed at GET http://localhost/api/todos)
  .get(function(req, res) {
    Todo.find(function(err, todos) {
      if (err) {
        res.send(err);
      }

      res.json(todos);
    });
  });

router.route('/todos/:todo_id')

  // get the Todo with that id (accessed at GET http://localhost:8080/api/todos/:todo_id)
  .get(function(req, res) {
    Todo.findById(req.params.todo_id, function(err, todo) {
      if (err) {
        res.send(err);
      }

      res.json(todo);
    });
  })

  // update the todo with this id (accessed at PUT http://localhost:8080/api/todos/:todo_id)
  .put(function(req, res) {
    Todo.findById(req.params.todo_id, function(err, todo) {
      if (err) {
        res.send(err);
      }

      if (req.body.name) { todo.name = req.body.name; }
      if (req.body.done) { todo.done = req.body.done; }

      todo.save(function(err) {
        if (err) {
          res.send(err);
        }

        res.json({ message: 'Todo updated!' });
      });
    });
  })

  // delete the todo with this id (accessed at DELETE http://localhost:8080/api/todos/:todo_id)
  .delete(function(req, res) {
    Todo.remove({
      _id: req.params.todo_id
    }, function(err, todo) {
      if (err) {
        res.send(err);
      }

      res.json({ message: 'Successfully deleted' });
    });
  });

module.exports = router;
