'use strict';
import React, { Component } from 'react';
import { Text, View, Button, StyleSheet, Image, } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Iterable } from 'react-native-iterable';
class SettingsTab extends Component {
    constructor(props) {
        super(props);
        this.onLoginTapped = () => {
            console.log("onLoginTapped");
            Iterable.setEmail("tapash@iterable.com");
            this.updateState();
        };
        this.onLogoutTapped = () => {
            console.log("onLogoutTapped");
            Iterable.setEmail(null);
            this.updateState();
        };
        this.state = {};
        this.updateState();
    }
    render() {
        var userInfo;
        if (this.state.email) {
            userInfo = this.renderLoggedIn(this.state.email);
        }
        else {
            userInfo = this.renderLoggedOut();
        }
        return (React.createElement(View, { style: styles.container },
            React.createElement(View, { style: styles.upperContainer },
                React.createElement(Image, { resizeMode: "contain", style: styles.image, source: require('../img/iterable-logo.png') }),
                userInfo)));
    }
    renderLoggedIn(email) {
        console.log(`renderLoggedIn, email: ${email}`);
        return (React.createElement(View, { style: styles.emailContainer },
            React.createElement(Text, { style: styles.emailText },
                "User: ",
                email),
            React.createElement(Button, { title: "Logout", onPress: this.onLogoutTapped })));
    }
    renderLoggedOut() {
        console.log("renderLoggedOut");
        return (React.createElement(View, { style: styles.emailContainer },
            React.createElement(TextInput, { style: styles.emailTextInput, autoCapitalize: "none", autoCompleteType: "email", placeholder: "user@example.com" }),
            React.createElement(Button, { title: "Login", onPress: this.onLoginTapped })));
    }
    updateState() {
        Iterable.getEmail().then(email => {
            console.log("gotEmail: " + email);
            if (email) {
                this.setState((prevState, props) => { return { email: email }; });
            }
            else {
                this.setState((prevState, props) => { return { email: undefined }; });
            }
        });
    }
}
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    upperContainer: {
        marginTop: 25,
        height: 300,
        backgroundColor: 'white',
    },
    image: {
        width: 275,
        height: 150,
    },
    emailContainer: {
        flexDirection: "row",
        marginTop: 25,
    },
    emailTextInput: {
        marginLeft: 10,
        padding: 10,
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        width: 250,
    },
    emailText: {
        marginLeft: 10,
        padding: 10,
        fontSize: 18,
    },
});
export default SettingsTab;
