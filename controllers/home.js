'use strict';

module.exports = function(app) {
  let path = require('path');

  let HomeController = {
    index: function(req, res) {
      res.sendFile(path.join(__dirname, '../public/html', 'index.html'));
    }
  };

  return HomeController;
}
