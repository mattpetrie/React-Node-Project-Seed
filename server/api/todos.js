import Todo from '../models/todo';
import express from 'express';
import morgan from 'morgan';

const router = express.Router();

// log all requests to the console
router.use(morgan('dev'));

function notFoundHandler(res) {
  return res.status(404).send('Todo could not be found!');
}

function errorHandler(res, err) {
  return res.status(500).send(err);
}

router.route('/todos')

  // create a Todo (accessed at POST http://localhost:8080/api/todos)
  .post(function(req, res) {

    // Ids must be a valid UUID
    if (!(req.body.id.match(/[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i))) {
      return res.status(400).send('Id is invalid!');
    }

    // todos must have a name
    if (!req.body.name) {
      return res.status(400).send('Name field is required!');
    }

    // create the Todo and check for errors
    Todo.create(req.body, function(err, todo) {
      if (err) return errorHandler(res, err);

      res.json(todo);
    });
  })

  // get all the Todos (accessed at GET http://localhost/api/todos)
  .get(function(req, res) {
    Todo.find(function(err, todos) {
      if (err) return errorHandler(res, err);

      res.json(todos);
    });
  });

router.route('/todos/:todo_id')

  // get the Todo with that id (accessed at GET http://localhost:8080/api/todos/:todo_id)
  .get(function(req, res) {
    Todo.findOne({id: req.params.todo_id}, function(err, todo) {
      if (err) return errorHandler(res, err);

      if (!todo) return notFoundHandler(res);

      res.json(todo);
    });
  })

  // update the todo with this id (accessed at PUT http://localhost:8080/api/todos/:todo_id)
  .put(function(req, res) {
    Todo.update({id: req.params.todo_id}, req.body, function(err, todo) {
      if (err) return errorHandler(res, err);

      if (!todo) return notFoundHandler(res);

      res.json(todo);
    });
  })

  // delete the todo with this id (accessed at DELETE http://localhost:8080/api/todos/:todo_id)
  .delete(function(req, res) {
    Todo.remove({
      id: req.params.todo_id
    }, function(err, todo) {
      if (err) return errorHandler(res, err);

      if (!todo) return notFoundHandler(res);

      res.json(todo);
    });
  });

export default router;
