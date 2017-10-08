import React, { Component } from 'react';
import { StyleSheet, Image, AsyncStorage } from 'react-native';
import { Container, Header, Body, Left, Title, Form, Item, Input, Label, Button, Text, Toast } from 'native-base';
import * as firebase from "firebase";

class Login extends Component {

    componentWillMount() {
        console.disableYellowBox = true
    }

    static navigationOptions = {
        title: "Login",
        header: false,
    }

    constructor() {
        super()
        this.state = {
            email: "",
            password: "",
        }
    }

    Login() {
        var email = this.state.email
        var pass = this.state.password

        firebase.auth().signInWithEmailAndPassword(email, pass)
            .then((responce) => {

                const uid = responce.uid

                AsyncStorage.setItem("user", uid)
                    .then(() => {
                        this.props.navigation.navigate('DashboardRoute')
                    })
            })
            .catch(function () {
                Toast.show({
                    text: "Invalid Email Password",
                    position: "bottom",
                    type: "warning",
                    duration: 2000,
                })
            });
    }


    render() {
        return (
            <Container>

                <Image style={Styles.image} source={require("../img/img1.jpg")} >

                    <Form>
                        <Item floatingLabel>
                            <Label>Email</Label>
                            <Input onChangeText={(text) => {
                                this.setState({ email: text })
                            }} />
                        </Item>

                        <Item floatingLabel>
                            <Label>Password</Label>
                            <Input secureTextEntry onChangeText={(text) => {
                                this.setState({ password: text })
                            }} />
                        </Item>
                    </Form>

                    <Button full info style={Styles.btn}
                        onPress={this.Login.bind(this)} >
                        <Text>Login</Text>
                    </Button>
                </Image>
            </Container>
        )
    }
}
export default Login

const Styles = StyleSheet.create({
    image: {
        flex: 1,
        height: null,
        width: null,
    },
    btn: {
        marginTop: 20,
    },
});