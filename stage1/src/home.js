import React, { Component } from 'react';
import { StyleSheet, Image, AsyncStorage, Dimensions, StatusBar } from 'react-native';
import { Container, Header, Button, Text, Body, Title, Left } from "native-base";

class Home extends Component {

    static navigationOptions = {
        title: "Doctor App",
        header: false
    }

    render() {
        return (

            <Container >

                <Header>
                    <StatusBar hidden />
                    <Left />
                    <Body>
                        <Title>Doctor App</Title>
                    </Body>
                </Header>


                <Image source={require("./img/img1.jpg")} style={{
                    width: Dimensions.get('screen').width,
                    height: Dimensions.get('screen').height
                }} >

                    <Container style={{ justifyContent: "space-around", marginBottom: 100 }}>

                        <Button primary block rounded onPress={() => {
                            this.props.navigation.navigate("Addroute")
                        }}>
                            <Text>Add Patients</Text>
                        </Button>

                        <Button primary block rounded onPress={() => {
                            this.props.navigation.navigate("SearchNameroute")
                        }}>
                            <Text>Search By Name</Text>
                        </Button>

                        <Button primary block rounded onPress={() => {
                            this.props.navigation.navigate("SearchDateroute")
                        }}>
                            <Text>Search By Date</Text>
                        </Button>

                        <Button primary block rounded onPress={() => {
                            this.props.navigation.navigate("ViewAllroute")
                        }}>
                            <Text>View All Patients</Text>
                        </Button>

                    </Container>

                </Image>

            </Container>
        )
    }
}
export default Home