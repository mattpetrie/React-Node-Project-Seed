import TodoApi from './todo-api';
import jQuery from 'jquery';

describe('Client-Side Todo API', () => {
  let server, successFn, failureFn;
  let todo = {id: '1', name: 'foo', completed: false};

  beforeEach( () => {
    failureFn = sinon.spy();
    successFn = sinon.spy();
  });

  before(() => {
    server = sinon.fakeServer.create();
  });

  after(() => {
    server.restore();
  });

  describe ('#create', () => {

    before(() => {
      server.respondWith("POST", "/api/todos/", (req) => {
        if(req.requestBody) {
          req.respond(200, {}, JSON.stringify(todo));
        } else {
          req.respond(500, {}, '');
        }
      });
    });

    it('sends a POST request with the todo as JSON', () => {
      sinon.stub(jQuery, 'ajax');
      TodoApi.create(todo, successFn, failureFn);

      expect(jQuery.ajax).to.have.been.calledWithMatch({
        type: 'POST',
        dataType: 'json',
        data: todo
      });

      jQuery.ajax.restore();
    });

    it('calls the success callback on success', () => {
      TodoApi.create(todo, successFn, failureFn);
      server.respond();

      expect(successFn).to.have.been.called;
      expect(failureFn).not.to.have.been.called;
    });

    it('calls the failure callback on failure', () => {
      TodoApi.create({}, successFn, failureFn);
      server.respond();

      expect(failureFn).to.have.been.called;
      expect(successFn).not.to.have.been.called;
    });
  });

  describe ('#destroy', () => {

    before(() => {
      server.respondWith("DELETE", "/api/todos/1", (req) => {
          req.respond(200, {}, JSON.stringify(todo));
      });

      server.respondWith("DELETE", "/api/todos/2", (req) => {
          req.respond(500, {}, '');
      });
    });

    it('sends a DELETE request with the todo as JSON', () => {
      sinon.stub(jQuery, 'ajax');
      TodoApi.destroy(todo, successFn, failureFn);

      expect(jQuery.ajax).to.have.been.calledWithMatch({
        url: '/api/todos/1',
        type: 'DELETE',
        dataType: 'json',
      });

      jQuery.ajax.restore();
    });

    it('calls the success callback on success', () => {
      TodoApi.destroy(todo, successFn, failureFn);
      server.respond();

      expect(successFn).to.have.been.called;
      expect(failureFn).not.to.have.been.called;
    });

    it('calls the failure callback on failure', () => {
      TodoApi.destroy({id: '2'}, successFn, failureFn);
      server.respond();

      expect(failureFn).to.have.been.called;
      expect(successFn).not.to.have.been.called;
    });
  });

  describe ('#getAll', () => {

    // create a switch to allow get all request to succeed or fail
    let requestSuccess = true;

    before(() => {
      server.respondWith("GET", "/api/todos/", (req) => {
          if (requestSuccess) {
            req.respond(200, {}, JSON.stringify([todo]));
          } else {
            req.respond(500, {}, '');
          }
      });
    });

    it('sends a GET request', () => {
      sinon.stub(jQuery, 'ajax');
      TodoApi.getAll(successFn, failureFn);

      expect(jQuery.ajax).to.have.been.calledWithMatch({
        url: '/api/todos/',
        type: 'GET',
        dataType: 'json',
      });

      jQuery.ajax.restore();
    });

    it('calls the success callback on success', () => {
      TodoApi.getAll(successFn, failureFn);
      server.respond();

      expect(successFn).to.have.been.called;
      expect(failureFn).not.to.have.been.called;
    });

    it('calls the failure callback on failure', () => {
      requestSuccess = false;
      TodoApi.getAll(successFn, failureFn);
      server.respond();

      expect(failureFn).to.have.been.called;
      expect(successFn).not.to.have.been.called;
    });
  });

  describe ('#get', () => {

    before(() => {
      server.respondWith("GET", "/api/todos/1", (req) => {
          req.respond(200, {}, JSON.stringify(todo));
      });

      server.respondWith("GET", "/api/todos/2", (req) => {
          req.respond(500, {}, '');
      });
    });

    it('sends a GET request with the todo id as JSON', () => {
      sinon.stub(jQuery, 'ajax');
      TodoApi.get('1', successFn, failureFn);

      expect(jQuery.ajax).to.have.been.calledWithMatch({
        url: '/api/todos/1',
        type: 'GET',
        dataType: 'json',
      });

      jQuery.ajax.restore();
    });

    it('calls the success callback on success', () => {
      TodoApi.get('1', successFn, failureFn);
      server.respond();

      expect(successFn).to.have.been.called;
      expect(failureFn).not.to.have.been.called;
    });

    it('calls the failure callback on failure', () => {
      TodoApi.get('2', successFn, failureFn);
      server.respond();

      expect(failureFn).to.have.been.called;
      expect(successFn).not.to.have.been.called;
    });
  });

  describe ('#update', () => {

    before(() => {
      server.respondWith("PUT", "/api/todos/1", (req) => {
          req.respond(200, {}, JSON.stringify(todo));
      });

      server.respondWith("PUT", "/api/todos/2", (req) => {
          req.respond(500, {}, '');
      });
    });

    it('sends a PUT request with the updated props as JSON', () => {
      sinon.stub(jQuery, 'ajax');
      TodoApi.update(todo, {completed: true}, successFn, failureFn);

      expect(jQuery.ajax).to.have.been.calledWithMatch({
        url: '/api/todos/1',
        type: 'PUT',
        dataType: 'json',
        data: {completed: true}
      });

      jQuery.ajax.restore();
    });

    it('calls the success callback on success', () => {
      TodoApi.update(todo, {completed: true}, successFn, failureFn);
      server.respond();

      expect(successFn).to.have.been.called;
      expect(failureFn).not.to.have.been.called;

    });

    it('calls the failure callback on failure', () => {
      TodoApi.update({id: '2'}, {completed: true}, successFn, failureFn);
      server.respond();

      expect(failureFn).to.have.been.called;
      expect(successFn).not.to.have.been.called;
    });
  });
});