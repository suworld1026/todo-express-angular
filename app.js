'use strict';

let express = require('express'),
    consign = require('consign'),
    morgan  = require('morgan'),
    app     = express();

/* Express configuration */
app.use(morgan('tiny'));


/* Autoload MVC structure */
consign()
  .include('controllers')
  .then('routes')
  .into(app);


/* Run development server */
app.listen(3000, () => {
  console.log('Running on: http://127.0.0.1:3000');
});

