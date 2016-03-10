'use strict';

module.exports = function(app) {
  let Todo = app.models.todo;

  let TodoController = {
    index: function(req, res) {
      Todo.find().then((data) => {
        res.send(data);
      }).catch((err) => {
        res.send({
          error: true,
          message: err.errors.text.message
        });
      });      
    },


    create: function(req, res) {
      let text = req.body.text;
      let done = req.body.done;

      let todo = new Todo({
        text: text,
        done: done
      });

      todo.save().then((data) => {
        res.send(data);
      }).catch((err) => {
        console.error(err);
        res.send(err);
      });
    }    
  };

  return TodoController;
}

