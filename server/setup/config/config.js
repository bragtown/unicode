var bodyParser = require('body-parser');
var routes = require('../routes/index.js');
var path = require('path');
var express = require('express');
var session = require('express-session')
var cookieParser = require('cookie-parser')

var passport = require('passport');
var confPassport = require('./configPassport');


module.exports = function(app){
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(bodyParser.urlencoded({extended:true}));
    app.use(session({
        
		secret: 'somefunsecrettotypeinhere',
		resave: true, //look into these options more
		saveUninitialized: true,
		allowedHeaders:'',
        methods:''
        
    }))
    
    confPassport(passport);
    app.use(passport.initialize());
    app.use(passport.session());

    routes.initialize(app,passport)
    return app;
}