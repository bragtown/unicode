var express = require('express')
var path = require('path');
module.exports.initialize = function(app,passport){
    var router = express.Router();

    router.use(express.static(path.join(__dirname, '../../public/'))) 
    app.use(router)
    
    var example = require('./example')
    example(app,passport);

    var auth = require('./auth');
    auth(app,passport);

}
