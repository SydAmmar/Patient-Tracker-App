import React, { Component } from 'react';
import { StyleSheet, Image, AsyncStorage, } from 'react-native';
import { Container, Form, Item, Input, Label, Button, Text, Toast } from 'native-base';
import * as firebase from "firebase"

class Signup extends Component {

    componentWillMount() {
        console.disableYellowBox = true
    }

    static navigationOptions = {
        title: "Signup",
        header: false
    }

    constructor() {
        super()
        this.state = {
            name: "",
            email: "",
            password: "",
        }
    }

    createUser() {
        var name = this.state.name
        var email = this.state.email
        var pass = this.state.password

        firebase.auth().createUserWithEmailAndPassword(email, pass)
            .then((responce) => {

                const uid = responce.uid

                AsyncStorage.setItem("user", uid)
                    .then(() => {
                        this.props.navigation.navigate('DashboardRoute')
                    })
            })
            .catch(function () {
                Toast.show({
                    text: "Provide All Details",
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
                            <Label>Enter Name</Label>
                            <Input onChangeText={(text) => {
                                this.setState({ name: text })
                            }} />
                        </Item>

                        <Item floatingLabel>
                            <Label>Enter Email</Label>
                            <Input onChangeText={(text) => {
                                this.setState({ email: text })
                            }} />
                        </Item>

                        <Item floatingLabel>
                            <Label>Enter Password</Label>
                            <Input onChangeText={(text) => {
                                this.setState({ password: text })
                            }} />
                        </Item>
                    </Form>

                    <Button full info style={Styles.btn}
                        onPress={this.createUser.bind(this)} >
                        <Text>Signup</Text>
                    </Button>
                </Image>
            </Container>
        )
    }
}
export default Signup

const Styles = StyleSheet.create({
    image: {
        flex: 1,
        height: null,
        width: null,
    },
    btn: {
        marginTop: 20,
    },
})