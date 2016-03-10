'use strict';

let app = require('../../app').app,
    supertest = require('supertest'),
    should = require('should');

describe('TodoController actions', () => {
  let request = supertest(app);
  let Todo = app.models.todo;


  it('GET /todos -> should get all todos', (done) => {
    Todo.count().then((count) => {
      request.get('/todos').expect(200).end((err, res) => {
        should.not.exist(err);      
        res.type.should.be.equal('application/json');
        res.body.length.should.be.equal(count);
        done();
      });
    }).catch((error) => {
      should.not.exist(error);
      done();
    });
  });
});

