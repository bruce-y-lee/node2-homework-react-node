const _ = require('lodash');
const Path = require('path-parser').default;
const {URL} = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {
    app.get('/api/surveys', requireLogin, async (req, res) => {
        // req.user
        const surveys = await Survey.find({_user: req.user.id})
            .select({recipients:false});// not include rcipients field

        res.send(surveys);
    });

    app.get('/api/surveys/:surveyId/:choice', (req, res) => {
        // console.log('get api/survys/thanks');
        res.send('Thanks for voting!')
    });
    
    app.post('/api/surveys/webhooks', (req, res) => {
        // console.log(req.body);
        // res.send({});

        // const events = _.map(req.body, (event)=>{
        //     const pathname = new URL(event.url).pathname;
        //     const p = new Path('/api/surveys/:surveyId/:choice'); //extract surveyId and choice
        //     // console.log(p.test(pathname));
        //     const match = p.test(pathname) //return matched 
        //     if(match){
        //         return {email: event.email, surveyId: match.surveyId, choice:match.choice};
        //     }
        // })
        // const events = _.map(req.body, ({email, url})=>{
        //     const pathname = new URL(url).pathname;
        //     const p = new Path('/api/surveys/:surveyId/:choice'); //extract surveyId and choice
        //     // console.log(p.test(pathname));
        //     const match = p.test(pathname) //return matched 
        //     if(match){
        //         return {email, surveyId: match.surveyId, choice:match.choice};
        //     }
        // });

        const p = new Path('/api/surveys/:surveyId/:choice'); //extract surveyId and choice
        
        // const events = _.map(req.body, ({email, url})=>{          
            
        //     const match = p.test(new URL(url).pathname) //return matched 
        //     if(match){
        //         return {email, surveyId: match.surveyId, choice:match.choice};
        //     }
        // });

        
        // console.log(events);
        // const compactEvents = _.compact(events);
        // const uniqueEvents = _.uniqBy(compactEvents, 'email', 'surveyId');

        // chain -> for repeteatable
        // const events = _.chain(req.body)
        _.chain(req.body)
            .map(({email, url})=>{        
                // console.log('map email url')  ;
                const match = p.test(new URL(url).pathname) //return matched 
                if(match){
                    return { email, surveyId: match.surveyId, choice: match.choice };
                }
            })
            .compact()
            .uniqBy('email', 'surveyId')
            .each(({ surveyId, email, choice }) => {
                console.log("database connect", choice);
                Survey.updateOne(
                    {
                    _id: surveyId,
                    recipients: {
                        $elemMatch: {
                            email: email, responded: false
                        }
                    }
                }, {
                    $inc: { [choice]: 1 },// inc is increament of the value of choice
                    $set: { 'recipients.$.responded': true}, // inside of recipient just found recipient 
                                //and set the responeded as true
                    lastResponded: new Date() 
                                            
                }).exec(()=>{}); //execute 
                // console.log(Survey.findOne({_id:surveyId}));
            })
            .value();
            // console.log(req.body);
        // console.log(events);
        

        res.send({});

    })

    app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
        const { title, subject, body, recipients } = req.body;

        const survey = new Survey({
            title,
            subject,
            body,
            recipients: recipients.split(',').map(email => ({email: email.trim()})),
            _user: req.user.id,
            dateSent: Date.now()

        });
        
        //Great place to send and email
        const mailer = new Mailer(survey, surveyTemplate(survey));
        try{
            await mailer.send();
            await survey.save();
            req.user.credits -= 1;
            const user = await req.user.save();

            res.send(user);
        }
        catch(err){
            res.status(422).send(err);
        }
        


    });
};