var mongoose = require('mongoose');
var bcrypt   = require('bcryptjs');
var Schema = mongoose.Schema;
var UserSchema = new Schema({
	fName:{type:String},
	lName:{type:String},
	local:{
		email:String,
		password:String
	},
	userId:Schema.Types.ObjectId
	//
});
//generates a hash
UserSchema.methods.generateHash = function(password){
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}
// checks if password is valid
UserSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.local.password);
};
module.exports = mongoose.model('User', UserSchema);