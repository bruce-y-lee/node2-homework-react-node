const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const {googleClientID, googleClientSecret} = require('../config/keys');


const User = mongoose.model('users');

passport.serializeUser((user,done) => {
    done(null, user.id); //user.id -> mongo _id  we use this internal ID
    console.log("serialzeUser user",user);
});

passport.deserializeUser((id, done) => { // id -> user.id
console.log("deserializer id", id);
    User.findById(id)
        .then((user) => {
            done(null, user);
        });

});

passport.use(new GoogleStrategy({
    clientID: googleClientID,
    clientSecret: googleClientSecret,
    callbackURL:'/auth/google/callback',
    proxy: true
  },
    async (accessToken, refreshToken, profile, done) => {
    const existingUser = await User.findOne({googleId: profile.id})
        // .then((existingUser)=>{
            if(existingUser){
                //we already have a record of a profile id
                done(null,existingUser);
            }//else {
                // we don't have a record, make a new record
                const user = await new User({ googleId: profile.id}).save()
                // .then(user=>done(null,user));
                done(null,user);
           // }
        
    
    // console.log('access toten: ',accessToken);
    // console.log('refresh token: ',refreshToken);
    // console.log('profile: ', profile);
  })
);

