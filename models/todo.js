'use strict';

module.exports = function(app) {
  const TEXT_LENGTH_ERROR = 'Text must have at least 4 characters';

  function textValidator(value) {
    return value.length >= 4;
  }

  let TodoSchema = new app.mongoose.Schema({
    text: {type: String, default: '', validate: [textValidator, TEXT_LENGTH_ERROR]},
    done: {type: Boolean, default: false, required: true}
  }, {timestamps: true});

  let TodoModel = app.mongoose.model('todos', TodoSchema);

  TodoModel.TEXT_LENGTH_ERROR = TEXT_LENGTH_ERROR;

  return TodoModel;
}

