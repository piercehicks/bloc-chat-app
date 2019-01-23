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
       name: newRoom,

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

          return(
            <div>
                <h1>Pierce's Bloc Chat</h1>

              <section>
              <ul>
              {
                      this.state.rooms.map( (room) =>
                        <li
                          key={room.key}
                          onClick={(e) => this.props.setActive(room)}
                        >
                          {room.name}
                        </li>
                      )
                    }
                  </ul>

              </section>
        <section>
           <form onSubmit={(e) => this.handleSubmit(e)}>
           <input
            type="text"
            value={this.state.newRoom}
            onChange={(e)=> this.handleChange(e)}
             />
           <button>Click here to add chat room</button>
           </form>
      </section>
      </div>
          )
        }
      }
      export default RoomList;
