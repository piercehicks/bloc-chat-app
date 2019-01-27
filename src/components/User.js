import React, { Component } from 'react';

class User extends Component {
  constructor(props){
    super(props);

    this.setState = {
      
    }

  }


handleSignIn(){
  const provider = new this.props.firebase.auth.GoogleAuthProvider();
 this.props.firebase.auth().signInWithPopup(provider).then((result) => {
   const user = result.user;
   this.props.setUser(user);
 });

};

handleSignOut(){
  this.props.firebase.auth().signOut();
};

componentDidMount(){
  this.props.firebase.auth().onAuthStateChanged( user => {
    this.props.setUser(user);
    });
};

        render(){

          return(
            <div>
              <button onClick={() => this.handleSignIn()}>Sign-In</button>
              <button onClick={() => this.handleSignOut()}>Sign-Out</button>
              <h3>{this.props.user}</h3>
            </div>
          )

        }
      }
export default User;
