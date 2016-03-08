'use strict';

module.exports = function(app) {
  let HomeController = {
    index: function(req, res) {
      res.send('Hello Word');
    }
  };

  return HomeController;
}
