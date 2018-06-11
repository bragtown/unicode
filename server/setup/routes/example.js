var express = require('express');
var Example = require('../controllers/example')

var router = express.Router()



module.exports = function(app,passport){

    router.get('/example', Example.get)
    router.put('/example', Example.put)
    router.post('/example', Example.post)
    router.delete('example', Example.del)
    router.get('/examples', Example.getAll)

    app.use(router);
}