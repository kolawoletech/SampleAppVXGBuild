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

export class CachedCatalogueItem extends React.Component {
  constructor(props) {
    super(props);
  }

  async componentWillMount() { 
  }

  renderItem = data => {
  
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
                  uri: "https://via.placeholder.com/150"
                }}
              />
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  render() {
    const { list } = this.props;
    if (this.props.list === null || this.props.list === 'undefined' ){
      return (
        <Text>Empty Playlist</Text>
      )
    } else {
      return (
        <ScrollView>
            <FlatList
              data={list}
              horizontal={false}
              renderItem={item => this.renderItem(item)}
              keyExtractor={item => item._id.toString()}
            />
        </ScrollView>
      );
    }

  
  }
}
