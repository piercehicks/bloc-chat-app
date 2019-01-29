import React, {Component} from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.messageRef = this.props.firebase.database().ref('messages');

    this.state = {
      messages: [],
      newMessageContent: '',
    };
  }

  handleChange(e){
    e.preventDefault();
    this.setState({newMessageContent: e.target.value});
  }

  handleSubmit(e){
    e.preventDefault();
    if(!this.state.newMessageContent) {return}
    const newMessage = {
      username: this.props.user,
      content: this.state.newMessageContent,
      roomID: this.props.active
    };
    this.messageRef.push(newMessage);
    this.setState({newMessageContent:''})
  }

  setTime(){
    return this.props.firebase.database.ServerValue.TIMESTAMP
  }

  componentDidMount(){
    this.setState({
      messages: []
    });
    this.messageRef.on('child_added', snapshot => {
      const messages = snapshot.val();
      messages.key = snapshot.key;
      console.log(messages);
      this.setState({
        messages: this.state.messages.concat(messages)
      });
    });
  }
  render(){
    return (
      <div>
        <div>
          <h1>{this.props.roomName}</h1>
        </div>
          <section>
            {
              this.state.messages
                .filter(message => message.roomID === this.props.active)
                .map((message) =>
                  <div  key={message.key}>
                    <p>username: {message.username}</p>
                    <p>content: {message.content}</p>
                    <p>Time: {message.sentAt}</p>
                  </div>
              )
            }
          </section>
          <section>
            <form onSubmit={(e) => this.handleSubmit(e)}>
            <input
              type="text"
              value={this.state.newMessageContent}
              onChange={(e)=> this.handleChange(e)}
              />
              <input type="submit" value="New Message Here" />
            </form>

          </section>
      </div>
    );
  }
}

export default MessageList;
