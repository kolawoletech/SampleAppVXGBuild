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
      currentItem: "",
      statData: []
    };
  }

  Capitalize(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
    }
  async componentDidUpdate(prevProps) {
    if (this.props.list != prevProps.list) {
      const promises = this.props.list.map(item => {
        return this._getVideoStats(item.mediaId);
      });

      const results = await Promise.all(promises);

      this.setState({
        statData: results
      });
      this.forceUpdate();

      console.log("StatData: " + JSON.stringify(this.state.statData));
      console.log("StatData: " + JSON.stringify(results));
    }
  }

  async _getVideoStats(mediaId) {
    var VIDEO_FOLDER = RNFetchBlob.fs.dirs.DocumentDir + "/NileMediaVideos/";
    var VIDEO_LOCATION = VIDEO_FOLDER + mediaId + `.mp4`;

    return await RNFS.stat(VIDEO_LOCATION)
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

  async _getPodcastStats(id) {
    var VIDEO_FOLDER = RNFetchBlob.fs.dirs.DocumentDir + "/NileMediaVideos/";
    var VIDEO_LOCATION = VIDEO_FOLDER + id + `.mp4`;

    RNFS.exists(VIDEO_LOCATION).then(async exists => {
      if (exists) {
        return await RNFS.stat(VIDEO_LOCATION)
          .then(stats => {
            let size = stats.size;
            let creationTime = stats.ctime;
            let path = stats.path;

            console.log(id, size, creationTime, path);

            return { id, size, creationTime, path };
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        return;
      }
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
        onPress={() => onPressItem(data.item.mediaId)}
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
                width: "45%"
              }}>
              <Image
                resizeMode="contain"
                style={{ width: "100%", height: 135, position: "absolute" }}
                source={{
                  uri: cachedImageLocation
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
                  margin: 6
                }}>
                {data.item.mediaName}
              </Text>

              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{
                  color: "white",
                  fontSize: 16,
                  fontWeight: "bold",
                  margin: 6
                }}>
                {data.item.mediaDesc}
              </Text>

              <View>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={{
                    color: "white",
                    margin: 6,
                    fontSize: 12,
                    height: 14
                  }}
                >
                  {this.state.statData.find(
                    a => data.item.mediaId === a.mediaId
                  )
                    ? moment(
                        this.state.statData.find(
                          a => data.item.mediaId === a.mediaId
                        ).creationTime
                      ).format("YYYY-MM-DD h:mm:ss")
                    : ""}
                </Text>
              </View>
              <View>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={{
                    color: "white",
                    margin: 6,
                    fontSize: 12,
                    height: 14,
                    padding: 0
                  }}> {this.Capitalize(data.item.mediaType)}  |  {this.state.statData.find(
                    a => data.item.mediaId === a.mediaId
                  )
                    ? Math.floor(
                        this.state.statData.find(
                          a => data.item.mediaId === a.mediaId
                        ).size / 1000000
                      ) + "MB"
                    : ""}
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
                  onPress={() => _onPressDelete(data.item.mediaId)}
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
    if (this.props.list === null || this.props.list === "undefined" || this.state.statData.length == 0) {
      return (<Text>Empty Playlist</Text>);
    } else {
      return (
        <ScrollView>
          {(this.state.statData.length && this.state.statData.length) > 0 && (
            <FlatList
              data={list}
              horizontal={false}
              renderItem={item => this.renderItem(item)}
              keyExtractor={item => item.mediaId.toString()}
            />
          )}
        </ScrollView>
      );
    }
  }
}
