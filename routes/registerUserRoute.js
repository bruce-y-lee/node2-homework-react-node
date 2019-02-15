const passport = require('passport');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const {jwtSecret} = require('../config/keys');

const User = mongoose.model('users');



module.exports = app => {
    app.post('/jwt/registerUser',(req, res, next)=>{
        console.log("post /jwt/registerUser");
        console.log(req.body);
        // res.send(req.body);
        passport.authenticate('register', async (err, user, info) => {
            console.log("post registerUser");
            if(err){
                console.log(err);
            }
            if(info){
                console.log(info.message);
                res.send(info.message);
            }
            else{
                req.logIn(user, err =>{
                    res.redirect('/surveys');
                })
                
                // res.status(200).send(user);
                // req.logIn(user, err => {
                //     const data = {
                //         email: req.body.email
                //     };
                //     const user = User.findOne({email:data.email})
                //     console.log('user created');
                //     res.status(200).send(user);

                // });
            }
        })(req, res, next);
    });

    app.get('/jwt/loginUser', (req, res, next) => {
        passport.authenticate('login', async (err, user, info) => {
            if (err){
                console.log(err);
            }
            if(info){
                console.log(info.message);
                res.send(info.message);
            }
            else{
                req.logIn(user, err => {
                    const foundUser = User.findOne({email:req.body.email});
                    const token = jwt.sign({id: foundUser.email}, jwtSecret);

                    res.redirect('/surveys');
                    // res.send(req.user);
                    // res.status(200).send({
                    //     auth: true,
                    //     token: token,
                    //     message: 'user found & logged in',
                    // });
                })
            }
        })(req, res, next);
    })    

}