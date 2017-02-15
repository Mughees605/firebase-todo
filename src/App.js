import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import firebase from "firebase"
 var config = {
    apiKey: "AIzaSyBSZsFs-hixAi4I_qL0EqQSAXVTL3gEZA0",
    authDomain: "fir-project-b02a4.firebaseapp.com",
    databaseURL: "https://fir-project-b02a4.firebaseio.com",
    storageBucket: "fir-project-b02a4.appspot.com",
    messagingSenderId: "87011679844"
  };
 firebase.initializeApp(config);
//  firebase.database().ref().child("react").set({
//    appName:"firebase-login"
//  })
class App extends Component {
  constructor(){
    super()
    this.state = {speed:20}
  }
   componentDidMount(){
     var dataRef = firebase.database().ref().child('react');
     var speedRef = dataRef.child("speed");

     speedRef.on('value',snap => {
        this.setState({
          speed:snap.val()
        })  
     })
   }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit {this.state.speed} <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
