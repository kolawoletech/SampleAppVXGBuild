import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, FlatList } from 'react-native';
import { styles } from './styles';
import { Actions } from 'react-native-router-flux';
import { database } from 'firebase';
import { connect } from 'react-redux';
import { VXGMobileSDK } from 'react-native-vxg-mobile-sdk';

//import { Video } from 'expo';
//import VideoPlayer from '@expo/videoplayer';



export class Player extends React.Component {
    _url = null;
    constructor() {
      super();
      this._url = 'rtsp://c90bf2be-459b-46bd-9ac5-0693f07d54ac:@nile.rtst.co.za:554/NileFlow_PE_Medium_384x224_25_AAC.mm1';
      this._onBack = this._onBack.bind(this);
    }
    
    _onBack = () => {
        Actions.pop();
    }
    componentDidMount() {

    }

    componentDidMount() {
        //this.props.channel;
        //console.log("THIS FOOL "+this.props.channel)
        //this.callApi()

        //const channel = this.props;

        //console.log(channel.id)
        //this.props.channelObject(channel.id);
    }

    renderVideo() {
        return (
            <View  style={styles.player}>
                <VXGMobileSDK 
                    style={styles.player}
                    config={{"connectionUrl": this._url, "autoplay": true}}></VXGMobileSDK>
            </View>
   
        )
    }

    render() {



        //console.log("This IS THE QUALITY NODE " + {quality})
        const channel_details = this.chan;
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

                    {this.renderVideo()}

                </View>
            );
        }

    }
}

const mapStateToProps = ({ routes, apiReducer: { channel } }) => ({
    routes: routes,
    //token: token,
    channel: channel
});

const mapDispatchToProps = {
    //videoObject: fetchVideoObject
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Player);
