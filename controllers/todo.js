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
      req.sanitize('text').escape();

      let text = req.body.text;
      let done = req.body.done;

      let todo = new Todo({
        text: text
      });

      todo.save().then((data) => {
        res.send(data);
      }).catch((err) => {
        res.send(err);
      });
    },


    show: function(req, res) {
      req.sanitize('id').escape();
      let id = req.body.id;

      Todo.findOne({_id: { $in: [id]}}).then((data) => {
        res.send(data);
      }).catch((err) => {
        res.send(err);
      });
    },


    update: function(req, res) {
      req.sanitize('id').escape();
      req.sanitize('text').escape();
      req.sanitize('done').escape();

      let id = req.body.id;

      Todo.findOne({_id: {$in: [id]}}).then((todo) => {
        todo.text = req.body.text;
        todo.done = req.body.done;

        todo.save().then((data) => {
          res.send(data);
        }).catch((err) => {
          res.send(err);
        });
      }).catch((err) => {
        res.send(err);
      });
    },


    destroy: function(req, res) {
      req.sanitize('id').escape();
      let id = req.body.id;

      Todo.remove({_id: id}).then((data) => {
        res.send(data.result);
      }).catch((err) => {
        res.send(err);
      });
    }
  };

  return TodoController;
}

