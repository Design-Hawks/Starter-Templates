import React, { Component } from 'react';
import logo from '../assets/hawks.png';
import profile from '../assets/profile.png';
import './App.css';
import * as firebase from 'firebase';

import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import Avatar from 'material-ui/Avatar';

import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import ActionLockOpen from 'material-ui/svg-icons/action/lock-open';
import ActionLockOutline from 'material-ui/svg-icons/action/lock-outline';

class Locks extends Component {

  render(){

    const styles={
      subheader: {fontSize:"1.2em", textAlign:"left"},
      list : {margin:"10px", marginTop:"20px", padding:"10px", border:"1px darkgray dotted", backgroundColor:"lightgray"},
      items: {backgroundColor:"#4374E0", margin:"5px", textAlign:"left", color:"white"}

    };


    return (
      <List style={styles.list}>
        <Subheader style={styles.subheader}> Manage Access to Lock 12345</Subheader>
        <ListItem style={styles.items}
          primaryText="User A"
          leftAvatar={<Avatar src={profile} />}
          rightIcon={<ActionLockOpen color="yellow"/>}
        />
        <ListItem style={styles.items}
          primaryText="User B"
          leftAvatar={<Avatar src={profile} />}
          rightIcon={<ActionLockOpen color="yellow" />}
        />
        <ListItem style={styles.items}
          primaryText="User C"
          leftAvatar={<Avatar src={profile} />}
          rightIcon={<ActionLockOutline  color="black" />}
        />
      </List>
    );
  }
}








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
        backgroundColor:"#FF9700",
        color:"#A90082",
        border:"2px solid #A90082",
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

        {this.state.isLoggedIn ? <Locks/> : <span></span>}

      </div>
    );
  }
}

export default App;
