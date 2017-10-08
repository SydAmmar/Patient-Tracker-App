import React, { Component } from 'react';
import { StyleSheet, Image, AsyncStorage, Dimensions } from 'react-native';
import {
    Container, Form, Item, Label, Input, Button, Text,
    Header, Left, Right, Icon, Body, Title, Toast
} from 'native-base';
import * as firebase from "firebase";
import DatePicker from 'react-native-datepicker';

class AddPatients extends Component {

    componentWillMount() {
        console.disableYellowBox = true
    }

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
            showToast: false,
        }
    }

    saveData() {
        if (
            this.state.name != "" && this.state.disease != "" && this.state.medication != "" &&
            this.state.cost != "" && this.state.date != "") {
            const obj = {
                name: this.state.name,
                disease: this.state.disease,
                medication: this.state.medication,
                cost: this.state.cost,
                date: this.state.date,
            }

            AsyncStorage.getItem("user").then((responce) => {

                var PatientUid = responce

                let dataBase = firebase.database().ref('PatientTrackerApplication').child(PatientUid)
                let data = {
                    obj
                }
                dataBase.push(data)
            })

            Toast.show({
                text: 'Patient Added!',
                position: 'bottom',
                type: "success",
                duration: 2000,
            })

            this.setState({
                name: "",
                disease: "",
                medication: "",
                cost: "",
                date: "",
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

                <Image style={Styles.img} source={require("../img/img3.jpg")}>

                    <Header>
                        <Left>
                            <Button transparent onPress={() => {
                                this.props.navigation.navigate("DashboardRoute")
                            }} >
                                <Icon name='arrow-back' />
                            </Button>
                        </Left>

                        <Body>
                            <Title>Add Patients</Title>
                        </Body>

                        <Right />
                    </Header>


                    <Form>
                        <Item floatingLabel>
                            <Label>Name</Label>
                            <Input onChangeText={(text) => {
                                this.setState({ name: text })
                            }}
                                value={this.state.name} />
                        </Item>

                        <Item floatingLabel last>
                            <Label>Disease</Label>
                            <Input onChangeText={(text) => {
                                this.setState({ disease: text })
                            }}
                                value={this.state.disease} />
                        </Item>

                        <Item floatingLabel last>
                            <Label>Medicine</Label>
                            <Input onChangeText={(text) => {
                                this.setState({ medication: text })
                            }}
                                value={this.state.medication} />
                        </Item>

                        <Item floatingLabel last>
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
                    </Form>

                    <Button rounded info style={Styles.btn}
                        onPress={this.saveData.bind(this)} >
                        <Text>Save</Text>
                    </Button>

                </Image>
            </Container>
        )
    }
}
export default AddPatients

let SCREENwidth = Dimensions.get('window').width - 70
let margtoapply = SCREENwidth / 2
let SCREENheight = Dimensions.get('window').height

const Styles = StyleSheet.create({
    img: {
        flex: 1,
        height: null,
        width: null,
    },
    btn: {
        marginLeft: margtoapply,
        marginTop: 10,
        width: 70
    },
})