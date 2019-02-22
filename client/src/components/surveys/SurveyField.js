// SurveyField contains logic to render a single
//label and text input

import React from 'react';

// export default (props) => {
export default ({ input, label, meta:{error, touched}}) => {
    // console.log(meta);
    // console.log("surveyfiled props:");
    // console.log(props.input);
    return (
        <div>
            <label>{label}</label>
            {/* {...input} == onBlur={input.onBlur} onChange={input.onChange}.... */}
            <input {...input} style={{marginBottom:'5px'}} />
            <div className="red-text" style={{marginBottom: '20px'}}>
                {touched && error}
            </div>
            
        </div>
    )
}