import React, { Component } from 'react';
import { StyleSheet, Image, AsyncStorage } from 'react-native';
import {
    Container, Content, List, ListItem, Text,
    Header, Right, Left, Icon, Button, Body, Title,
    Spinner
} from 'native-base';
import * as firebase from "firebase";

class Viewpatients extends Component {

    componentWillMount() {
        console.disableYellowBox = true
        this.getPatients()
        this.setState({ loading: true })
    }

    static navigationOptions = {
        title: "View All Patients",
        header: false
    }

    constructor() {
        super()
        this.state = {
            Patient: [],
            loading: false
        }
    }

    getPatients() {

        AsyncStorage.getItem("user")
            .then((responce) => {

                var PatientUid = responce
                var data = []
                let dataBase = firebase.database().ref("PatientTrackerApplication").child(PatientUid)
                dataBase.on("value", (object) => {

                    let key = object.val()

                    for (var a in key) {
                        data.push(key[a].obj)
                        console.log(key[a])
                    }
                    this.setState({
                        Patient: data,
                        loading: false
                    })

                })
            })
    }

    handleError() {
        if (this.state.loading) {
            return <Spinner />
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
                            }}>
                                <Icon name='arrow-back' />
                            </Button>
                        </Left>

                        <Body>
                            <Title>View All Patient</Title>
                        </Body>
                        <Right />
                    </Header>


                    {this.handleError()}

                    <Content>

                        {this.state.Patient.map((data, indexno) => {
                            return (

                                <List key={indexno}>

                                    <ListItem style={{ backgroundColor: "transparent" }} >
                                        <Text style={Styles.name}>Name: {data.name}</Text>
                                    </ListItem>

                                    <ListItem style={{ backgroundColor: "transparent" }} >
                                        <Text>Disease: {data.disease}</Text>
                                    </ListItem>

                                    <ListItem style={{ backgroundColor: "transparent" }} >
                                        <Text>Mediacation: {data.medication}</Text>
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

                    </Content>
                </Image>
            </Container >
        )
    }
}
export default Viewpatients

const Styles = StyleSheet.create({
    img: {
        flex: 1,
        height: null,
        width: null,
    },
    name: {
        fontSize: 28,
    }
})