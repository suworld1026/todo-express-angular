'use strict';

let express    = require('express'),
    consign    = require('consign'),
    morgan     = require('morgan'),
    bodyParser = require('body-parser'),
    mongoose   = require('mongoose'),
    session    = require('express-session'),
    app        = express();

/* Express configuration */
app.use(morgan('tiny'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json())

app.use(express.static(__dirname + '/public'));

// Session Storage
app.use(session({
  secret:'batman for president !',
  cookie: {maxAge: 3600000 }, // 2 hours in milliseconds
  resave: true,
  saveUninitialized: true
}));

/* Database connection */
if (process.env.NODE_ENV === 'development') {
  mongoose.connect('mongodb://localhost/todos_development');
} else if (process.env.NODE_ENV === 'test') {
  mongoose.connect('mongodb://localhost/todos_test');
} else {
  // Do nothing
}

app.mongoose = mongoose;

/* Autoload MVC structure */
consign()
  .include('models')
  .then('controllers')
  .then('routes')
  .into(app);


/* Run development server */
if (process.argv.indexOf('-s') !== -1) {
  app.listen(3000, () => {
    console.log('\n\tRunning on: http://127.0.0.1:3000\n\n');
  });
}


exports.app = app;

