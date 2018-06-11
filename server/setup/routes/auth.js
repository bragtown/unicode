var express = require('express');
var router = express.Router();
var User = require('../controllers/users')

module.exports = function(app,passport){

    router.get('/auth', isLoggedIn, User.get)
    router.put('/auth', isLoggedIn, User.put)
    router.post('/login', passport.authenticate('local-login'), User.post)
    router.post('/signup', passport.authenticate('local-signup'), User.post)
    router.delete('/auth', isLoggedIn, User.del)
    router.get('/logout', isLoggedIn, User.get)

    app.use(router);
}


function isLoggedIn(req,res,next){
	console.log('authenticated', req.isAuthenticated())
	if(req.isAuthenticated()){
		return next();
	}
	res.send({message:"not authorized"});
}