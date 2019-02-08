module.exports = (req, res, next) => {
//next is done callback : when everything is completed called
    if(!req.user){
        return res.status(401).send({error:'You must log in'})
    }

    next();
}