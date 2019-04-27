import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button } from 'react-native';
import { VXGMobileSDK } from 'react-native-vxg-mobile-sdk';
import {Actions, ActionConst} from 'react-native-router-flux';

export default class MoreOptionsPlayerScreen extends Component {
    _url = null;
    _player = null;
    constructor() {
        super();
        this._url1 = 'rtsp://184.72.239.149/vod/mp4:BigBuckBunny_115k.mov';
        this._onBack = this._onBack.bind(this);
        this._play1 = this._play1.bind(this);
    }

    _onBack() {
        Actions.pop();
    }

    async _play1() {
        // TODO reopen player
        // console.log(this._player);
        await this._player.close();
        await this._player.applyConfig({
            "connectionUrl": "rtsp://184.72.239.149/vod/mp4:BigBuckBunny_115k.mov",
            "decodingType": 0, // HW – 1, SW – 0
            "connectionNetworkProtocol": -1,
            "numberOfCPUCores": 1,
            "synchroEnable": 0,
            "aspectRatioMode": 1
        });
        await this._player.open();
    }

    _assignPlayer = (plr) => {
        this._player = plr;
    }

    render() {
        return (
            <View style={styles.container}>
                <Button
                    onPress={this._onBack} 
                    title="Back"
                    color="#841584"
                />
                <Text>Example 2: More Options Player</Text>
                <VXGMobileSDK 
                    ref={this._assignPlayer}
                    style={styles.player}
                    ></VXGMobileSDK>

                <Button
                    onPress={this._play1} 
                    title="Play 1"
                    color="#841584"
                />
            </View>
        );
    }
  
    
}

const styles = StyleSheet.create({
    container: {
        padding: 30,
        marginTop: 65,
        alignItems: "stretch"
    },
    player: {
        paddingTop: 20,
        borderWidth: 1,
        borderColor: 'black',
        width: '100%',
        height: 250,
    },
});