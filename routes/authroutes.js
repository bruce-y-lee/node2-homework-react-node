const passport = require('passport');

module.exports = app => {
    app.get('/auth/google', passport.authenticate('google',{
        scope:['profile','email'] 
     })
    );

    app.get('/auth/google/callback',passport.authenticate('google'),(req,res)=>{
        res.send(req.user);
    });

    app.get('/api/logout',(req,res)=>{
        // console.log("req",req);
        req.logout();
        res.send(req.uesr);    
    }); 
    app.get('/api/current_user', (req, res) => {
        // console.log("req",req);
        // res.send(req.user);
        res.send(req.session);

    })
}

 

 