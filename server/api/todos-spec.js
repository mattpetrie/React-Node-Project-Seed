import request from 'supertest';
import mongoose from 'mongoose';
import clearDB from 'mocha-mongoose';
import server from '../server';
import db from '../config/db';
import todos from './todos';
import Todo from '../models/todo';

var testDBUri = 'mongodb://localhost/react-node-project-seed-test';
// The mocha-mongoose module handles clearing the test DB between tests
clearDB(testDBUri);
var app;

// fn for generating IDs, since our API requires UUIDs to be used
function generateUUID() {
  var d = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (d + Math.random()*16)%16 | 0;
      d = Math.floor(d/16);
      return (c=='x' ? r : (r&0x3|0x8)).toString(16);
  });
  return uuid;
}

describe('Todos API /api/todos', () => {
  beforeEach((done) => {
    // listen on a different port from out app, so test watch mode doesn't conflict
    app = server.listen(9000);

    if (mongoose.connection.db) return done();

    mongoose.connect(testDBUri, done);
  });

  afterEach( () => {
    app.close();
  });

  after( () =>{
    mongoose.models = {};
    mongoose.modelSchemas = {};
    mongoose.disconnect();
  });

  describe('GET /api/todos/', () => {
    let allTodos = [];

    beforeEach((done) => {
      [1,2,3].forEach((num) => {
        new Todo({id: num, name: 'foo'}).save((err, model) => {
          if (err) return done(err);
          allTodos.push(model);
        });
      });

      done();
    });

    afterEach( (done) => {
      allTodos = [];
      done();
    });

    it('responds with JSON', (done) => {
      request(app)
        .get('/api/todos/')
        .expect('Content-Type', /json/, done);
    });

    it('responds with all of the todos', (done) => {
      request(app)
        .get('/api/todos/')
        .expect((res) => {
          return res.body === allTodos;
        })
        .end(done);
    });
  });

  describe('POST /api/todos/', () => {
    it('responds with status 200 when Todo is valid', (done) => {
      request(app)
        .post('/api/todos/')
        .send({
          id: generateUUID(),
          completed: false,
          name: 'foo'
        })
        .expect(200, done);
    });

    it('responds with a status 400 when required fields are missing', (done) => {
      request(app)
        .post('/api/todos/')
        .send({
          id: generateUUID()
        })
        .expect(400, done);
    });

    it('responds with a status 400 when id is not valid', (done) => {
      request(app)
        .post('/api/todos/')
        .send({
          id: '1',
          name: 'foo',
          completed: false
        })
        .expect(400, done);
    });
  });

  describe('GET /api/todos/:id', () => {
    let todo;

    beforeEach((done) => {
      todo = Todo({id: 1});
      todo.save((err, model) => {
        if (err) return done(err);
      });

      done();
    });

    it('responds with JSON', (done) => {
      request(app)
        .get('/api/todos/' + todo.id)
        .expect('Content-Type', /json/, done);
    });

    it('responds with the requested Todo', (done) => {
      request(app)
        .get('/api/todos/' + todo.id)
        .expect((res) => {
          return res.body === todo;
        })
        .end(done);
    });

    it('responds with a status 404 if the Todo cannot be found', (done) => {
      request(app)
        .get('/api/todos/999')
        .expect(404, done);
    });
  });

  describe('PUT /api/todos/:id', () => {
    let todo;

    beforeEach((done) => {
      todo = Todo({id: '1', name: 'foo', completed: false});
      todo.save((err, model) => {
        if (err) return done(err);
      });

      done();
    });

    it('responds with JSON', (done) => {
      request(app)
        .put('/api/todos/' + todo.id)
        .send({
          completed: true
        })
        .expect('Content-Type', /json/, done);
    });

    it('responds with the updated to', (done) => {
      request(app)
        .put('/api/todos/' + todo.id)
        .send({
          completed: true
        })
        .expect((res) => {
          return (res.body === todo && res.body.completed === 'true');
        })
        .end(done);
    });

    it('responds with a status 404 if the Todo cannot be found', (done) => {
      request(app)
        .put('/api/todos/999')
        .send({})
        .expect(404, done);
    });
  });

  describe('DELETE /api/todos/:id', () => {
    let todo;

    beforeEach((done) => {
      todo = Todo({id: '1', name: 'foo', completed: false});
      todo.save((err, model) => {
        if (err) return done(err);
      });

      done();
    });

    it('responds with JSON', (done) => {
      request(app)
        .delete('/api/todos/' + todo.id)
        .expect('Content-Type', /json/, done);
    });

    it('responds with the deleted to', (done) => {
      request(app)
        .delete('/api/todos/' + todo.id)
        .expect((res) => {
          return (res.body === todo);
        })
        .end(done);
    });

    it('responds with a status 404 if the Todo cannot be found', (done) => {
      request(app)
        .delete('/api/todos/999')
        .expect(404, done);
    });
  })

});

