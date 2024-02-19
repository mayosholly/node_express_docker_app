const models = require('../models');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');


function signup(req,res){

    models.User.findOne({where : {email: req.body.email}}).then(
        result => {
            res.status(409).json({
                message: 'Email Already Exists'
            })
        }
    ).catch( error => {
        res.status(500).json({
            message: 'Error creating'
    })
    })

    bcryptjs.genSalt(10, function(err, salt){
        bcryptjs.hash(req.body.password, salt, function(err, hash){
            const user = {
                name : req.body.name,
                email : req.body.email,
                password: hash
            }
        
            models.User.create(user).then(
                result => {
                    res.status(200).json({
                        message: 'User created successfully',
                        user: user
                    })
                }
            ).catch(
                error => {
                    res.status(500).json({
                        message: 'Error creating user',
                        error: error
                    })
                }
            )
        
        })
    })
}

function login(req, res){
    models.User.findOne({where: {email: req.body.email}}).then(user => {
        if(user === null){
            res.status(401).json({
                message: 'Invalid Credentials'
            })
        }else{
            bcryptjs.compare(req.body.password, user.password, function(err, result){
                if(result){
                    const token = jwt.sign({
                        email: user.email,
                        userId: user.id
                    }, process.env.JWT_KEY, function(err, token){
                        res.status(200).json({
                            message: 'Successfully logged in',
                            token: token
                        })
                    })
                }else{
                    res.status(500).json({
                        message: 'Error logging in',
                        error: error
                    })
                }
            })
        }
    }).catch(error => {
        res.status(500).json({
            message: 'Error logging in',
            error: error
        })
    })
}

module.exports = {
    signup: signup,
    login : login
}