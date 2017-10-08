import React, { Component } from 'react';
import * as firebase from "firebase";
import { Root } from 'native-base';
import Router from "../src/navigation/Router";

// Initialize Firebase
var config = {
    apiKey: "AIzaSyC0TpZzEezQJ9opYX6TSGy26tgmScoB-lQ",
    authDomain: "todo-react-version.firebaseapp.com",
    databaseURL: "https://todo-react-version.firebaseio.com",
    projectId: "todo-react-version",
    storageBucket: "todo-react-version.appspot.com",
    messagingSenderId: "440396729071"
};
firebase.initializeApp(config);

class App extends Component {
    render() {
        return (
            <Root>
                <Router />
            </Root>
        )
    }
}
export default App