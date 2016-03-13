'use strict';

module.exports = function(app) {
  let TodoController = app.controllers.todo;

  app.get('/todos', TodoController.index);
  app.post('/todos', TodoController.create);
  app.get('/todos/:id', TodoController.show);
  app.put('/todos', TodoController.update);
  app.delete('/todos', TodoController.destroy);
}

