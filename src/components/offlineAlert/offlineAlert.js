import React, { Component } from 'react';
import { View, StyleSheet, Dimensions,Text, Button, Alert  } from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class OfflineAlert extends React.Component {

    componentDidMount() {
        this.showAlert()
    }


    showAlert(){
        
        Alert.alert(
            "No Internet Connection",
            "",
            [
                {text: 'Cancel', onPress: () => console.log('Yes Pressed'), style: 'cancel'},
                {text: 'Offline Mode', onPress: () => { Actions.media() } },
            ],
            { cancelable: false }

        );
        
    }

    render() {

        return (
            <View>

            </View>
        );

    }

}

