import React, { Component } from 'react';
import { Text, Button } from 'react-native';
//import { TouchableOpacity } from 'expo';
import { Actions } from 'react-native-router-flux';
import {Channels} from '../channels/channels'
import { LinearGradient } from 'expo';

import { View, StyleSheet, Dimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';


const FirstRoute = () => (
    <View style={[styles.scene, { backgroundColor: '#ff4081' }]} />
);
const SecondRoute = () => (
    <View style={[styles.scene, { backgroundColor: '#673ab7' }]} />
);

const ThirdRoute = () => (
    <View style={[styles.scene, { backgroundColor: '#673ab7' }]} />
);

export class Menu extends React.Component {
    state = {
        index: 0,
        routes: [
            { key: 'channels', title: 'First' },
            { key: 'catalogue', title: 'Second' },
            { key: 'media', title: 'Third' }
        ],
    };
    
    render() {

        /*         return (
                    <LinearGradient colors={['#76B6C4', '#4E8FA2', '#0F516C']}
                        style={{ height: '100%' }}>
                        <View style={{ flex: 1 }}>
                       
                        </View>
        
        
                    </LinearGradient>
                ); */

        return (
            <TabView
                navigationState={this.state}
                renderScene={SceneMap({
                    first: Channels
                })}
                onIndexChange={index => this.setState({ index })}
                initialLayout={{ width: Dimensions.get('window').width }}
            />
        );

    }

}

const styles = StyleSheet.create({
    scene: {
        flex: 1,
    },
});