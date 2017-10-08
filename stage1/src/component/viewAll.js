import React, { Component } from 'react';
import { StyleSheet, Image, AsyncStorage, Dimensions } from 'react-native';
import {
    Container, Content, Form, Item, Input, Button, Text, Label, Header, Left,
    Body, Right, Icon, Title, List, ListItem,
} from "native-base";

class ViewAll extends Component {

    static navigationOptions = {
        title: "View All",
        header: false
    }

    constructor() {
        super()
        this.state = {
            patientdata: [],
        }
    }

    componentWillMount() {
        console.disableYellowBox = true
        this.viewAll()
    }

    viewAll() {
        AsyncStorage.getItem("key")
            .then((data) => {

                let newdata = []

                let mydata = JSON.parse(data)

                for (i = 0; i < mydata.length; i++) {
                    newdata.push(mydata[i]);
                }
                this.setState({
                    patientdata: newdata
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
                            <Title>ViewAll Patients</Title>
                        </Body>
                    </Header>

                    <Content>

                        {this.state.patientdata.map((data) => {

                            return (
                                <List>

                                    <ListItem style={{ backgroundColor: "transparent" }} >
                                        <Text style={Styles.name}>Name: {data.name} </Text>
                                    </ListItem>

                                    <ListItem style={{ backgroundColor: "transparent" }} >
                                        <Text>Disease: {data.disease} </Text>
                                    </ListItem>

                                    <ListItem style={{ backgroundColor: "transparent" }} >
                                        <Text>Mediacation: {data.medication} </Text>
                                    </ListItem>

                                    <ListItem style={{ backgroundColor: "transparent" }} >
                                        <Text>Cost: {data.cost} </Text>
                                    </ListItem>

                                    <ListItem style={{ backgroundColor: "transparent" }} >
                                        <Text>Date: {data.date} </Text>
                                    </ListItem>
                                </List>
                            )
                        })}
                    </Content>
                </Image>
            </Container>
        )
    }
}
export default ViewAll

const Styles = StyleSheet.create({
    name: {
        fontSize: 28,
    },
})