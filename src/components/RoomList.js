import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);

    this.roomsRef = this.props.firebase.database().ref('rooms');

    this.state = {
      rooms: [],
      newRoom: '',
      showModal: "add-room-modal display-none"
    };
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( room ) });
    });
  };

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

  showModal() {
    this.setState({ showModal: "add-room-modal display-block" });
  };

  hideModal() {
    this.setState({ showModal: "add-room-modal display-none" });
  }

  render() {
    return (
      <div className="rooms">
        <section className ="side-bar">
          <div className="side-bar-head">
            <h1> Bloc Chat </h1>
            <button className="add-room" onClick={() => this.showModal()}>New Room</button>
          </div>
          <div className ="room-list">
            <ul>
              {
                this.state.rooms.map( (room) =>
                  <li
                    className="room-item"
                    key={room.key}
                    onClick={(e) => this.props.setActive(room)}
                  >
                    {room.name}
                  </li>
                )
              }
            </ul>
          </div>
        </section>
        <section className={this.state.showModal}>
          <h2>Create New Room</h2>
          <form onSubmit={(e) => this.handleSubmit(e)}>
            <input className="form-text"
              type="text"
              value= {this.state.newRoom}
              onChange= {(e) => this.handleChange(e)}
            />
            <button className="form-button" onClick={() => this.hideModal()}>Cancel</button>
            <input className="form-button" type="submit" value="Create" />
          </form>
        </section>
      </div>
    )
  }
}

export default RoomList;
