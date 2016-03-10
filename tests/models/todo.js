'use strict';

let app = require('../../app').app,
    should = require('should');

describe('TodoModel validations', () => {
  let TodoModel = app.models.todo;
  let todo = undefined;

  beforeEach(() => {
    todo = new TodoModel({
      text: 'A valid text',
      done: true
    });
  });


  it('Todo text should have at least 4 characters', (done) => {
    todo.text = '';

    todo.save().then((data) => {
      data.should.be.equal(undefined);
      done();    
    }).catch((err) => {
      err.errors.text.message.should.be.equal('Text must have at least 4 characters');
      done();
    });
  });


  it('shoud save a valid todo', (done) => {
    todo.save().then((data) => {
      data.text.should.be.equal('A valid text');
      data.done.should.be.equal(true);
      done();
    }).catch((err) => {
      err.shoud.be.equal(undefined);
      done();
    });
  });
});

