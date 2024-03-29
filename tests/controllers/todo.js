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


  it('PUT /todos -> should update a todo', (done) => {
    let todo = new Todo({
      text: 'Hello update',
      done: false
    });

    todo.save().then((data) => {
      request.put('/todos').send({
        id: data._id,
        text: 'updated !',
        done: true
      }).expect(200).end((err, res) => {
        should.not.exist(err);
        res.body._id.should.be.equal(data._id.toString());
        res.body.text.should.be.equal('updated !');
        res.body.done.should.be.equal(true);
        done();
      });
    });
  });


  it('DELETE /todos -> should delete a todo', (done) => {
    let todo = new Todo({
      text: 'delete-me',
      done: false
    });

    todo.save().then((data) => {
      request.delete('/todos').send({id: data._id}).expect(200).end((err, res) => {
        should.not.exist(err);
        res.body.ok.should.be.equal(1);
        res.body.n.should.be.equal(1);
        done();
      });
    });
  });
});

