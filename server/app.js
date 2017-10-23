'use strict';

var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 4009;
var routes = require('./routes');

var cars = [];

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.json({ message: 'hi' });
});

app.use('/car', routes);

app.listen(port, function() {
  console.log('Listening on port http://localhost:%d', port);
});
