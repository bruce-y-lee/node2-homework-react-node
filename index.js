const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session'); //access cookie
const passport = require('passport');  // give cookie info to passport for authen
const bodyParser = require('body-parser')
const {mongoURI, cookieKey} = require('./config/keys');
require('./models/User');
require('./services/passport');





mongoose.connect(mongoURI);
// const keys = require('./config/keys')
const app = express();

//make  all the data  parse and set to req.body
app.use(bodyParser.json())


app.use(express.static(__dirname));

app.use( 
    cookieSession({ //create cookie
        maxAge: 24 * 60 * 60 * 1000, // 30 days
        keys: [cookieKey] // to encript cookie, can provide multiple it will randomly choose
    })
);
// cookie info going to passport for authen
app.use(passport.initialize());
app.use(passport.session());


// app.get('/',(req,res)=>{
//     res.send({hi:'there'});
// });

require('./routes/authroutes')(app);
require('./routes/billingRoutes')(app);





const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server is on ${PORT}`);
});
