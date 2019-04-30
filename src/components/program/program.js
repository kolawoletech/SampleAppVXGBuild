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


export class Program extends React.Component {
    constructor(props) {
        super(props);
        //this.listenForNotifications = this.listenForNotifications.bind(this);
    }


    onFetchLink = (programmeID, profileID) => this.props.fetchLink(programmeID, profileID);


    notAvailable(){
        Alert.alert(" Selection not available, Please check back in the future");

    }
    download = (link, name) => {

        //var regex = /[^\/]+$/;
        // let strippedName = regex.exec(name)
        Alert.alert("Selection Currently Unavailable");

        /*            let fileUri = FileSystem.documentDirectory + 'NileMediaVideos/' + strippedName;
                   FileSystem.downloadAsync(
                       link,
                       fileUri
                   ).then(({ uri }) => {
                       
           
                       const localnotification = {
                           title: 'Download has finished',
                           body: strippedName + " has been downloaded. Check Playlist.",
                           android: {
                               sound: true,
                           },
                           ios: {
                               sound: true,
                           },
           
                           data: {
                               fileUri: uri
                           },
                       };
                       localnotification.data.title = localnotification.title;
                       localnotification.data.body = localnotification.body;
                       let sendAfterFiveSeconds = Date.now();
                       sendAfterFiveSeconds += 3000;
           
                       const schedulingOptions = { time: sendAfterFiveSeconds };
                       Notifications.scheduleLocalNotificationAsync(
                           localnotification,
                           schedulingOptions
                       );
           
                       this.props.link = null
                   })
                       .catch(error => {
                           console.error(error);
                           Alert.alert(error);
                       }); */
        this.props.link = null

    };


    /* 
        listenForNotifications = () => {
            const _this = this;
    
            Notifications.addListener(notification => {
                if (notification.origin === 'received') {
                    // We could also make our own design for the toast
                    // _this.refs.toast.show(<View><Text>hello world!</Text></View>);
    
                    const toastDOM =
                        <TouchableWithoutFeedback
                            onPress={() => { this.openFile(notification.data.fileUri) }}
                            style={{ padding: '10', backgroundColor: 'green' }}>
                            <Text style={styles.item}>{notification.data.body}</Text>
                        </TouchableWithoutFeedback>;
    
                    _this.toast.show(toastDOM, DURATION.FOREVER);
                }
            });
        }; */

    componentWillMount() {
        //  getiOSNotificationPermission();
        this.props.link = null;
        // this.listenForNotifications();
    }

    async componentDidMount() {

        try {

            // console.log("Logging Program on Program", this.props)
            //const { link } = this.props.link;

            const program = this.props.programData;

            this.props.imageURI(program.programme_id)

        } catch (e) {
            console.log(e)
        }

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

        // console.log( "List Initial", this.props.link)





        const channel_details = this.chan;
        if (this.props == "undefined") {
            return (
                <View>
                    <Text>Loading!</Text>
                </View>
            );
        } else {
            const { link } = this.props;
            let { img } = this.props;
            console.log("THis is Program Name Payloiad" + JSON.stringify(this.props))
            return (


                <View>
                    <LinearGradient colors={['#76B6C4', '#4E8FA2', '#0F516C']}
                        style={{ height: '100%' }}>
                        <Toast
                            ref={(ref) => this.toast = ref}
                            style={{ backgroundColor: 'green', top: 10, position: 'absolute' }}
                            textStyle={{ color: 'white' }}
                            opacity={0.8}
                        />
                        <View>


                            <ScrollView>

                                <View style={{
                                    width: '100%', height: 225, justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: "rgba(255,255,255,0.5)",

                                }}>
                                    <Image
                                        source={{ uri: img }}
                                        resizeMode="stretch"
                                        style={{ display: 'flex', width: '100%', height: '100%', position: 'absolute', alignItems: 'center'}}



                                    />

                                    <View style={{ flex: 1, padding: 7 }}>
                                        <Text style={{
                                            color: '#0F516C', fontSize: 19, fontWeight: 'bold', left: 10, backgroundColor: "rgba(255,255,255,0.5)", margin: 0, justifyContent: 'center', alignContent: 'center', alignItems: 'center',
                                            width: '100%',
                                            padding: 0,
                                            justifyContent: 'center'
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
                                            //onPressItem={this.onFetchLink} 
                                            onPressItem={this.notAvailable}
                                        />
                                        <TouchableOpacity 
                                            //onPress={() => this.download(link, this.props.link)}
                                           // onPress = { this.notAvailable()} 
                                        >
                                            {this.props.link !== null ? <Text style={styles.downloadText}> Downloads Not Available, Please Check Back In The Future. </Text> : null}
                                        </TouchableOpacity> 
                                    </View>
                                </View>
                                {/*                             <CardAction
                                separator={true}
                                inColumn={false}
                                style={{
                                    display: 'inline', maxHeight: 50, minHeight: 50, position: 'absolute', bottom: 1, width: '100%', textAlign: 'center'
                                }}>
                                <CardButton
                                    onPress={() => { }}
                                    title="Guide"
                                    color="blue"
                                />
                            </CardAction> */}
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
