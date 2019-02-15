import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../actions';

//dummy component for now
// const Header = () => <h2>Header</h2>\
import Header from './Header';
import Landing from './Landing';


const Dashboard = () => <h2>Dashboard</h2>
const SurveyNew = () => <h2>SurveyNew</h2>


//browserRouter accept at most 1 component
// const App = () => {
class App extends Component {

    componentDidMount() {
        this.props.fetchUser();
        
    }

    render() {    
        return (
            <div className="container">
                <BrowserRouter>
                    <div>
                        <Header />
                        
                        <Route exact={true} path="/" component={Landing}/>
                        <Route exact path="/surveys" component={Dashboard}/>
                        <Route path="/surveys/new" component={SurveyNew}/>
                    </div>
                </BrowserRouter>
                Hi There!
            </div>
        );
    };
}
//The first argument is reserved for the map state to prop's arguments or the map state to proper function
// hich we're not going to use on this component so we're just going to say no for that first argument
//actions assigned to App as a prop
export default connect(null,actions)(App);//