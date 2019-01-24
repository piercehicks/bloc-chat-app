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
                    <p>{message.username}</p>
                    <p>{message.content}</p>
                    <p>{message.sentAt}</p>
                  </div>
              )
            }
          </section>
      </div>
    );
  }
}

export default MessageList;
