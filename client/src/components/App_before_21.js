import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

//dummy component for now
// const Header = () => <h2>Header</h2>\
import Header from './Header';

const Dashboard = () => <h2>Dashboard</h2>
const SurveyNew = () => <h2>SurveyNew</h2>
const Landing = () => <h2>Landing</h2>

//browserRouter accept at most 1 component
const App = () => {
    return (
        <div className="container">
            <BrowserRouter>
                <div>
                    <Header  />
                    <Route exact={true} path="/" component={Landing}/>
                    <Route exact path="/surveys" component={Dashboard}/>
                    <Route path="/surveys/new" component={SurveyNew}/>
                </div>
            </BrowserRouter>
            Hi There!
        </div>
    );
};

export default App;