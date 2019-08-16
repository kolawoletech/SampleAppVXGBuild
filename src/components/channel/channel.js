import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
  Button,
  TouchableHighlight
} from "react-native";
import RNFS from "react-native-fs";

import { styles } from "./styles";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Actions } from "react-native-router-flux";
import LinearGradient from "react-native-linear-gradient";
import { AsyncStorage } from "react-native";

import { connect } from "react-redux";
import {
  fetchChannelObject,
  fetchChannelImage,
  fetchChannelRSTPLinks,
  playHighRSTPStream
} from "../../actions/api/actions";
import { ChannelQuality } from "./channelQuality";
import { LoadingIndicator } from "../loadingIndicator/loadingIndicator";

export class Channel extends React.Component {
  constructor(props) {
    super(props);
    console.log("Propes Heres" + JSON.stringify(this.props));
    this.autoQualityClick = this.autoQualityClick.bind(this);
  }
  async componentDidMount() {
    const channel = this.props.channelData;
    //this.props.channelObject(channel.id);
    await this.getChannelWithAID();
    //await this.getChannelImageWithAID();
    this.autoQualityClick = this.autoQualityClick.bind(this);
    this.onFetchRSTPLink = this.onFetchRSTPLink.bind(this)
  }

  onFetchRSTPLink = (channelID, profileID, AID, quality) => {
    this.props.fetchRstpLink(channelID, profileID, AID, quality);
  };

  async getChannelImageWithAID() {
    const channel = this.props.channelData;

    let AID = await AsyncStorage.getItem("aid");

    this.props.imageURI(channel.id, AID);
  }

   autoQualityClick() {
    const { quality: qualityList } = this.props.channelData;
    const channel = this.props.channelData;
    //let AID = await AsyncStorage.getItem("aid");

    let result = qualityList.map(({ profile_id }) => profile_id);
    const max = Math.max(...result);

    this.props.autoQuality(channel.id, max);
  }

  async getChannelWithAID() {
    let AID = await AsyncStorage.getItem("aid");
    let TOKENID = await AsyncStorage.getItem("tokenID");


    const channel = this.props.channelData;
    //this.props.channelObject(channel.id, AID, TOKENID);
  }
  render() {
    const { quality: qualityList, id: channelID } = this.props.channelData;
    const list = this.props.channelData;
    const channel_details = this.chan;
    const channel = this.props.channelData;

    if (this.props == "undefined") {
      return (
        <View>
          <LoadingIndicator />
        </View>
      );
    } else {
      //let { img } = this.props;
      let img =  RNFS.CachesDirectoryPath +"/NileMediaChannelImages/" +channel.id + ".png";  

      return (
        <LinearGradient
          colors={["#212121", "#212121", "#212121"]}
          style={{ height: "100%", padding: 7 }}
        >
          <ScrollView>
            <View
              style={{
                width: "100%",
                height: 225,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#76B6C4",
                opacity: 0.6
              }}>
              <Image
                resizeMode="contain"
                style={{
                  display: "flex",
                  width: 225,
                  height: 225,
                  position: "absolute",
                  alignItems: "center"
                }}
                source={{ uri: img }}
              />

              <View
                style={{
                  flex: 1,
                  backgroundColor: "rgba(0, 0, 0, 0)",
                  alignItems: "center"
                }}>
                <Text
                  style={{
                    color: "#0F516C",
                    paddingTop: 32,
                    fontSize: 20,
                    margin: 6,
                    fontSize: 21,
                    fontWeight: "bold",
                    left: 10
                  }}>
                  {list.name}
                </Text>
              </View>
              {qualityList.length !== 0 ? (
              <TouchableHighlight onPress={this.autoQualityClick}>
                <Icon name="play-circle-outline" color="white" size={102} />
              </TouchableHighlight>
              ) : null}
              <View
                style={{
                  paddingBottom: 20
                }}>
                <Text style={styles.text}>Auto Quality</Text>
              </View>
            </View>

            <View style={styles.guide}>
              <View>
                <TouchableHighlight
                  onPress={() => Actions.guide({ channelID: list.id })}>
                  <Icon
                    name="playlist-play"
                    size={22}
                    color="#76B6C4"
                    //onPress={Actions.guide({ channelID: list.id })}

                    style={{
                      left: 10
                    }}
                  />
                </TouchableHighlight>
              </View>
              <View
                style={{
                  alignItems: "center",
                  textAlign: "center",
                  left: 110,
                  position: "absolute"
                }}
              >
                <Button
                  color="#e5e5e5"
                  onPress={() => Actions.guide({ channelID: list.id })}
                  title="CHANNEL GUIDE"
                />
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                paddingTop: 10,
                paddingBottom: 10
              }}
            >
              <View
                style={{
                  color: "#fff",
                  paddingTop: 6,
                  fontSize: 24
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 16,
                    color: "#fff"
                  }}
                >
                  Quality
                </Text>
              </View>
              <View
                style={{
                  borderBottomColor: "#fff",
                  borderBottomWidth: 2,
                  flex: 1.7,
                  paddingTop: 4
                }}
              />
            </View>
            <Text
              style={{
                textAlign: "center",
                color: "#fff"
              }} >
              Choose your own Quality Vs Mobile Data Cost
            </Text>
            <View style={styles.pills}>
              <View>
                <ChannelQuality
                  qual={qualityList}
                  cid={channelID}
                  onPressItem={this.onFetchRSTPLink}
                />
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                paddingTop: 10,
                paddingBottom: 10
              }}
            >
              <View
                style={{
                  color: "#fff",
                  paddingTop: 6
                }}>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 16,
                    color: "#fff"
                  }}
                >
                  Description
                </Text>
              </View>
              <View
                style={{
                  borderBottomColor: "#fff",
                  borderBottomWidth: 2,
                  flex: 1.7,
                  paddingTop: 4
                }}
              />
            </View>
            <View
              style={{
                display: "flex"
              }}>
              <Text
                style={{
                  textAlign: "center",
                  color: "#fff",
                  fontSize: 11
                }}
              >
                {list.description}
              </Text>
            </View>
          </ScrollView>
        </LinearGradient>
      );
    }
  }
}

const mapStateToProps = ({ routes, apiReducer: { channel, img } }) => ({
  routes: routes,
  //token: token,
  channel: channel,
  img: img
});

const mapDispatchToProps = {
  channelObject: fetchChannelObject,
  //TODO Consider `Not Fetching Again, Rather User Action Prop to Send if Possible
  imageURI: fetchChannelImage,
  fetchRstpLink: fetchChannelRSTPLinks,
  autoQuality: playHighRSTPStream
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Channel);
