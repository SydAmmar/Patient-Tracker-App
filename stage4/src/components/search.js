import React, { Component } from 'react';
import { StyleSheet, Image, AsyncStorage, Dimensions } from 'react-native';
import {
    Container, Form, Item, Label, Input, Button, Text, List, ListItem,
    Header, Right, Left, Icon, Body, Title, Toast
} from 'native-base';
import * as firebase from "firebase";

class Search extends Component {

    componentWillMount() {
        console.disableYellowBox = true
    }

    static navigationOptions = {
        title: "Search Name",
        header: false
    }

    constructor() {
        super()
        this.state = {
            name: "",
            data: [],
        }
    }

    getDataByName() {

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
                        if (obj.name === this.state.name) {
                            foundedData.push(obj)
                        }
                        else {
                            Toast.show({
                                text: "Enter Name",
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
                            <Title>Search By Name</Title>
                        </Body>

                        <Right />
                    </Header>


                    <Form>
                        <Item floatingLabel>
                            <Label>Enter Name</Label>
                            <Input onChangeText={(text) => {
                                this.setState({ name: text })
                            }} />
                        </Item>
                    </Form>


                    <Button rounded info style={Styles.btn}
                        onPress={this.getDataByName.bind(this)} >
                        <Text>Search Patient</Text>
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
            </Container>
        )
    }
}
export default Search

let SCREENwidth = Dimensions.get('window').width - 150
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
        width: 150
    }
})