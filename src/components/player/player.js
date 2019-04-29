import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, FlatList, ScrollView, TextInput } from 'react-native';
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
    constructor() {
      super();
      this._url = 'rtsp://184.72.239.149/vod/mp4:BigBuckBunny_115k.mov';
      this._onBack = this._onBack.bind(this);

      this.state= { newMessage: ''}
          
      
    }
    
    _onBack = () => {
        Actions.pop();
    }
    componentDidMount() {
        console.log(this.props);


        const channel = this.props.channel;

        console.log("Props From Player" + JSON.stringify(this.props));
        this.props.loadChannelChats(channel.id)
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
            <Text>{rstp_link}</Text>
                    <VXGMobileSDK 
                        style={styles.player}
                        config={{"connectionUrl": rstp_link, "autoplay": true}}>
                    </VXGMobileSDK>
            </View>
   
        )
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
                        <Text>{rstp_link}</Text>
                    </View>
                    <ScrollView>
                        <View>
                            <View style={styles.messagesContainer}>
                                <Messages />


                            </View>

                        </View>
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
