const passport = require('passport');
// const jwt      = require('jsonwebtoken');
// const bcrypt = require('bcrypt');




module.exports = app => {
    app.get('/auth/google', passport.authenticate('google',{
        scope:['profile','email'] 
     })
    );

    app.get('/auth/google/callback',passport.authenticate('google'),(req,res)=>{
        // res.send(req.user);
        res.redirect('/surveys');
    });


    app.get('/auth/instagram', passport.authenticate('instagram'));

    app.get('/auth/instagram/callback', passport.authenticate('instagram', { failureRedirect: '/login' }), (req, res) => {
        // Successful authentication, redirect home.
        console.log("success");
        res.redirect('/surveys');
    });

    app.get('/auth/facebook', passport.authenticate('facebook'));

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
    app.get('/auth/facebook/callback', passport.authenticate('facebook', { successRedirect: '/surveys',
                                                                           failureRedirect: '/login' }));

    app.get('/api/logout',(req,res)=>{
        // console.log("req",req);
        req.logout();
        // res.send(req.uesr);    
        res.redirect('/');
    }); 
    app.get('/api/current_user', (req, res) => {
        // console.log("req",req);
        res.send(req.user);
        // res.send(req.session);

    });

    
}

 

 