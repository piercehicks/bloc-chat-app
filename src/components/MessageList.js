import React, {Component} from 'react';

class MessageList extends Component {
  constructor(props){
    super(props);
    this.messagesRef = this.props.firebase.database().ref('messages');

    this.state = {
      messages: [],
      newMessageContent: '',
    };

  }

    handeChange(e){
      this.setState({newMessageContent: e.target.value});
    }

    handleSubmit(e){
      e.preventDefault();
      if(!this.state.newMessageContent) return
      const newMessage = {
        username: this.props.user,
        content: this.state.newMessageContent,
        sentAt: this.setTime(),
        roomID: this.props.active
      };

        this.messageRef.push(newMessage);
        this.setState({newMessageContent: ''})
    }

      setTime(){
        return this.props.firebase.database.ServerValue.TIMESTAMP
      }

    componentDidMount(){
      this.setState({
        messages: []
      });
        this.messagesRef.on('child_added', snapshot => {
          const messages = snapshot.val();
          messages.key = snapshot.key;
          this.setState({
            messages: this.state.messages.concat(messages)
          });
        });
    }

    render(){
      return(
        <div>
        <div>
          <h2>{this.props.roomName}</h2>
        </div>

        <section>
          {this.state.messages
            .filter(message => message.roomID === this.props.active)
            .map((message) =>
              <div key={message.key}>
                  <p>username: {message.username}</p>
                  <p> content: {message.content}</p>
                  <p> message sent: {message.sentAt}</p>

              </div>
          )
          }
          </section>
          <form>
          </form>
        </div>
      )
    }

}

export default MessageList;
