//requires
var express = require('express');
// import express from 'express'
var config = require('./setup/config/config.js')
// import config from './setup/config/config.js'


var MongoClient = require('mongodb').MongoClient, assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/myproject';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
assert.equal(null, err);
console.log("Connected successfully to server");

});

var app = express();

app.set('port', process.env.PORT || 3000);  //listen on the port
app = config(app);



var server = app.listen(app.get('port'),function(){
	console.log('Server up: http://127.0.0.1:'+ app.get('port'));
}); 

require('./setup/socket.js')(server)

process.on('unhandledRejection', (reason,promise) => {
    console.log(promise);
});