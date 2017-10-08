import React, { Component } from 'react';
import { StyleSheet, Image, AsyncStorage, Dimensions } from 'react-native';
import {
    Container, Form, Item, Label, Input, Button, Text, List, ListItem,
    Header, Right, Left, Icon, Body, Title, Toast
} from 'native-base';
import DatePicker from "react-native-datepicker";
import * as firebase from "firebase";

class SearchDate extends Component {

    componentWillMount() {
        console.disableYellowBox = true

    }
    static navigationOptions = {
        title: "Search Date",
        header: false
    }

    constructor() {
        super()
        this.state = {
            data: [],
            date: ""
        }
    }

    getDataByDate() {

        AsyncStorage.getItem("user")
            .then((responce) => {

                var PatientUid = responce
                var data = []
                var foundedData = []
                let dataBase = firebase.database().ref("PatientTrackerApplication").child(PatientUid)

                dataBase.on("value", (object) => {

                    let key = object.val()

                    for (var a in key) {
                        data.push(key[a].obj)
                    }

                    data.map((obj) => {
                        if (obj.date === this.state.date) {
                            foundedData.push(obj)
                        }
                        else {
                            Toast.show({
                                text: "Select Date",
                                position: "bottom",
                                type: "danger",
                                duration: 2000,
                            })
                        }
                    })

                    this.setState({
                        data: foundedData
                    })
                })
            })
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
                            <Title>Search By Date</Title>
                        </Body>

                        <Right />
                    </Header>

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
                        onDateChange={(datei) => { this.setState({ date: datei }) }}
                    />

                    <Button rounded info style={Styles.btn}
                        onPress={this.getDataByDate.bind(this)} >
                        <Text>Search Date</Text>
                    </Button>


                    {this.state.data.map((data, indexno) => {
                        return (
                            <List key={indexno}>

                                <ListItem style={{ backgroundColor: "transparent" }} >
                                    <Text style={Styles.name}>Name: {data.name}</Text>
                                </ListItem>

                                <ListItem style={{ backgroundColor: "transparent" }} >
                                    <Text>Disease: {data.disease}</Text>
                                </ListItem>

                                <ListItem style={{ backgroundColor: "transparent" }} >
                                    <Text>Medication: {data.medication}</Text>
                                </ListItem>

                                <ListItem style={{ backgroundColor: "transparent" }} >
                                    <Text>Cost: {data.cost}</Text>
                                </ListItem>

                                <ListItem style={{ backgroundColor: "transparent" }} >
                                    <Text>Date: {data.date}</Text>
                                </ListItem>

                            </List>
                        )
                    })}
                </Image>
            </Container >
        )
    }
}
export default SearchDate

let SCREENwidth = Dimensions.get('window').width - 125
let margtoapply = SCREENwidth / 2
let SCREENheight = Dimensions.get('window').height

const Styles = StyleSheet.create({
    img: {
        flex: 1,
        height: null,
        width: null,
    },
    name: {
        fontSize: 28,
    },
    btn: {
        marginLeft: margtoapply,
        marginTop: 10,
        width: 125
    }
})