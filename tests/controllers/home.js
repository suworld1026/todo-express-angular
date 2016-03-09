'use strict';

let app = require('../../app').app,
    supertest = require('supertest'),
    should = require('should');

describe('HomeController actions', () => {
  let request = supertest(app);


  it('/ -> should send the index file', (done) => {
    request.get('/').expect(200).end((err, res) => {
      should.not.exist(err);
      res.type.should.be.equal('text/html');
      res.text.indexOf("ng-app='todo'").should.not.be.equal(-1);

      done();
    });
  });


  it('/test-json -> should send a json', (done) => {
    request.get('/test-json').expect(200).end((err, res) => {
      should.not.exist(err);
      let json = res.body;
      json.message.should.equal("Hello World");

      done();
    });
  });
});

