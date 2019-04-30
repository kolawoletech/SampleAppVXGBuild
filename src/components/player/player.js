import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, FlatList, ScrollView, TextInput , Button} from 'react-native';
import { styles } from './styles';
import { Actions } from 'react-native-router-flux';
import { database } from 'firebase';
import { connect } from 'react-redux';
import { VXGMobileSDK } from 'react-native-vxg-mobile-sdk';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Messages from './../messages';

import { fetchChannelChats } from '../../actions/api/actions';


export class Player extends React.Component {
    _url = null;
    _player = null;

    constructor() {

      super();
      this._onBack = this._onBack.bind(this);
      this.state= { newMessage: ''}
    }
    
 

    componentDidMount() {
        console.log(JSON.stringify(this.props));


        const channel = this.props.channel;

        console.log("Props From Player" + JSON.stringify(this.props));
        this.props.loadChannelChats(channel.id)
    }

    _onBack = () => {
        Actions.pop();

        this._player.close();

        
    }

    sendMessage(newMessage) {
        //this.setState({ newMessage: newMessage });
        console.log("Sending: " + JSON.stringify(newMessage));

        console.log("Send To API");

        //console.log("Sending: " + this.state.newMessage);
    }

    updateMessageState(text) {
        this.setState({ newMessage: text });
    }

    inputFocused(refName) {
        this.setTimeout(
            () => {
                var scrollResponder = this.refs.scrollView.getScrollResponder();
                scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
                    React.findNodeHandle(this.refs[refName]),
                    60, //additionalOffset
                    true
                );
            },
            50
        );
    }

    renderVideo() {
        const rstp_link = this.props.link;

        return (
            <View  style={styles.player}>
                    <VXGMobileSDK 
                        style={styles.player}
                        ref={this._assignPlayer}
                        config={{
                     
                        "connectionUrl": rstp_link,
                         "autoplay": true}}>
                    </VXGMobileSDK>

                    <Button
                        onPress={this._onBack} 
                        title="Back"
                        color="#841584"
                    />
            </View>
   
        )
    }

    _assignPlayer = (plr) => {
        this._player = plr;
    }

    async _play1() {
        // TODO reopen player
        // console.log(this._player);
        await this._player.close();
        await this._player.applyConfig({
            "connectionUrl": rstp_link,
             "autoplay": true,
            "decodingType": 0, // Hardware – 1, Sofware – 0
            "connectionNetworkProtocol": -1, // 0 - udp, 1 - tcp, 2 - http, 3 - https, -1 - AUTO
            "numberOfCPUCores": 0, // 0<= - autodetect, > 0 - will set manually
            "synchroEnable": 1, // Enable A/V synchronization, 1 - synchronization is on, 0 - is off
            "connectionBufferingTime": 1000,
            "connectionDetectionTime":  1000,
            "startPreroll": 300,
            "aspectRatioMode": 1 // 0 - stretch, 1 - fit to screen with aspect ratio, 2 - crop, 3 - 100% size, 4 - zoom mode, 5 - move mode)
        });
        await this._player.open();
    }

    render() {
        console.log("Player Objects Props : " + this.props)
        const rstp_link = this.props.link;

        const channel_details = this.chan;
        const channel = this.props.channel;


        //console.log("This IS THE QUALITY NODE " + {quality})
        //const channel_details = this.chan;
        if (this.props == "undefined") {
            return (
                <View>
                    {this.renderVideo()}
                    
                </View>
            );
        } else {
            //const { list } = this.props;

            return (

                <View style={styles.container}>
                    <View style={styles.videoContainer}>
                        {this.renderVideo()}
                    </View>

                    <Button
                        onPress={this._onBack} 
                        title="Back"
                        color="#841584"
                    />
                    <ScrollView>                     
                       
                    </ScrollView>
                    <View style={styles.passwordContainer}>

                        <View style={{ width: '100%', flexDirection: 'row' }}>
                            <View  style={{
                                width: '90%'
                            }}>
                                <TextInput

                                style={styles.newInput}
                                value={this.state.newMessage}
                                onSubmitEditing={this.sendMessage}
                                placeholder="Type your message here ..."
                                value={this.state.newMessage}
                                onSubmitEditing={this.sendMessage}

                                ref="newMessage"
                                //onFocus={this.inputFocused.bind(this, "newMessage")}
                                onBlur={() => { this.refs.scrollView.scrollTo(0, 0) }}
                                onChangeText={newMessage => this.setState({ newMessage })}
                                />
                            </View>
                           
                            <View style={{
                                width: '10%'
                            }}>
                            <Icon name="send" size={22} color="white"
                                style={{
                                    top: 20
                                }}
                            />
                            </View>
                        </View>

                    </View>
                </View>

            );
        }

    }
}

const mapStateToProps = ({ routes, apiReducer: { channel, chats } }) => ({
    routes: routes,
    //token: token,
    channel: channel,
    chats: chats
});

const mapDispatchToProps = {
    //videoObject: fetchVideoObject
    loadChannelChats: fetchChannelChats 
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Player);
