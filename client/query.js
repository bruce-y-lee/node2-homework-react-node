email = a@a.com
// import SurveyField from "./src/components/surveys/SurveyField";
choice = 'yes' || 'no';

Survey.findOne({
    id: suerveyId,
    recipients: {
        $elementMatch: {
            email: email, responeded: false
        }
    }
})
Survey.updateOne({
    id: surveyId,
    recipients: {
        $elementMatch: {
            email: email, responeded: false
        }
    }
}, {
    $inc: { [choice]: 1 },// inc is increament of the value of choice
    $set: { 'recipients.$.responeded': true} // inside of recipient just found recipient 
                //and set the responeded as true 
                            
})