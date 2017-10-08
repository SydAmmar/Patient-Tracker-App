import React, { Component } from 'react';
import { StyleSheet, Image, BackHandler } from 'react-native';
import { Container, Footer, FooterTab, Button, Text } from 'native-base';

class Dashboard extends Component {

    static navigationOptions = {
        header: false
    }

    componentWillMount() {
        console.disableYellowBox = true

        BackHandler.addEventListener("backPress", () => {
            BackHandler.exitApp()
        })
    }

    Logout() {
        this.props.navigation.navigate("Homeroute")
    }


    render() {
        return (
            <Container>

                <Image style={Styles.img}
                    source={require("../img/img2.jpg")}>

                    <Button rounded info style={Styles.btn}
                        onPress={this.Logout.bind(this)} >
                        <Text>Logout</Text>
                    </Button>

                </Image>


                <Footer>
                    <FooterTab>

                        <Button onPress={() => {
                            this.props.navigation.navigate("AddPatientsRoute")
                        }}>
                            <Text>ADD PATIENTS</Text>
                        </Button>

                        <Button onPress={() => {
                            this.props.navigation.navigate("SearchRoute")
                        }}>
                            <Text>SEARCH BY NAME</Text>
                        </Button>

                        <Button onPress={() => {
                            this.props.navigation.navigate("SearchDateRoute")
                        }}>
                            <Text>SEARCH BY DATE</Text>
                        </Button>

                        <Button onPress={() => {
                            this.props.navigation.navigate("VeiwAllRoute")
                        }}>
                            <Text>VIEW ALL PATIENTS</Text>
                        </Button>

                    </FooterTab>
                </Footer>
            </Container>
        )
    }
}
export default Dashboard

const Styles = StyleSheet.create({
    img: {
        flex: 1,
        height: null,
        width: null,
    },
    btn: {
        marginTop: 10,
        marginLeft: 315,
        width: 90
    },
})