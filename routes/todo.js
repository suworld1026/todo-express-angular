'use strict';

module.exports = function(app) {
  let TodoController = app.controllers.todo;

  app.get('/todos', TodoController.index); 
  app.post('/todos', TodoController.create);
}

