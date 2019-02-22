import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Payments from './Payments';
//<li><a href="/auth/google">Sign in withh Google</a></li> 

// <button onClick="document.getElementById('modal-wrapper').style.display='block'" style={{margin:'0 10px'} }>Sign in</button> 

class Popup extends Component {
    handleClick = () => {
        // this.props.closePopup;
        // this.props.openPopupRegister;
    }

    render() {
      return (
        <div className='popup'>
        <form className="popup_inner" method="get" action="/jwt/loginUser">
          
            <div className="imgcontainer">
            <span onClick={this.props.closePopup} className="close" title="Close PopUp">&times;</span>
            {/* <img src="1.png" alt="Avatar" className="avatar"></img> */}
                <h1>{this.props.text}</h1>
            </div>

            <div className="container">
                <input type="text" placeholder="Enter Username" name="email"/>
                <input type="password" placeholder="Enter Password" name="password"/>
                <button type="submit">Sign in</button>
                <button onClick={this.handleClick}>Sign up</button>

            {/* <button type="submit">sing in</button> */}
            <button ><a href="/auth/google">Sign in with Google</a></button>    
            <button ><a href="/auth/instagram">Sign in with Instagram</a></button>    
            <button ><a href="/auth/facebook">Sign in with Facebook</a></button> 
            </div>
            
            
        
          </form>
        </div>
      );
    }
  }

  class PopupRegister extends Component {
    render() {
      return (
        <div className='popup'>
        <form className="popup_inner" enctype='application/json' method="post" action="/jwt/registerUser">
          
            <div className="imgcontainer">
            <span onClick={this.props.closePopupRegister} className="close" title="Close PopUp">&times;</span>
            {/* <img src="1.png" alt="Avatar" className="avatar"></img> */}
                <h1>{this.props.text}</h1>
            </div>

            <div className="container">
                <input type="text" placeholder="Enter Username" name="email"/>
                <input type="password" placeholder="Enter Password" name="password"/>
                <button type="submit">Sign up</button>
                

            {/* <button type="submit">sing in</button> */}
            <button ><a href="/auth/google">Sign up with Google</a></button>    
            <button ><a href="/auth/instagram">Sign up with Instagram</a></button>    
            <button ><a href="/auth/facebook">Sign up with Facebook</a></button> 
            </div>
            
            
        
          </form>
        </div>
      );
    }
  } 
class Header extends Component {
    constructor(props, context) {
        super(props, context);
   
        //   this.state = {
        //     display: "none"
        //     // bgColor: "white"
        //   };
          this.state = {
            showPopup: false,
            showPopupRegister: false
          };
   
        //   this.colorValue = this.colorValue.bind(this);
        //   this.setNewColor = this.setNewColor.bind(this);
    }
    togglePopup() {
        this.setState({
          showPopup: !this.state.showPopup
        });
    }
    togglePopupRegister() {
        this.setState({
          showPopupRegister: !this.state.showPopupRegister
        });
    }
    

    
    

    renderContent() {
        var squareStyle = {
            display: this.state.dispaly
          };

        switch (this.props.auth){
            case null:
                return;
            case false:
                return [
                    <li key="1" onClick={this.togglePopup.bind(this)}><button>Sign in</button></li>,
                    <li key="2" onClick={this.togglePopupRegister.bind(this)}><button>Sign up</button></li>
                ]
                
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
        console.log("this.props:");
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
                {this.state.showPopup ? 
                <Popup
                    text='Sign In'
                    closePopup={this.togglePopup.bind(this)}
                    openPopupRegister={this.togglePopupRegister.bind(this)}
                />
                : null
                }
                {this.state.showPopupRegister ?
                <PopupRegister
                    text = 'Sign up'
                    closePopupRegister = {this.togglePopupRegister.bind(this)}
                />
                :null
                }
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