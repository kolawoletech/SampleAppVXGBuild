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
//import RNFS from "react-native-fs";



import { styles } from "./styles";
import Icon from "react-native-vector-icons/MaterialIcons";

import { AsyncStorage } from "react-native";
import { setReadable } from "react-native-fs";

export default class LocalMediaItems extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      getTheMetaData: false,
      metadata: [],
      thumbnails: [],
      path: [],
      audioPath: [],
      currentItem: ""
    };
  }

  async getPodcastDetails() {
    const pathPromises = this.props.list.map(item => {
      var VIDEO_FOLDER = RNFetchBlob.fs.dirs.DocumentDir + "/NileMediaVideos/";

      
      return this._getPaths(VIDEO_FOLDER + item._id + ".m4a", item._id);
    });
    const pathResults = await Promise.all(pathPromises);


    console.log("Trouble" +  JSON.stringify(pathResults))

    this.setState({
      audioPath: pathResults
    });

  }

  async componentDidUpdate(prevProps) {

  }

  async _getMetadata(id) {

  }

  async _getImages(id) {

  }

  async _getPaths(path, id) {
    return await RNFS.stat(path)
      .then(stats => {
        let size = stats.size;
        let creationTime = stats.ctime;
        let path = stats.path
         

        console.log( id, size, creationTime, path)
      

        return { id, size, creationTime, path};
      })
      .catch(err => {
        console.log(err);
      });
  }

  renderItem = data => {
    const { onPressItem } = this.props;
    const { _onPressDelete } = this.props;
    var cachedImageLocation =
      RNFS.CachesDirectoryPath +
      "/NileMediaCatalogueImages/" +
      data.item.mediaId+
      ".png";
  

    return (
      <TouchableOpacity
        onPress={() => onPressItem(data.item.mediaId)}
        style={styles.item} >
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
                  uri:  cachedImageLocation 
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
                    
                    }}>{
                      data.item.mediaName}
                    </Text>
                  <Text 
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{
                      color: "white",
                      fontSize: 16,
                      fontWeight: "bold",
                      margin: 6,
                    
                    }}>
                  {data.item.mediaDesc}
                  </Text>
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
          
            <FlatList
              data={list}
              horizontal={false}
              renderItem={item => this.renderItem(item)}
              keyExtractor={item => item.mediaId.toString()}
            />
         
        </ScrollView>
      );
    }
  }
}
