import request from 'supertest';
import server from '../server';

describe('root route', () => {
  it('should respond with a status 200', (done) => {
    request(server)
      .get('/')
      .expect(200, done);
  });

  it('should respond with html', (done) => {
    request(server)
      .get('/')
      .expect('Content-Type', /html/, done);
  });
});