
import React, { Component } from 'react';
import RoomList from './components/RoomList';
import * as firebase from 'firebase';

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyDcTm4fr5TO289I7DQPm_2S791VmgxrTUE",
    authDomain: "piercehblocchat-555ee.firebaseapp.com",
    databaseURL: "https://piercehblocchat-555ee.firebaseio.com",
    projectId: "piercehblocchat-555ee",
    storageBucket: "piercehblocchat-555ee.appspot.com",
    messagingSenderId: "1026792206858"
  };
  firebase.initializeApp(config);

class App extends Component {
  render() {
    return (
      <div className="App">
        <RoomList firebase = {firebase} />
      </div>
    );
  }
}

export default App;
