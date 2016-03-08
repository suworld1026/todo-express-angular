'use strict';

let express = require('express'),
    consign = require('consign'),
    app = express();


consign()
  .include('controllers')
  .then('routes')
  .into(app);


app.listen(3000, () => {
  console.log('Running on: http://127.0.0.1:3000');
});

