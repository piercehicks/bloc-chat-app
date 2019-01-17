import React, {Component} from 'react';

class RoomList extends Component {
 constructor(props){
   super(props);


   this.roomsRef = this.props.firebase.database().ref('rooms');

  this.state = {
    rooms: [],
    newRoom: ''
  };


}

  componentDidMount() {
     this.roomsRef.on('child_added', snapshot => {
       const room = snapshot.val();
       room.key = snapshot.key;
       this.setState({ rooms: this.state.rooms.concat( room ) });
     });
   }

   createRoom(newRoom) {
     this.roomsRef.push({
       name: newRoom
     });
   };

   handleChange(e) {
     this.setState({ newRoom: e.target.value });
   }

   handleSubmit(e) {
     if (!this.state.newRoom) {return}
          this.createRoom(this.state.newRoom);
        }


  render(){
    const rooms = this.state.rooms.map(key =>
      <li>{key.name}</li>
    );
    return(
      <div>
          <h1>Pierce's Bloc Chat</h1>
        <ul>
          {rooms}
        </ul>



  <section>
     <form onSubmit={(e) => this.handleSubmit(e)}>
     <input
      type="text"
      value={this.state.newRoom}
      onChange={(e)=> this.handleChange(e)}
       />

     <button>Submit</button>
     </form>
</section>
</div>
    )
  }
}


export default RoomList;
