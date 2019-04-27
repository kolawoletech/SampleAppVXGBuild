import React, { Component } from 'react';
import { Modal, View, TouchableOpacity, Text, StyleSheet, FlatList, TouchableWithoutFeedback, Image, TouchableHighlight, Alert } from 'react-native';
import { styles } from './styles';
import { FileSystem, Constants, Notifications, Permissions } from 'expo';
import Toast, { DURATION } from 'react-native-easy-toast';

import { connect } from 'react-redux';
import { fetchChannelObject, fetchProgramURILinks, fetchProgramImage } from '../../actions/api/actions';
import { ProgramQuality } from './programQuality';

import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-material-cards'

import { LinearGradient } from 'expo';
async function getiOSNotificationPermission() {
    const { status } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
    );
    if (status !== 'granted') {
        await Permissions.askAsync(Permissions.NOTIFICATIONS);
    }
}

export class Program extends React.Component {
    constructor(props) {
        super(props);
        this.listenForNotifications = this.listenForNotifications.bind(this);
    }

    
    onFetchLink = (programmeID, profileID) => this.props.fetchLink(programmeID, profileID);



    download = (link, name) => {

        var regex = /[^\/]+$/;
        let strippedName = regex.exec(name)
        Alert.alert("Downloading", strippedName)

        let fileUri = FileSystem.documentDirectory + 'NileMediaVideos/' + strippedName;
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
            });
        this.props.link = null

    };



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
    };

    componentWillMount() {
        getiOSNotificationPermission();
        this.props.link = null;
        this.listenForNotifications();
    }

    async componentDidMount() {

        try {

            // console.log("Logging Program on Program", this.props)
            //const { link } = this.props.link;
            
            const program = this.props.programData;

            this.props.imageURI(program.programme_id)
            await FileSystem.makeDirectoryAsync(
                `${FileSystem.documentDirectory}NileMediaVideos`,
                {
                    intermediates: true
                }
            )
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
                            style={{ backgroundColor: 'green' }}
                            textStyle={{ color: 'white' }}
                            position={'bottom'}
                            positionValue={100}
                            opacity={0.8} />


                        <Card
                            style={{ backgroundColor: '#76b6c4' }}
                            isDark={false}>

                            <CardImage
                                source={{ uri: img }}
                                style={{
                                     maxHeight: 225, minHeight: 225, backgroundColor: 'rgba(0, 0, 0, .6)', shadowRadius: 2,



                                    shadowOffset: { width: 1, height: 2 },


                                    shadowColor: '#0f515d'
                                }}
                                resizeMode="contain"
                                title={list.name}
                            />


                            <CardContent
                                text={list.description}
                                style={{
                                    maxHeight: 50, minHeight: 50
                                }}


                            />


                            <View style={styles.pills}>
                                <View>
                                    <Text style={styles.text}>Select Download Quality</Text>
                                </View>
                                <View >
                                    <ProgramQuality qual={qualityList} pid={programmeID} onPressItem={this.onFetchLink} />
                                    <TouchableOpacity onPress={() => this.download(link, this.props.link)} >
                                        {this.props.link !== null ? <Text style={styles.text}> DOWNLOAD NOW </Text> : null}
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
                        </Card>

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
