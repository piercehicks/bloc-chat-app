
import React, { Component } from 'react';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
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
  constructor(props){
    super(props);

    this.roomsRef = firebase.database().ref('rooms');


    this.state = {
      active: false,
      rooms: [],
      roomName: '',
    };
  }

  setActive(e) {
    this.setState({active: e.key});
    this.roomTitle(e.key);
  }

  roomTitle(key){
    const activeRoomID = key;
    const activeRoom = this.state.rooms.filter(room => room.key === activeRoomID);
    this.setState({roomName: activeRoom[0].name});
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({rooms: this.state.rooms.concat(room)});
    });
  };
  render() {
    return (
      <div className="App">
        <RoomList
          firebase = {firebase}
          setActive = {(e) => this.setActive(e)}
          active = {this.state.active}
           />
        <MessageList
          firebase = {firebase}
          active = {this.state.active}
          roomName = {this.state.roomName}

          />
      </div>
    );
  }
}

  export default App;
