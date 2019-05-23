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

export class MessageItems extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showTheThing: false,
      images: [],
      markedDate: moment(new Date()).format("YYYY-MM-DD")
    };
  }

  componentDidMount() {}

  componentWillMount() {
  }




  renderItem = data => {
 
    const time = moment(data.item.time, "YYYY-MM-DDTHH:mm:ss.SSS[Z]").fromNow();
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
      const { list } = this.props;
      return (
        <View>
          {this.state.images.length === 0 && (
            <FlatList
              data={list}
              renderItem={item => this.renderItem(item)}
              keyExtractor={item => item._id.toString()}
              numColumns={2}
            />
          )}
          {this.state.images.length > 0 && (
            <FlatList
              data={list}
              renderItem={item => this.renderItem(item)}
              keyExtractor={item => item._id.toString()}
              numColumns={2}
            />
          )}
        </View>
      );
    }
  }
}
