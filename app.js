'use strict';

let express    = require('express'),
    consign    = require('consign'),
    morgan     = require('morgan'),
    bodyParser = require('body-parser'),
    app        = express();

/* Express configuration */
app.use(morgan('tiny'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json())

app.use(express.static(__dirname + '/public'));

/* Autoload MVC structure */
consign()
  .include('controllers')
  .then('routes')
  .into(app);


/* Run development server */
if (process.argv.indexOf('-s') !== -1) {
  app.listen(3000, () => {
    console.log('\n\tRunning on: http://127.0.0.1:3000\n\n');
  });
}


exports.app = app;

