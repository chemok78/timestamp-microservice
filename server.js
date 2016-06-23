'use strict';

var express = require('express');
var routes = require('./app/routes/index.js');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');

var app = express();
//create express app

require('dotenv').load();
//Loads environment variables from .env file
//The process.env property returns an object containing the user environment
//Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env.

require('./app/config/passport')(passport);
//require configuration file for passport

mongoose.connect(process.env.MONGO_URI);
//connect to mondodb database using mongoose

app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
app.use('/public', express.static(process.cwd() + '/public'));
app.use('/common', express.static(process.cwd() + '/app/common'));

app.use(session({
	secret: 'secretClementine',
	resave: false,
	saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

routes(app, passport);

var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});