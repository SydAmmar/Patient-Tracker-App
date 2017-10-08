import React, { Component } from 'react';
import { StyleSheet, Image, AsyncStorage, Dimensions } from 'react-native';
import {
    Container, Content, Form, Item, Input, Button, Text, Label, Header, Left,
    Body, Right, Icon, Title, List, ListItem, Toast
} from "native-base";


class SearchName extends Component {

    static navigationOptions = {
        title: "Search By Name",
        header: false
    }

    constructor() {
        super()
        this.state = {
            name: "",
            patientdata: []
        }
    }

    getName() {
        AsyncStorage.getItem("key")
            .then((responce) => {

                var newData = []
                var foundData = []
                let data = JSON.parse(responce)

                for (i = 0; i < data.length; i++) {
                    newData.push(data[i]);
                }
                newData.map((obj) => {
                    if (obj.name === this.state.name) {
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
                            <Title>Search By Name</Title>
                        </Body>
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
                        onPress={this.getName.bind(this)} >
                        <Text>Search Patient</Text>
                    </Button>

                    {this.state.patientdata.map((data, indexno) => {

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
export default SearchName

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