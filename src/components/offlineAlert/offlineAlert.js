import React, { Component } from 'react';
import { View, StyleSheet, Dimensions,Text, Button, Alert  } from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class OfflineAlert extends React.Component {


    constructor(){
        super()
        this.showAlert()
    }

    showAlert(){
        
        Alert.alert(
            "No Internet Connection",
            "",
            [
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'Offline Mode', onPress: () => { Actions.localMedia() } },
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

