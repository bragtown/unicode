var User = require('../models/user');
var sanitize = require('mongo-sanitize');
module.exports = {
    get:function(req,res){
        User.find({}, function(err,users){
            res.send(users)
        })
    },
    put:function(req,res){
        console.log(req.body)
        User.findOne({'_id': req.body._id},function(err,user){
            user.fName = req.body.fName
            user.lName = req.body.lName
            user.local.email = req.body.local.email
            user.save(function(err,item){
                res.send({message:'success'})
            })
        })
    },
    post:function(req,res){ 
        res.send({message:'success',user:req.user})

    },
    del:function(req,res){ 
        let _id = sanitize(req.body._id)
        User.findOneAndRemove({'_id':_id}, function(err,item){
    
            if(err){
                res.send({
                    error:err,
                    code:404
                })
            }
            else{
                res.send({
                    code:200
                })   
            }
        })
    }
}