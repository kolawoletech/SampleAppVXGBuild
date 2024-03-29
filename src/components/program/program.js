import React, { Component } from 'react';
import { Modal, View, TouchableOpacity, Text, Image, Alert, ScrollView } from 'react-native';
import { styles } from './styles';
import Toast, { DURATION } from 'react-native-easy-toast';

import { connect } from 'react-redux';
import { fetchChannelObject, fetchProgramURILinks, fetchProgramImage, fetchAudioURILinks } from '../../actions/api/actions';
import { ProgramQuality } from './programQuality';
import LinearGradient from 'react-native-linear-gradient';

import { Dimensions } from 'react-native'
var { width, height } = Dimensions.get('window')

import DeviceInfo from 'react-native-device-info';
import RNFetchBlob from "rn-fetch-blob";

import RNFS from 'react-native-fs'


import SQLite from "react-native-sqlite-storage";
SQLite.DEBUG(true);
SQLite.enablePromise(true);

export class Program extends Component {
    constructor(props) {
        super(props);

        this.initDB();

    }

    initDB = () =>{
        let db;
        return new Promise((resolve) => {
            console.log("Plugin integrity check ...");
            SQLite.echoTest()
            .then(() => {
                console.log("Integrity check passed ...");
                console.log("Opening database ...");
                SQLite.openDatabase(
                "mediaDb",
                0.1,
                "database_displayname",
                "database_size"
                ).then(DB => {
                    db = DB;
                    console.log("Database OPEN");
                    db.executeSql('SELECT 1 FROM Media LIMIT 1').then(() => {
                        console.log("Database is ready ... executing query ...");
                    }).catch((error) =>{
                        console.log("Received error: ", error);
                        console.log("Database not yet ready ... populating data");
                        db.transaction((tx) => {
                            tx.executeSql('CREATE TABLE IF NOT EXISTS Media (mediaId INT UNIQUE , mediaName, mediaDesc, mediaType, mediaUri, mediaDuration, UNIQUE (mediaId))');
                            //tx.executeSql('CREATE UNIQUE INDEX IF NOT EXISTS Media (mediaId , mediaName, mediaDesc, mediaType, mediaUri, UNIQUE (mediaId))');

                        }).then(() => {
                            console.log("Table created successfully");
                        }).catch(error => {
                            console.log(error);
                        });
                    });
                    resolve(db);
                })
                .catch(error => {
                    console.log(error);
                });
            })
            .catch(error => {
                console.log("echoTest failed - plugin not functional");
            });
        });
    };

    errorCB= (err) => {
        console.log("SQL Error: " + err);
    }

    addMedia = (programData, mediaType, mediaUri, mediaDuration) =>{
        return new Promise((resolve) => {
          this.initDB().then((db) => {
            db.transaction((tx) => {
              tx.executeSql('INSERT INTO Media VALUES (?, ?, ?, ?, ?, ?)', [programData.programme_id, programData.name, programData.description, mediaType, mediaUri, mediaDuration ]).then(([tx, results]) => {
                resolve(results);
              });
            }).then((result) => {
              this.closeDatabase(db);
            }).catch((err) => {
              console.log(err);
            });
          }).catch((err) => {
            console.log(err);
          });
        });  
    }


    closeDatabase = (db) => {
        if (db) {
            console.log("Closing DB");
            db.close()
              .then(status => {
                console.log("Database CLOSED");
              })
              .catch(error => {
                this.errorCB(error);
              });
        } else {
            console.log("Database was not OPENED");
        }
    }

 

    onFetchLink = (programmeID, profileID, AID, TOKENID) => {
        
        if (this.props.programData.quality[0].video == null) {
            this.props.fetchAudio(programmeID, profileID, AID, TOKENID );
            var VIDEO_FOLDER = RNFetchBlob.fs.dirs.DocumentDir + "/NileMediaVideos/";
            var PODCAST_LOCATION = VIDEO_FOLDER + programmeID;
            this.addMedia(this.props.programData, "podcast", PODCAST_LOCATION , this.props.programData.quality[0].duration_seconds )
        } else {
            this.props.fetchLink(programmeID, profileID, AID, TOKENID );
            var VIDEO_FOLDER = RNFetchBlob.fs.dirs.DocumentDir + "/NileMediaVideos/";
            var VIDEO_LOCATION = VIDEO_FOLDER + programmeID ;
            this.addMedia(this.props.programData, "video", VIDEO_LOCATION, this.props.programData.quality[0].duration_seconds) 
        }
        
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


    downloadAudio = (name, url) => {
        console.log(url)
        this.createDirectory();

        const destPath = RNFS.DocumentDirectoryPath + '/NileMediaVideos/' + name + '.m4a';
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
        console.log(JSON.stringify("Part 1 OnMounting" + JSON.stringify(this.props)))

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
                    <LinearGradient colors={['#212121', '#212121', '#212121']}
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
                                        resizeMode="contain"
                                        style={{ display: 'flex', width: '100%', height: '100%', position: 'absolute', alignItems: 'center', zIndex: -100 }}
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
                                        padding: 7,
                                        fontSize: 11

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
    fetchAudio: fetchAudioURILinks,
    imageURI: fetchProgramImage
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Program);
