import Todo from './models/todo';
import express from 'express';
import morgan from 'morgan';

const router = express.Router();

// log all requests to the console
router.use(morgan('dev'));

router.route('/todos')

  // create a Todo (accessed at POST http://localhost:8080/api/todos)
  .post(function(req, res) {

    var todo = new Todo();
    todo.name = req.body.name;
    todo.completed = req.body.completed;

    // save the Todo and check for errors
    todo.save(function(err, todo) {
      if (err) {
        res.status(500).send(err);
      }

      res.json(todo);
    });
  })

  // get all the Todos (accessed at GET http://localhost/api/todos)
  .get(function(req, res) {
    Todo.find(function(err, todos) {
      if (err) {
        res.status(500).send(err);
      }

      res.json(todos);
    });
  });

router.route('/todos/:todo_id')

  // get the Todo with that id (accessed at GET http://localhost:8080/api/todos/:todo_id)
  .get(function(req, res) {
    Todo.findById(req.params.todo_id, function(err, todo) {
      if (err) {
        res.status(500).send(err);
      }

      res.json(todo);
    });
  })

  // update the todo with this id (accessed at PUT http://localhost:8080/api/todos/:todo_id)
  .put(function(req, res) {
    Todo.findById(req.params.todo_id, function(err, todo) {
      if (err) {
        res.status(500).send(err);
      }

      if (req.body.name) { todo.name = req.body.name; }
      if (req.body.completed) { todo.completed = req.body.completed; }

      todo.save(function(err, todo) {
        if (err) {
          res.send(err);
        }

        res.json(todo);
      });
    });
  })

  // delete the todo with this id (accessed at DELETE http://localhost:8080/api/todos/:todo_id)
  .delete(function(req, res) {
    Todo.remove({
      _id: req.params.todo_id
    }, function(err, todo) {
      if (err) {
        res.status(500).send(err);
      }

      res.json(todo);
    });
  });

export default router;
