import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  FlatList,
  Button,
  Image,
  ImageBackground
} from "react-native";
import { styles } from "./styles";
import { Actions } from "react-native-router-flux";
import { LoadingIndicator } from "../loadingIndicator/loadingIndicator";
import moment from "moment";
import "moment-timezone";
import { AsyncStorage } from "react-native";

export class ChatItem extends React.Component {
  constructor(props) {
    super(props);


  }

  componentDidMount() {}

  componentWillMount() {
  }




  renderItem = data => {
 
    return (
      <View
        style={{
          backgroundColor: "#007f85",
          marginTop: 2,
          marginBottom: 2
        }}>
        <TouchableOpacity key={data.item._id}>
          <View
            style={{
              flexDirection: "row",
              padding: 7,
              borderRadius: 3,
              backgroundColor: "#007f85"
            }}>
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                color: "white"
              }}>
              <Text>{data.item.from}. </Text>
              <Text
                style={{
                  flexDirection: "row",
                  width: "100%",
                  color: "white"
                }}>
                {time}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              width: "100%"
            }}>
            <Text style={styles.programDescription} color="white">
              {data.item.body}
            </Text>
          </View>

        </TouchableOpacity>
      </View>
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
    if (this.props == "undefined") {
      return (
        <TouchableOpacity>
          <LoadingIndicator />
        </TouchableOpacity>
      );
    } else {
      return (
        <View>
            <Text>Chat Item</Text>
        </View>
      );
    }
  }
}
