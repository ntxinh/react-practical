import React, { Component } from 'react'
// import Left from '../Left/Left'
// import Right from '../Right/Right'
import firebase from 'firebase'
import firebaseConfig from '../../config'

firebase.initializeApp(firebaseConfig);

class App extends Component {

  constructor(props) {
    super(props)

    this.userName = 'xinhnguyen'

    this.state = {
      userName: this.userName,
      message: '',
      list: [],
    };

    this.messageRef = firebase.database().ref().child('messages');
    this.listenMessages();
  }

  componentDidMount() {

  }

  handleChange(event) {
    this.setState({message: event.target.value});
  }

  handleKeyPress(event) {
    if (event.key !== 'Enter') return;
    this.handleSend();
  }

  handleSend() {
    if (this.state.message) {
      var newItem = {
        userName: this.state.userName,
        message: this.state.message,
      }
      this.messageRef.push(newItem);
      this.setState({ message: '' });
    }
  }

  listenMessages() {
    this.messageRef
      .limitToLast(10)
      .on('value', message => {
        this.setState({
          list: Object.values(message.val()),
        });
      });
  }

  render() {
    return (
      <div className="container app">
        <div className="row app-one">
          {/* <Left />
          <Right /> */}
          <div className="col-sm-4 side">
            <div className="side-one">
              {/* Left heading */}
              <div className="row heading">
                <div className="col-sm-3 col-xs-3 heading-avatar">
                  <div className="heading-avatar-icon">
                    <img src="/img/avatar1.png" />
                  </div>
                </div>
                <div className="col-sm-1 col-xs-1  heading-dot  pull-right">
                  <i className="fa fa-ellipsis-v fa-2x  pull-right" aria-hidden="true"></i>
                </div>
                <div className="col-sm-2 col-xs-2 heading-compose  pull-right">
                  <i className="fa fa-comments fa-2x  pull-right" aria-hidden="true"></i>
                </div>
              </div>

              {/* Search Box */}
              <div className="row searchBox">
                <div className="col-sm-12 searchBox-inner">
                  <div className="form-group has-feedback">
                    <input id="searchText" type="text" className="form-control" name="searchText" placeholder="Search" />
                    <span className="glyphicon glyphicon-search form-control-feedback"></span>
                  </div>
                </div>
              </div>

              {/* SideBar */}
              <div className="row sideBar">
                <div className="row sideBar-body">
                  <div className="col-sm-3 col-xs-3 sideBar-avatar">
                    <div className="avatar-icon">
                      <img src="/img/avatar2.png" />
                    </div>
                  </div>
                  <div className="col-sm-9 col-xs-9 sideBar-main">
                    <div className="row">
                      <div className="col-sm-8 col-xs-8 sideBar-name">
                        <span className="name-meta">John Doe</span>
                      </div>
                      <div className="col-sm-4 col-xs-4 pull-right sideBar-time">
                        <span className="time-meta pull-right">18:18</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-sm-8 conversation">
            {/* Right heading */}
            <div className="row heading">
              <div className="col-sm-2 col-md-1 col-xs-3 heading-avatar">
                <div className="heading-avatar-icon">
                  <img src="/img/avatar2.png" />
                </div>
              </div>
              <div className="col-sm-8 col-xs-7 heading-name">
                <a className="heading-name-meta">John Doe</a>
                <span className="heading-online">Online</span>
              </div>
              <div className="col-sm-1 col-xs-1  heading-dot pull-right">
                <i className="fa fa-ellipsis-v fa-2x  pull-right" aria-hidden="true"></i>
              </div>
            </div>

            {/* Button Show previous Message */}
            <div className="row message" id="conversation">
              <div className="row message-previous">
                <div className="col-sm-12 previous">
                  <a id="ankitjain28" name="20">Show Previous Message!</a>
                </div>
              </div>

              {/* Message */}
              { this.state.list.map((item, index) => {
                return item.userName != this.userName ?
                  <div className="row message-body" key={index}>
                    <div className="col-sm-12 message-main-receiver">
                      <div className="receiver">
                        <div className="message-text">{item.message}</div>
                        <span className="message-time pull-right">Sun</span>
                      </div>
                    </div>
                  </div>
                :
                  <div className="row message-body" key={index}>
                    <div className="col-sm-12 message-main-sender">
                      <div className="sender">
                        <div className="message-text">{item.message}</div>
                        <span className="message-time pull-right">Sun</span>
                      </div>
                    </div>
                  </div>  
              })}
              
            </div>

            {/* Reply */}
            <div className="row reply">
              <div className="col-sm-1 col-xs-1 reply-emojis">
                <i className="fa fa-smile-o fa-2x"></i>
              </div>
              <div className="col-sm-9 col-xs-9 reply-main">
                <input className="form-control" rows="1" id="comment"
                  value={this.state.message}
                  onChange={this.handleChange.bind(this)}
                  onKeyPress={this.handleKeyPress.bind(this)}
                />
              </div>
              <div className="col-sm-1 col-xs-1 reply-recording">
                <i className="fa fa-microphone fa-2x" aria-hidden="true"></i>
              </div>
              <div className="col-sm-1 col-xs-1 reply-send" onClick={this.handleSend.bind(this)}>
                <i className="fa fa-send fa-2x" aria-hidden="true"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App