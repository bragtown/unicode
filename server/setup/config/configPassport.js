var LocalStrategy = require('passport-local');
var User = require('../models/user')

module.exports = function(passport){
    
    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });


    passport.use(
    	'local-login',
    	new LocalStrategy(
    		{
    			usernameField: 'email',
    			passwordField: 'password',
    			passReqToCallback: true
    		},
    		function(req, email, password, done){
    			User.findOne({'local.email':email}, function(err, user){
    				//iff err
    				if(err)
    					return done(err);
    				//if no user is found
    				if(!user){
    					//res.send('loginMessage', 'no user found')
    					return done(null, false);
    				}
					//if invalid password
					if(!user.validPassword(password)){
						//res.send({loginMessage: 'Wrong Password!'})
						return done(null, false);
					}

					return done(null,user);	
    			});
    		}
    	)  	
	);

    passport.use(
    	'local-signup',
		new LocalStrategy(
			{
				usernameField: 'email',
				passwordField: 'password',
				passReqToCallback: true //allows us to pass this request into the callback function
			},
			function(req, email, password, done){
				console.log("in local signup");

				process.nextTick(function(){
					console.log('in nextTick');
					User.findOne({'local.email':email}, function(err, user){
						console.log('in findOne');
						if(err){
							console.log('auth err');
							return done(err);
						}
						if(user){
							console.log('user');
							return done(null, false, req.send({signupMessage: 'User account exists'}))
						}
						else{
							if(password){
								console.log(req.body)
								user = new User();
								user.fName = req.body.fName;
								user.lName = req.body.lName;
								user.local.email = email;
								user.local.password = user.generateHash(password);						
								var save = function(){
									user.save(function(err){
										if(err){
											console.log('err:', err);
											throw err;
										}
										console.log("Saving User");
										return done(null, user);
									});
								}
								save();
							}
							else{
								console.log('in else');
								return done(null, false, req.send({signupMessage:'User account exists'}))
							}
						}
					});
				});
			}
		)
	);
}