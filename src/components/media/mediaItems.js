import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Alert,
  StyleSheet,
  FlatList,
  Button,
  ScrollView,
  Dimensions,
  Image
} from "react-native";


const { width, height } = Dimensions.get("window");
import moment from "moment";
import "moment-timezone";
import LinearGradient from "react-native-linear-gradient";
import RNFetchBlob from "rn-fetch-blob";
var RNFS = require("react-native-fs");

import { styles } from "./styles";
import Icon from "react-native-vector-icons/MaterialIcons";

import { AsyncStorage } from "react-native";
import { setReadable } from "react-native-fs";

export class MediaItems extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      getTheMetaData: false,
      metadata: [],
      thumbnails: [],
      path: [],
      currentItem: ""
    };
  }

  async componentWillMount() {
   

  }


  getFileExtension(filename)  {
    console.log("Runing")
    var regex = /[^\/]+$/;

    let strippedName = regex.exec(filename)

    return strippedName;
  }

  async getDetails() {
    const pathPromises = this.props.list.map(item => {
      var VIDEO_FOLDER = RNFetchBlob.fs.dirs.DocumentDir + "/NileMediaVideos/";

      
      return this._getPaths(VIDEO_FOLDER + item._id + ".mp4", item._id);
    });
    const pathResults = await Promise.all(pathPromises);

    this.setState({
      path: pathResults
    });

  }

  async getPodcastDetails() {
    const pathPromises = this.props.list.map(item => {
      var VIDEO_FOLDER = RNFetchBlob.fs.dirs.DocumentDir + "/NileMediaVideos/";

      
      return this._getPaths(VIDEO_FOLDER + item._id + ".m4a", item._id);
    });
    const pathResults = await Promise.all(pathPromises);

    this.setState({
      path: pathResults
    });

  }

  async componentDidUpdate(prevProps) {
    if (this.props.list != prevProps.list) {
      const promises = this.props.list.map(item => {
        return this._getMetadata(item._id);
      });

      const thumbmailPromises = this.props.list.map(item => {
        this.setState({
          currentItem: item.ext
        })
        return this._getImages(item._id);
      });
      if (this.state.currentItem === 'mp4'){
        await this.getDetails();
      } else   if (this.state.currentItem === 'm4a'){
        await this.getPodcastDetails();
      } else {
       // await this.getErrorDetails();
      }
      //await this.getDetails();

      const results = await Promise.all(promises);
      const thumbnailResults = await Promise.all(thumbmailPromises);

      this.setState({
        metadata: results,
        thumbnails: thumbnailResults
      });
    }
  }

  async _getMetadata(id) {
    let AID = await AsyncStorage.getItem("aid");

    const options = {
      method: "POST",
      body: "aid=" + AID,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };

    const url = "https://nile.rtst.co.za/api/artist/6/tokens";
    const token = await fetch(url, options)
      .then(token_data => token_data.json())
      .then(token_data => {
        return token_data["data"];
      });

    const programs_options = {
      method: "GET",
      headers: new Headers({
        Authorization: "Bearer " + token,
        "Content-Type": "application/x-www-form-urlencoded"
      })
    };

    const programs_url =
      "https://nile.rtst.co.za/api/artist/6/programs/" + id + "/";

    return await fetch(programs_url, programs_options)
      .then(details => details.json())
      .then(details => {
        let metdat = details["data"];

        return { id, metdat };
      }).catch((err) =>{

        console.log("Errror Getting: " + err)
        let metdat = {
          name: "Not Found",
          description: "Not Found",
          
        };
        return { id, metdat };
      });
  }

  async _getImages(id) {
    let AID = await AsyncStorage.getItem("aid");

    const options = {
      method: "POST",
      body: "aid=" + AID,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };

    const url = "https://nile.rtst.co.za/api/artist/6/tokens";
    const token = await fetch(url, options)
      .then(token_data => token_data.json())
      .then(token_data => {
        return token_data["data"];
      });

    const programs_options = {
      method: "GET",
      headers: new Headers({
        Authorization: "Bearer " + token,
        "Content-Type": "application/x-www-form-urlencoded"
      })
    };

    const program_url =
      "https://nile.rtst.co.za/api/artist/6/programs/" + id + "/" + "icon/";

    return await fetch(program_url, programs_options)
      .then(icon => icon.json())
      .then(icon => {
        let img = icon["data"];

        return { id, img };
      }).catch((err) =>{
        var id="Unknown";
        var img = "data:image/jpeg;base64,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"

        return  { id, img };
      });
  }

  async _getPaths(path, id) {
    return await RNFS.stat(path)
      .then(stats => {
        let size = stats.size;
        let creationTime = stats.ctime;
        let path = stats.path;
        let name = stats.name

      

        return { id, size, creationTime, path, name };
      })
      .catch(err => {
        console.log(err);
      });
  }

  renderItem = data => {
    const { onPressItem } = this.props;
    const { _onPressDelete } = this.props;
   
  

    return (
      <TouchableOpacity
        onPress={() => onPressItem(data.item.uri)}
        style={styles.item}
        >
        <LinearGradient
          colors={["#0F516C", "#76B6C4"]}
          style={{
            padding: 7,
            alignItems: "center",
            borderRadius: 3,
            margin: 3
          }}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}>
          <View
            style={{
              width: "100%",
              height: 135,
              flexDirection: "row"
            }}>
            <View
              style={{
                width: "45%"
              }}>
              <Image
                resizeMode="contain"
                style={{ width: "100%", height: 135, position: "absolute" }}
                source={{
                  uri: this.state.thumbnails.find(a => data.item._id === a.id)
                    ? this.state.thumbnails.find(a => data.item._id === a.id)
                        .img
                    : "https://via.placeholder.com/150"
                }}
              />
            </View>
            <View
              style={{
                width: "55%",
                flex: 1,
                backgroundColor: "rgba(0, 0, 0, 0)"
              }}>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{
                  color: "white",
                  fontSize: 16,
                  fontWeight: "bold",
                  margin: 6,
                 
                }}>
                {this.state.metadata.find(a => data.item._id === a.id)
                  ? this.state.metadata.find(a => data.item._id === a.id).metdat
                      .name
                  : "Network Failure"} 
              </Text>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{ color: "white", margin: 6, fontSize: 12 , height: 14}}
              >
                {this.state.metadata.find(a => data.item._id === a.id)
                  ? this.state.metadata.find(a => data.item._id === a.id).metdat
                      .description
                  : ""}
              </Text>

              {/*             <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{ color: "white", margin: 6, fontSize: 13 }}>
              {this.state.path.find(a => data.item._id === a.id)
                ?  getVideoDurationInSeconds(this.state.path.find(a => data.item._id === a.id).path)
                : "Network"}
            </Text> */}

              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{ color: "white",  margin: 6,fontSize: 12, height: 14 }}>
                {this.state.path.find(a => data.item._id === a.id)
                  ? moment(
                      this.state.path.find(a => data.item._id === a.id)
                        .creationTime
                    ).format("YYYY-MM-DD h:mm:ss")
                  : "Network"}
              </Text>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{ color: "white",  margin: 6, fontSize: 12, height: 14 , padding:0}}>
                  {data.item.ext === 'mp4'
                  ? (
                    "Video"
                      
                    ) + " | "
                  : "Podcast"+ " | "}
                {this.state.path.find(a => data.item._id === a.id)
                  ? Math.floor(
                      this.state.path.find(a => data.item._id === a.id).size /
                        1000000
                    ) + "MB"
                  : "Network"}
              </Text>
              <View
                style={{
                  justifyContent: "center",
                  flexDirection: "row",
                  alignContent: "center",
                  alignItems: "center"
                }}
              >
                <Icon
                  onPress={() => _onPressDelete(data.item.uri)}
                  name="delete"
                  size={22}
                  color="#DCDCDC"
                />
              </View>
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 0.5,
          width: "100%",
          backgroundColor: "rgba(0,0,0,0.5)"
        }}
      />
    );
  };
  render() {
    const { list } = this.props;
    if (this.props.list === null || this.props.list === 'undefined' ){
      return(
        <Text>Empty Playlist</Text>
      )
    } else {
      return (
        <ScrollView>
          {(this.state.metadata.length && this.state.thumbnails.length) > 0 && (
            <FlatList
              data={list}
              horizontal={false}
              renderItem={item => this.renderItem(item)}
              keyExtractor={item => item._id.toString()}
            />
          )}
        </ScrollView>
      );
    }

  
  }
}
