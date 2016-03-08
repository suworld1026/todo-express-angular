'use strict';

module.exports = function(app) {
  let HomeController = app.controllers.home;

  app.get('/', HomeController.index);
}

