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
    //Actions.refresh({ key: 'drawer', open: false });
  }




  renderItem = data => {
    const end = moment(data.item.end_date_time).format("h:mm a");
    const start = moment(data.item.start_date_time).format("h:mm");
    const time = moment(data.item.time, "YYYY-MM-DDTHH:mm:ss.SSS[Z]").fromNow();
    return (
      <View
        style={{
          backgroundColor: "#007f85",
          
          marginTop: 2,
          marginBottom: 2
        }}
      >
        {/* <TouchableOpacity style={styles.item} key={data.item.programme_id} onPress={() => Actions.program({ programData: data.item })}> */}
        <TouchableOpacity key={data.item._id}>
          {/*              <LinearGradient colors={['#00c4cc', '#00c4cc']}
                        style={{
                            borderRadius: 3,
                        }}
                        start={[0.0, 0.5]}
                        end={[1.0, 0.5]}
                        locations={[0.0, 1.0]}
                    > */}

          <View
            style={{
              flexDirection: "row",
              padding: 7,
              borderRadius: 3,
              backgroundColor: "#007f85"
            }}
          >
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                color: "white"
              }}
            >
              <Text>{data.item.from}. </Text>
              <Text
                style={{
                  flexDirection: "row",
                  width: "100%",
                  color: "white"
                }}
              >
                {time}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              width: "100%"
            }}
          >
            <Text style={styles.programDescription} color="white">
              {data.item.body}
            </Text>
          </View>

          {/* </LinearGradient> */}
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
