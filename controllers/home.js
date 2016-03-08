'use strict';

module.exports = function(app) {
  let HomeController = {
    index: function(req, res) {
      res.send({message: 'HEllo World !'});
    }
  };

  return HomeController;
}
