import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './index.css';

import * as firebase from 'firebase';

/*
 * Add Firebase to your web app
 */
var config = {
    apiKey: "AIzaSyB5ZbAuJCF0Q0EgI3hX6nKu3FvWwaJEzNg",
    authDomain: "design-hawks-template.firebaseapp.com",
    databaseURL: "https://design-hawks-template.firebaseio.com",
    projectId: "design-hawks-template",
    storageBucket: "design-hawks-template.appspot.com",
    messagingSenderId: "100047492190"
  };
firebase.initializeApp(config);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
