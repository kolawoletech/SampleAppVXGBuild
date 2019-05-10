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

import { VXGMobileSDK } from "react-native-vxg-mobile-sdk";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/MaterialIcons";

import { Actions } from "react-native-router-flux";
import RNFetchBlob from "rn-fetch-blob";
var RNFS = require('react-native-fs');


export class Media extends Component {
  _player = null;
  
  playerRef = undefined;
  constructor(props) {
    
    super(props);
    this.index = 0;


    this.document_dir = RNFetchBlob.fs.dirs.DocumentDir + "/NileMediaVideos/";

    this.filename_prefix = "increment_photo_";

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
      showChild: true
    };
  }

  _assignPlayer = plr => {
    this.playerRef = plr;
  };

  _onBack = () => {
    Actions.pop();

    this.playerRef.close();
  };

  onPlayURI = uri => {
    this.setState({
      hideVideo: false,
      uri: uri
    });

    

    if (this.state.hideVideo == true){
      console.log("Current Statte" + JSON.stringify(this.state))	
         console.log("First Block" + this.state.hideVideo)
        //this.playerRef.close();
        this.props.play(uri);
        this.loadWithRetry(this.playerRef, this.state.uri);
        console.log(uri);
        //this.playerRef.open();
      } else  if (this.state.hideVideo == false){
        console.log("Second Block" + this.state.hideVideo)
  
         this.playerRef.close();
        this.props.play(uri);
        this.loadWithRetry(this.playerRef, this.state.uri);
        console.log(uri);
        this.playerRef.open();
      }

  };

  componentDidMount() {
    console.log("Current Statte" + JSON.stringify(this.state));
  }
  async componentWillUnmount() {
    console.log("unmount");
    console.log("Current Statte " + JSON.stringify(this.state));
    if (this.playerRef) {
      console.log("unmount has playerRef");
      try {
        console.log("unmount call unloadAsync");
        //await this.playerRef.unloadAsync();
        console.log("unmount unload sucess");
      } catch (e) {
        console.log("unmount unload failed");
      }
    } else {
      console.log("unmount no playerRef");
    }
  }

  onDeleteURI = uri => {
    this.setState({
      hideVideo: true
    });



    RNFS.unlink(uri).then(()=>{
      

    });
    Actions.media();

    console.log("Path to Delete" + uri)


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
        key={i}
      >
        <Text style={styles.text}>{text}</Text>
      </TouchableOpacity>
    );
  };
  state = {
    is_camera_visible: false,
    is_photo_visible: false,
    has_camera_permission: null,
    //type: Camera.Constants.Type.back,
    progress_photos: []
  };

  _convertArrayToObject(input) {
    let loc = RNFetchBlob.fs.dirs.DocumentDir + "/NileMediaVideos/";

    var arr = [];
    var len = input.length;

    for (var i = 0; i < len; i++) {

  
/* 
      var stats = RNFetchBlob.fs.stat(loc + input[i])
      .then((stats) => {
        var size = stats.size;
        var lastModified = stats.lastModified;
        var type = stats.type
        //arr.push({size})
        console.log(size, type, lastModified)

      })
      .catch((err) => {
        console.log(err)
      }) */

      var key = input[i].replace(/(.*)\.[^.]+$/, "$1");

      arr.push({
        _id: key,
        name: input[i],
        isVideo: true,
        uri: loc + input[i], 
      });

      //console.log("These are styats: "+ JSON.stringify(stats))

    }
    return arr;
  }

  _convertArrayToObject2(input) {
    //let loc = `${FileSystem.documentDirectory}NileMediaVideos/`;

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
    await this.loadWithRetry(this.playerRef, this.props.uri);
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
    console.log("Retry")



  }


  updatePlayerRef = async ref => {
    console.log("player changed");
    if (this.playerRef) {
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
    this.playerRef = ref;
  };

  render() {
    const uri = this.props.uri;
    console.log("Present URI: " + uri);
    const {
      videos: data
      //uri: puri
    } = this.props;

    let videos = this.state.videos;
    return (
      <View style={{ height: "100%" }}>
        <LinearGradient
          colors={["#76B6C4", "#4E8FA2", "#0F516C"]}
          style={{ height: "100%" }}
        >
          <View>
            {this.state.hideVideo !== true && (
              <View>
                <VXGMobileSDK
                  style={{
                    height: 250,
                    width: "100%"
                  }}
                  ref={this._assignPlayer}
                  config={{
                    connectionUrl: this.state.uri,
                    autoplay: true
                  }}
                />
                <TouchableHighlight onPress={this._onBack}>
                  <View style={styles.buttonText}>
                    <Icon name="close" size={42} color="white" />
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: "bold"
                      }}
                    >
                      Close
                    </Text>
                  </View>
                </TouchableHighlight>
              </View>
            )}
          </View>
          {this.state.showChild || this.state.data !== undefined ? (
            <MediaItems
              list={videos}
              _onPressDelete={this.onDeleteURI}
              onPressItem={this.onPlayURI}
            />
          ) : (
            <Text style={styles.text}>Nothing Here</Text>
          )}
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
    //paddingTop: Constants.statusBarHeight,
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
