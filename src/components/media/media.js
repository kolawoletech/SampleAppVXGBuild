import React, { Component } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
  TouchableHighlight
} from "react-native";
import { MediaItems } from "./mediaItems";
import { connect } from "react-redux";
import {
  PlayVideo,
  Stop,
  FetchVideos,
  fetchMediaItemMetadata
} from "../../actions/media/actions";

import VideoPlayer from "react-native-video-player";
import Drawer from "react-native-drawer";

import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/MaterialIcons";

import { Actions } from "react-native-router-flux";
import RNFetchBlob from "rn-fetch-blob";
var RNFS = require("react-native-fs");
import Tabs from "../tabs";
import NetInfo from "@react-native-community/netinfo";

import SQLite from "react-native-sqlite-storage";
SQLite.DEBUG(true);
SQLite.enablePromise(true);
//import { Button } from 'react-native-elements';


export class Media extends Component {
  _player = null;

  player = undefined;
  constructor(props) {
    super(props);
    this.index = 0;

    this.document_dir = RNFetchBlob.fs.dirs.DocumentDir + "/NileMediaVideos/";
    this.state = {
      loading: false,
      data: [],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false,
      hideVideo: true,
      repeat: false,
      paused: false,
      videos: [],
      currentVideo: 0,
      showChild: true, 
      isConnected: true
    };
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
            "database_name",
            "database_version",
            "database_displayname",
            "database_size"
          )
            .then(DB => {
              db = DB;
              console.log("Database OPEN");
              db.executeSql('SELECT 1 FROM Product LIMIT 1').then(() => {
                  console.log("Database is ready ... executing query ...");
              }).catch((error) =>{
                  console.log("Received error: ", error);
                  console.log("Database not yet ready ... populating data");
                  db.transaction((tx) => {
                      tx.executeSql('CREATE TABLE IF NOT EXISTS Product (prodId, prodName, prodDesc, prodImage, prodPrice)');
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

  save_media = () => {
 
    //alert(user_name, user_contact, user_address);
    
    db.transaction(function(tx) {
    tx.executeSql(
        'INSERT INTO table_user (user_name, user_contact, user_address) VALUES (?,?,?)',
        ["user_name", "user_contact", "user_address"],
        (tx, results) => {
        console.log('Results', results.rowsAffected);
        if (results.rowsAffected > 0) {
            Alert.alert(
            'Success',
            'You are Registered Successfully',
            [
                {
                text: 'Ok',
                onPress: () =>
                    console.log("Success")
                },
            ],
            { cancelable: false }
            );
        } else {
            alert('Registration Failed');
        }
        }
    );
    });

  };

  onPlayURI = uri => {

    this.setState({
      hideVideo: false,
      uri: uri
    });

    if (this.state.hideVideo == true) {
   

      this.props.play(uri);
      this.loadWithRetry(this.player, this.state.uri);
      console.log(uri);
    } else if (this.state.hideVideo == false) {
      console.log("Second Block" + this.state.hideVideo);

      this.props.play(uri);
      this.loadWithRetry(this.player, this.state.uri);
      console.log(uri);
    }
  };

  componentDidMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
  }

  handleConnectivityChange = isConnected => {
    if (isConnected) {
      this.setState({ isConnected });
    } else {
      this.setState({ isConnected });
    }
  };

  async componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
    console.log("unmount");
    console.log("Current Statte " + JSON.stringify(this.state));
    if (this.player) {
      console.log("unmount has playerRef");
      this.props.play("");
      try {
        console.log("unmount call unloadAsync");
        this.props.play("");
        console.log("unmount unload sucess");
      } catch (e) {
        console.log("unmount unload failed");
      }
    } else {
      console.log("unmount no playerRef");
      this.props.play("");
    }
  }

  onDeleteURI = uri => {
    this.setState({
      hideVideo: true
    });

    RNFS.unlink(uri).then(() => {});
    Actions.media();

    console.log("Path to Delete" + uri);

    this.setState({
      showChild: false
    });

   
    this.componentDidMount();
    //this.componentWillUnmount()
    this.componentWillMount();

    setTimeout(() => {
      this.setState({
        showChild: true
      });
    }, 100);
  };

  renderItem = (text, i) => {
    const { onPressItem } = this.props;

    const { _onPressDelete } = this.props;

    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => onPressItem(i)}
        key={i}>
        <Text style={styles.text}>{text}</Text>
      </TouchableOpacity>
    );
  };
  state = {
    is_camera_visible: false,
    is_photo_visible: false,
    has_camera_permission: null,
    progress_photos: []
  };

  _convertArrayToObject(input) {
    let loc = RNFetchBlob.fs.dirs.DocumentDir + "/NileMediaVideos/";
    console.log(loc);
    var arr = [];
    var len = input.length;

    for (var i = 0; i < len; i++) {
      var ext = input[i].split('.').pop();
      var type = "";

      var key = input[i].replace(/(.*)\.[^.]+$/, "$1");
      if (ext === 'mp4'){
        type = true
      } else if (ext === 'm4a'){
        type  = false
      }
      arr.push({
        _id: key,
        name: input[i],
        isVideo: type,
        uri: loc + input[i],
        ext: ext
      });
    }
    return arr;
  }

  _convertArrayToObject2(input) {

    var arr = [];
    var len = input.length;
    for (var i = 0; i < len; i++) {
      arr.push({
        name: input[i],
        isVideo: true,
        uri: loc + input[i]
      });
    }
    return arr;
  }

  timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async componentWillMount() {
    console.log("Current Statte" + this.state);
    await this.loadWithRetry(this.player, this.props.uri);
    console.log("load async success");
  }
  async componentWillMount() {
    let videos = this.state.videos;
    this.props.fetch(videos);

    try {
      var VIDEO_FOLDER = RNFetchBlob.fs.dirs.DocumentDir + "/NileMediaVideos/";

      filesArray = await RNFetchBlob.fs.ls(VIDEO_FOLDER);

      this.setState({
        data: filesArray
      });
      const files = this.state.data;

      const playlistObj = this._convertArrayToObject(files);

      this.setState({
        videos: playlistObj
      });

      const videos = playlistObj;

      this.props.fetch(videos);
    } catch (e) {
      console.log(e);
    }
  }

  async loadWithRetry(player, uri) {
    console.log("Retry");
  }

  updatePlayerRef = async ref => {
    console.log("player changed");
    if (this.player) {
      console.log("has old player");
      try {
        console.log("updatePlayerRef call unloadAsync");
        // await this.playerRef.unloadAsync();
        console.log("updatePlayerRef unload old player sucess");
      } catch (e) {
        console.log("updatePlayerRef unload old player failed");
        console.log(e);
      }
    } else {
      console.log("no old player");
    }
    this.player = ref;
  };

  render() {
  
    let videos = this.state.videos;

    return (
      <View style={{ height: "100%" }}>
        <LinearGradient
          colors={["#76B6C4", "#4E8FA2", "#0F516C"]}
          style={{ height: "100%", paddingTop: 35 }}>
          
          <Drawer
            type="overlay"
            tapToClose={true}
            openDrawerOffset={0.2} // 20% gap on the right side of drawer
            panCloseMask={0.2}
            closedDrawerOffset={-3}
            tweenHandler={ratio => ({
              main: { opacity: (2 - ratio) / 2 }
            })}
            ref={ref => (this._drawer = ref)}
            content={<Tabs />}>
            
           
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                alignContent: "flex-start"
              }}>
              
              <TouchableHighlight
                onPress={() => {
                  this._drawer.open();
                  this.setState({
                    hideVideo: true
                  });
                }}>
                <View
                  style={{
                    padding: 5,
                    width: 32
                  }}>
                  <Icon name="menu" size={35} color="white" />
                </View>
              </TouchableHighlight>
              
              <View>
                <Text
                  style={{
                    fontSize: 21,
                    color: "#fff",
                    paddingLeft: 150,
                    fontWeight: "bold"
                  }}>
                  {" "}
                  Playlist
                </Text>
              </View>
            </View>

            <View>
              {this.state.hideVideo !== true && (
                <View>
                  <VideoPlayer
                    video={{ uri: this.state.uri }}
                    resizeMode="contain"
                    autoplay
                    controls
                    ref={r => (this.player = r)}
                  />
                </View>
              )}
            </View>
            {this.state.showChild || this.state.data !== undefined ? (
              <View>
                  <Button 
                    title="Learn More"
                    color="#841584"
                    onPress={ this.initDB}>
                      
                  </Button>
                
                  <MediaItems
                    list={videos}
                    _onPressDelete={this.onDeleteURI}
                    onPressItem={this.onPlayURI}
                  />
              </View>

              
            ) : (
              <Text style={styles.text}>Nothing Here</Text>
            )}
          </Drawer>
        </LinearGradient>
      </View>
    );
  }
}

const mapStateToProps = ({ mediaReducer: { videos, uri } }) => ({
  videos: videos,
  uri: uri
});

const mapDispatchToProps = {
  fetch: FetchVideos,
  play: PlayVideo,
  fetchMetadata: fetchMediaItemMetadata
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Media);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ecf0f1"
  },
  buttonsContainer: {
    flexDirection: "row"
  },
  text: {
    color: "#000",
    fontSize: 16,
    textAlign: "center"
  },
  button: {
    flex: 1
  },
  filePreview: {
    flex: 1,
    padding: 10
  },
  toastText: {
    color: "white",
    padding: 5,
    justifyContent: "flex-start"
  },
  footer: {
    flex: 0.1,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#76B6C4",
    borderColor: "red",
    padding: 2,
    margin: 5,
    fontSize: 16,
    fontWeight: "bold"
  }
});
