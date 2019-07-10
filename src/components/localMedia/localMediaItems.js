import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Text,

  FlatList,

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



export default class LocalMediaItems extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      getTheMetaData: false,
      metadata: [],
      thumbnails: [],
      path: [],
      audioPath: [],
      currentItem: "",
      statData: []
    };
  }

    Capitalize(str){
      return str.charAt(0).toUpperCase() + str.slice(1);
    }

    sec2time(timeInSeconds) {
      var pad = function(num, size) { return ('000' + num).slice(size * -1); },
      time = parseFloat(timeInSeconds).toFixed(3),
      hours = Math.floor(time / 60 / 60),
      minutes = Math.floor(time / 60) % 60,
      seconds = Math.floor(time - minutes * 60);
  
      return pad(hours, 2) + ':' + pad(minutes, 2) + ':' + pad(seconds, 2);
  }
    
    async componentDidUpdate(prevProps) {
      if (this.props.list.length !== prevProps.list.length) {

        let promises =  this.props.list.map(item => {
          console.log("igig: " + item.mediaId)
          return  this._getVideoStats(item.mediaId);
        });

   
        const results = await Promise.all(promises);


        this.setState({
          statData: results
        })
    
        
      }
  }


  async _getVideoStats(mediaId) {
    var VIDEO_FOLDER = RNFetchBlob.fs.dirs.DocumentDir + "/NileMediaVideos/";
    var VIDEO_LOCATION = VIDEO_FOLDER + mediaId + '.mp4';

    return await RNFS.stat(VIDEO_LOCATION)
      .then(stats => {
        let size = stats.size;
        let creationTime = stats.ctime;
        let path = stats.path;

        return { mediaId, size, creationTime, path };
      })
      .catch(err => {
        console.log(err);
      });
  }


  async _getMediaItemDetails(path, mediaId) {
    return await RNFS.stat(path)
      .then(stats => {
        let size = stats.size;
        let creationTime = stats.ctime;
        let path = stats.path;

        console.log(mediaId, size, creationTime, path);

        return { mediaId, size, creationTime, path };
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
      data.item.mediaId +
      ".png";

    return (
      <TouchableOpacity
        onPress={() => onPressItem(data.item.mediaUri +'.mp4')}
        style={styles.item}>
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
                width: "30%",
                alignContent: 'flex-start',
                alignSelf: 'flex-start',
                alignItems: 'flex-start',flexDirection: 'row', justifyContent: 'flex-start'
              }}>
              <Image
                resizeMode="contain"
                style={{ width: "100%", height: 135 }}
                source={{
                  uri: cachedImageLocation
                }}
              />
            </View>
            <View
              style={{
                width: "70%",
                flex: 1,
                backgroundColor: "rgba(0, 0, 0, 0)"
              }}>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{
                  color: "white",
                  fontSize: 13,
                  fontWeight: "bold",
                  margin: 3

                }}>{data.item.mediaName}
              </Text>

              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{
                  color: "white",
                  fontSize: 11,
                 
                  margin: 3
                }}>{data.item.mediaDesc}
              </Text>


              <View>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={{
                    color: "white",
                    margin: 3,
                    fontSize: 11,
                    height: 14
                  }}
                >{this.state.statData.find(
                    a => data.item.mediaId === a.mediaId
                  )?moment(this.state.statData.find(a => data.item.mediaId === a.mediaId).creationTime).format("YYYY-MM-DD h:mm:ss")
                    :""}
                </Text>
              </View>
              <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={{
                    color: "white",
                    margin: 3,
                    fontSize: 11,
                    height: 14,
                    padding: 0
                  }}>{this.sec2time(data.item.mediaDuration)}
                </Text>
        
              <View>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={{
                    color: "white",
                    margin: 3,
                    fontSize: 11,
                    height: 14,
                    padding: 0
                  }}>{this.Capitalize(data.item.mediaType)}  |  {this.state.statData.find( a => data.item.mediaId === a.mediaId)?Math.floor(this.state.statData.find(a => data.item.mediaId === a.mediaId).size / 1000000
                      )+"MB"
                    : "err"}
                </Text>
              </View>
              <View
                style={{
                  justifyContent: "flex-end",
                  flexDirection: "row",
                  alignContent: "flex-end",
                  alignItems: "center"
                }}>
                <Icon
                  onPress={() => _onPressDelete(data.item.mediaUri, data.item.mediaId )}
                  name="delete"
                  size={19}
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
    console.log("Props Length " + JSON.stringify(this.props.list))
    if (this.props.list === null || this.props.list === "undefined") {
      return (
        <View
        style={{
    
          alignContent: 'center',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{
              color: "red",
              margin: 6,
              fontSize: 16
            }}>
            Empty Playlist
          </Text>
        </View>
      );
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
