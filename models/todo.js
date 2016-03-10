'use strict';

module.exports = function(app) {

  function textValidator(value) {
    return value.length >= 4;
  }

  let TodoSchema = new app.mongoose.Schema({
    text: {type: String, default: '', validate: [textValidator, 'Text must have at least 4 characters']},
    done: {type: Boolean, default: false, required: true}
  });

  let TodoModel = app.mongoose.model('todos', TodoSchema);

  return TodoModel;
}

