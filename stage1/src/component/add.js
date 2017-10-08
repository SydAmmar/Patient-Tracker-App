import React, { Component } from 'react';
import { StyleSheet, Image, AsyncStorage, Dimensions } from 'react-native';
import {
    Container, Content, Form, Item, Input, Button, Text, Label, Header, Left,
    Body, Right, Icon, Title, Toast
} from "native-base";
import DatePicker from "react-native-datepicker";

var array = []

class Add extends Component {

    static navigationOptions = {
        title: "Add Patients",
        header: false
    }

    constructor() {
        super()
        this.state = {
            name: "",
            disease: "",
            medication: "",
            cost: "",
            date: "",
            showToast: false
        }
    }

    saveData() {
        if (
            this.state.name !== "" && this.state.disease !== "" && this.state.medication !== "" &&
            this.state.cost !== "" && this.state.date !== "") {

            const userData = {
                name: this.state.name,
                disease: this.state.disease,
                medication: this.state.medication,
                cost: this.state.cost,
                date: this.state.date,
            }
            array = []

            AsyncStorage.getItem("key").then((data) => {

                if (data !== null) {
                    let myData = JSON.parse(data)
                    for (a = 0; a < myData.length; a++) {
                        array.push(myData[a])
                    }
                    array.push(userData)

                    AsyncStorage.setItem("key", JSON.stringify(array))
                        .then(() => {
                            Toast.show({
                                text: 'Patient Added!',
                                position: 'bottom',
                                duration: 2000,
                                type: "success"
                            })

                            this.setState({
                                name: "",
                                disease: "",
                                medication: "",
                                cost: "",
                                date: "",
                            })
                        })
                }

                if (data === null) {
                    AsyncStorage.setItem("key", JSON.stringify(array))
                        .then(() => {
                            Toast.show({
                                text: 'Patient Added!',
                                position: 'bottom',
                                duration: 2000,
                                type: "success"
                            })

                            this.setState({
                                name: "",
                                disease: "",
                                medication: "",
                                cost: "",
                                date: "",
                            })
                        })
                }

            })
        }


        else {
            Toast.show({
                text: "Please Fill Complete Information",
                position: "bottom",
                type: "danger",
                duration: 2000,
            })
        }

    }


    render() {
        return (
            <Container>

                <Image source={require("../img/img2.jpg")} style={{
                    width: Dimensions.get('screen').width,
                    height: Dimensions.get('screen').height
                }}>

                    <Header>
                        <Left>
                            <Button transparent onPress={() => {
                                this.props.navigation.navigate("Homeroute")
                            }}>
                                <Icon name="arrow-back" />
                            </Button>
                        </Left>
                        <Body>
                            <Title>Add Patients</Title>
                        </Body>
                    </Header>



                    <Form>
                        <Item floatingLabel>
                            <Label>Name</Label>
                            <Input onChangeText={(text) => {
                                this.setState({ name: text })
                            }}
                                value={this.state.name} />
                        </Item>

                        <Item floatingLabel>
                            <Label>Disease</Label>
                            <Input onChangeText={(text) => {
                                this.setState({ disease: text })
                            }}
                                value={this.state.disease} />
                        </Item>

                        <Item floatingLabel>
                            <Label>Medicine</Label>
                            <Input onChangeText={(text) => {
                                this.setState({ medication: text })
                            }}
                                value={this.state.medication} />
                        </Item>

                        <Item floatingLabel>
                            <Label>Cost</Label>
                            <Input onChangeText={(text) => {
                                this.setState({ cost: text })
                            }}
                                value={this.state.cost} />
                        </Item>

                        <DatePicker
                            style={{ marginTop: 15 }}
                            date={this.state.date}
                            mode="date"
                            placeholder="select date"
                            format="DD-MM-YYYY"
                            minDate="01-01-2017"
                            maxDate="31-12-2020"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    marginLeft: 36
                                }
                                // ... You can check the source to find the other keys. 
                            }}
                            onDateChange={(date) => { this.setState({ date: date }) }}
                        />


                        <Button rounded info style={Styles.btn}
                            onPress={this.saveData.bind(this)} >
                            <Text>Save</Text>
                        </Button>
                    </Form>

                </Image>
            </Container>

        )
    }
}
export default Add

const Styles = StyleSheet.create({
    btn: {
        marginTop: 20,
        marginLeft: 150,
        width: 100,
        justifyContent: "center",
    },
})