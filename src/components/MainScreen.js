import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, Dimensions } from 'react-native';
import {Actions, ActionConst} from 'react-native-router-flux';
import { VXGWelcome } from 'react-native-vxg-mobile-sdk';

var width = Dimensions.get('window').width; //full width

export default class MainScreen extends Component {
    constructor() {
        super();
        this._openSimplePlayerView = this._openSimplePlayerView.bind(this);
        this._moreOptionsPlayerView = this._moreOptionsPlayerView.bind(this);
    }

    _openSimplePlayerView = () => {
        Actions.simplePlayerScreen();
    }

    _moreOptionsPlayerView = () => {
        Actions.moreOptionsPlayerScreen();   
    }

    render() {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
            <VXGWelcome />
            <Button
                onPress={this._openSimplePlayerView}
                title="Example 1: Simple player"
                color="#841584"
            />
            <Text>{"\n"}</Text>
            <Button
                onPress={this._moreOptionsPlayerView}
                title="Example 2: More options player"
                color="#841584"
            />
        </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});
