'use strict';

let app = require('../../app').app,
    supertest = require('supertest'),
    should = require('should');

describe('TodoController actions', () => {
  let request = supertest(app);
  let Todo = app.models.todo;


  before(() => {
    Todo.create({
      text: 'Simple text 1',
      done: false
    });
  });


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


  it('POST /todos -> should create a new todo', (done) => {
    request.post('/todos').send({
      text: 'Hello World !'
    }).expect(200).end((err, res) => {
      should.not.exist(err);
      res.type.should.be.equal('application/json');
      let text = res.body.text;

      text.should.be.equal('Hello World !');

      done();
    });
  });


  it('POST /todos -> should not create a invalid todo', (done) => {
    request.post('/todos').send({
      text: 'abc'
    }).expect(200).end((err, res) => {
      should.not.exist(err);
      res.body.errors.text.message.should.be.equal(Todo.TEXT_LENGTH_ERROR);
      done();
    });
  });


  it('GET /todos/:id -> should get a todo data', (done) => {
    Todo.findOne().then((data) => {
      request.get('/todos/:id').send({
        id: data._id
      }).expect(200).end((err, res) => {
        should.not.exist(err);
        res.body._id.should.be.equal(data._id.toString());
        done();
      });
    }).catch((err) => {
      should.not.exist(err);
      done();
    });
  });
});

