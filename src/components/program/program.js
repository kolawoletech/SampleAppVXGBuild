import React, { Component } from 'react';
import { Modal, View, TouchableOpacity, Text, StyleSheet, FlatList, TouchableWithoutFeedback, Image, TouchableHighlight, Alert, ScrollView } from 'react-native';
import { styles } from './styles';
import Toast, { DURATION } from 'react-native-easy-toast';

import { connect } from 'react-redux';
import { fetchChannelObject, fetchProgramURILinks, fetchProgramImage } from '../../actions/api/actions';
import { ProgramQuality } from './programQuality';
import LinearGradient from 'react-native-linear-gradient';

import { Dimensions } from 'react-native'
var { width, height } = Dimensions.get('window')

import DeviceInfo from 'react-native-device-info';
import { AsyncStorage } from "react-native";

import RNFS from 'react-native-fs'

export class Program extends React.Component {
    constructor(props) {
        super(props);
    }


    onFetchLink = (programmeID, profileID, AID, TOKENID) => {
        console.log("What are we getting: " + JSON.stringify(this.props))
        this.props.fetchLink(programmeID, profileID, AID, TOKENID );
        console.log("Working Fix")
    }


    notAvailable() {
        Alert.alert(" Selection not available, Please check back in the future"); 
    }

    downloadVideo = (name, url) => {
        console.log(url)
        this.createDirectory();

        const destPath = RNFS.DocumentDirectoryPath + '/NileMediaVideos/' + name + '.mp4';
        let option = {
            fromUrl: url,
            toFile: destPath
        };
        RNFS.downloadFile(option).promise.then(res => {
            console.log('res -----------------------------> ', res);
        });
    };

    createDirectory = () => {
        console.log(" Creating Folder");

        options = {
            NSURLIsExcludedFromBackupKey: true
        }

        RNFS.mkdir(RNFS.DocumentDirectoryPath + '/NileMediaVideos', options);

    };

    download = (link, name) => {

        //var regex = /[^\/]+$/;
        // let strippedName = regex.exec(name)
        Alert.alert("Selection Currently Unavailable");
        this.props.link = null

    };




    componentWillMount() {
        this.props.link = null;
    }




    state = {
        modalVisible: false,
    };

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    render() {
        const freeDiskStorage = Math.floor(DeviceInfo.getFreeDiskStorage() / 1000000);

        const {
            quality: qualityList,
            programme_id: programmeID
        } = this.props.programData;
        const list = this.props.programData;

        console.log("List Initial", this.props)





        const channel_details = this.chan;
        if (this.props == "undefined") {
            return (
                <View>
                    <Text>Loading!</Text>
                </View>
            );
        } else {
            const { link } = this.props;
            //let { img } = this.props;
            const list = this.props.programData;

            let img =  RNFS.CachesDirectoryPath +"/NileMediaCatalogueImages/" + list.programme_id + ".png";   // console.log(cachedImageFolder)
            return (
                <View>
                    <LinearGradient colors={['#76B6C4', '#4E8FA2', '#0F516C']}
                        style={{ height: '100%' }}>
                        <Toast ref="toast" position='bottom'/> 
                        <View>
                            <ScrollView>
                                <View 
                                    style={{
                                        width: '100%', height: 225, justifyContent: 'center',
                                        alignItems: 'center',
                                        backgroundColor: "rgba(255,255,255,0.5)" 
                                    }}>
                                    <Image
                                        source={{ uri: img }}
                                        resizeMode="stretch"
                                        style={{ display: 'flex', width: '100%', height: '100%', position: 'absolute', alignItems: 'center' }}
                                    />
                                    <View style={{ flex: 1, padding: 7 }}>
                                        <Text
                                            numberOfLines={2}
                                            style={{
                                                color: '#0F516C', fontSize: 19, fontWeight: 'bold', backgroundColor: "rgba(255,255,255,0.5)", margin: 0,
                                                padding: 0,
                                                alignContent: 'center',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                textAlign: 'center'
                                            }}>{list.name}</Text>
                                    </View>

                                </View>


                                <View style={{ flexDirection: "row", paddingTop: 10, paddingBottom: 10 }}>
                                    <View
                                        style={{
                                            color: '#fff',
                                            paddingTop: 6,

                                        }}
                                    ><Text
                                        style={{
                                            color: '#fff', padding: 7
                                        }}>Select Download Quality</Text></View>
                                    <View style={{
                                        borderBottomColor: '#fff',
                                        borderBottomWidth: 2,
                                        flex: 1.7,
                                        paddingTop: 4

                                    }}>
                                    </View>
                                </View>

                                <View style={styles.pills}>
                                    <View >
                                        <ProgramQuality qual={qualityList} pid={programmeID}
                                            onPressItem={this.onFetchLink}
                                        //onPressItem={this.createDirectory}
                                        />
                                        <TouchableOpacity
                                            onPress={() => this.downloadVideo(programmeID, this.props.link)}
                                        // onPress = { this.notAvailable()} 
                                        >
                                            {this.props.link !== null ? <Text style={styles.downloadText}> ... </Text> : null}
                                        </TouchableOpacity>
                                    </View>
                                </View>
                       
                                <View style={{ flexDirection: "row", paddingTop: 10 }}>
                                    <View
                                        style={{

                                            paddingTop: 6
                                        }}
                                    ><Text
                                        
                                        style={{
                                            color: '#fff',
                                            padding: 7
                                        }}>Description</Text></View>
                                    <View style={{
                                        borderBottomColor: '#fff',
                                        borderBottomWidth: 2,
                                        flex: 1.7,
                                        paddingTop: 4

                                    }}>
                                    </View>
                                </View>
                                <View
                                    style={{
                                        display: 'flex'
                                    }}>
                                    <Text style={{
                                        textAlign: 'center',
                                        color: '#fff',
                                        padding: 7
                                    }}>
                                        {list.description}
                                    </Text>

                                </View>
                                <View>
                                    <Text
                                        style={{
                                            color: '#fff',
                                            alignContent: 'center',
                                            textAlign: 'center',
                                            justifyContent: 'center',
                                            fontWeight: 'bold'
                                        }}>Available Space On Device: {freeDiskStorage} MB</Text>
                                </View>


                            </ScrollView>

                        </View>
                    </LinearGradient>
                </View>
            );
        }

    }
}

const mapStateToProps = ({ apiReducer: { link, img } }) => ({

    //token: token,
    link: link,
    img: img
    //channels: channels
});

const mapDispatchToProps = {
    channelObject: fetchChannelObject,
    fetchLink: fetchProgramURILinks,
    imageURI: fetchProgramImage
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Program);
