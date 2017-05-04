import React, { Component } from 'react';
import logo from '../assets/hawks.png';
import './App.css';
import * as firebase from 'firebase';

import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import Avatar from 'material-ui/Avatar';



class App extends Component {

  constructor(props){
      super(props);
      this.state = {
          isLoggedIn: false,
          isAdmin: false,
          user: null
      }

      this.login = this.login.bind(this);
      this.logout = this.logout.bind(this);
      this.onAuthStateChanged = this.onAuthStateChanged.bind(this);

      this.auth = firebase.auth();
      this.auth.onAuthStateChanged(this.onAuthStateChanged);
  }

  login() {
    var provider = new firebase.auth.GoogleAuthProvider();
    this.auth.signInWithPopup(provider);
  }

  logout(){
    this.auth.signOut();
  }

  onAuthStateChanged(user){
    user ?
      this.setState({isLoggedIn: true, user: user, avatar: user.photoUrl}) :
      this.setState({isLoggedIn: false, user: null, avatar:null})
  }

  handleTouchTap(event){
  }

  render() {

    const styles = {
      header: { backgroundColor: "white" },
      title: { cursor: 'pointer', color: "gray"},
      login: { backgroundColor: "green", color:"white"},
      logout: {backgroundColor: "red", color:"white"},

      profile: {
        backgroundColor:"lightgray",
        border:"2px solid gray",
        height:"120px",
        margin:"10px"
      },
      status: {
        margin: "10px",
        padding: "5px",
        fontSize: "1.2em",
        textAlign:"center"
      },
      avatar: {
        backgroundSize: "contain",
        backgroundImage: this.state.user ? "url('"+this.state.user.photoURL+"')" : "url('http://placehold.it/100x100')",
        margin:"10px",
        height:"100px",
        width:"100px",
        float:"left"
      }
    };

    return (
      <div className="App">

        <AppBar
          style={styles.header}
          title={<span style={styles.title}>Design Hawks</span>}
          onTitleTouchTap={this.handleTouchTap.bind(this)}
          iconElementLeft={<img src={logo} className="App-logo" alt="logo" />}
          iconElementRight={
            this.state.isLoggedIn ?
            <FlatButton style={styles.logout} label="Logout" onClick={this.logout}/> :
            <FlatButton style={styles.login} label="Login" onClick={this.login}/>
          }
        />

        <div className="App-Body">

          <div style={styles.profile}>
            <div style={styles.avatar}>
            </div>
            <div style={styles.status}>
                {
                  this.state.isLoggedIn ?
                  <span>You are logged in as <br/> {this.state.user.displayName} </span> :
                  <span>Please login to <br/> see profile data</span>
                }
                <br/>
                {
                  this.state.isAdmin ?
                  <span> You are an Admin </span> :
                  <span></span>
                }
            </div>
          </div>


        </div>

      </div>
    );
  }
}

export default App;
