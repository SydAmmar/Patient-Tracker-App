import React, { Component } from 'react';
import { StyleSheet, Image, AsyncStorage, Dimensions } from 'react-native';
import {
    Container, Content, Form, Item, Input, Button, Text, Label, Header, Left,
    Body, Right, Icon, Title, List, ListItem, Toast
} from "native-base";
import DatePicker from "react-native-datepicker"

class SearchDate extends Component {

    static navigationOptions = {
        title: "Search Date",
        header: false
    }

    constructor() {
        super()
        this.state = {
            date: "",
            patientdata: []
        }
    }
    SearchDate() {
        AsyncStorage.getItem("key")
            .then((responce) => {

                var newData = []
                var foundData = []
                let data = JSON.parse(responce)

                for (i = 0; i < data.length; i++) {
                    newData.push(data[i]);
                }
                newData.map((obj) => {
                    if (obj.date === this.state.date) {
                        foundData.push(obj)
                    }
                })
                this.setState({
                    patientdata: foundData
                })

            })
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
                            <Title>Search By Date</Title>
                        </Body>
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
                        onDateChange={(date) => { this.setState({ date: date }) }}
                    />

                    <Button rounded info style={Styles.btn}
                        onPress={this.SearchDate.bind(this)} >
                        <Text>Search Date</Text>
                    </Button>

                    {this.state.patientdata.map((data, indexno) => {
                        return (
                            <List key={indexno}>

                                <ListItem style={{ backgroundColor: "transparent" }}>
                                    <Text style={Styles.name}>Name: {data.name}</Text>
                                </ListItem>

                                <ListItem style={{ backgroundColor: "transparent" }}>
                                    <Text>Disease: {data.disease}</Text>
                                </ListItem>

                                <ListItem style={{ backgroundColor: "transparent" }}>
                                    <Text>Medication: {data.medication}</Text>
                                </ListItem>

                                <ListItem style={{ backgroundColor: "transparent" }}>
                                    <Text>Cost: {data.cost}</Text>
                                </ListItem>

                                <ListItem style={{ backgroundColor: "transparent" }}>
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

const Styles = StyleSheet.create({
    btn: {
        marginTop: 20,
        marginLeft: 130,
        width: 150,
        justifyContent: "center",
    },
    name: {
        fontSize: 28,
    },
})