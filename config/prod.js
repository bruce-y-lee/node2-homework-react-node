//production keys here
module.exports = {
    googleClientID : process.env.GOOGLE_CLIENT_ID,
    //"670980002889-drrjr91j31v05gli12ri1m41uafpj00h.apps.googleusercontent.com",
    googleClientSecret : process.env.GOOGLE_CLIENT_SECRET,
    //"OSkeA_Wlf-OyQLt4MgNT762i",
    mongoURI: process.env.MONGO_URI,
    //"mongodb://alexander:123asd@ds211275.mlab.com:11275/node2-emaily-dev",
    cookieKey: process.env.COOKIE_KEY,
    //"asdfsdfhkjasdhf83asndvmasndfoi332kdnjsn"
    stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    stripeSecretKey: process.env.STRIPE_SECRET_KEY
}

//mongodb://adminUser:123asd@ds157762.mlab.com:57762/node2-emaily-prod