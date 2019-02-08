import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Payments from './Payments';

class Header extends Component {
    renderContent() {
        switch (this.props.auth){
            case null:
                return;
            case false:
                return (
                    <li><a href="/auth/google">Sign in withh Google</a></li>
                );
            default:
               return [
                    <li key="1" ><Payments /></li>,
                    <li key="3" style={{margin: '0 10px'}}>
                        Credits: {this.props.auth.credits}
                    </li>,
                    <li key="2" ><a href="/api/logout">Loogout</a></li>
                ]
            }
    }
    // <li><a href="/api/current_user">Login With Google</a></li>
    // <li><a href="badges.html">Components</a></li>
    // <li><a href="collapsible.html">JavaScript</a></li>
    //<ul id="nav-mobile" className="right hide-on-med-and-down">
    render(){
        console.log(this.props);
        return (
            <nav>
                <div className="nav-wrapper">
                <Link
                    to={this.props.auth ? '/surveys':'/'} 
                    className="left brand-logo"
                >
                    Emaily
                </Link>
                <ul id="nav-mobile" className="right">
                    {this.renderContent()}            
                </ul>
                </div>
            </nav>
        )
    }
}


// function mapStateToProps(state){
//     return { auth: state.auth}
// }

function mapStateToProps({auth}){
    return { auth}
}
export default connect(mapStateToProps)(Header);