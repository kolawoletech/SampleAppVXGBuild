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
  Image,
  Dimensions
} from "react-native";
const { width, height } = Dimensions.get("window");

import LinearGradient from 'react-native-linear-gradient';
import RNFetchBlob from "rn-fetch-blob";


import { styles } from "./styles";
import Icon from "react-native-vector-icons/MaterialIcons";
export class MediaItems extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      getTheMetaData: false,
      metadata: [],
      thumbnails: [],
      path: []
    };
  }

  async componentWillMount(){
    
    const statPromises = this.props.list.map(item => {
      console.log("statPromises :" + item.uri)
      return this._getPaths(item.uri);
    });

    const statsResults = await Promise.all(statPromises);

    console.log("Logging The stat results" + statsResults)
    //this._getPaths()

    this.setState({
      path: statsResults
    });
  }


  async componentDidUpdate(prevProps) {
    if ((this.props.list != prevProps.list)) {

      const promises = this.props.list.map(item => {
        return this._getMetadata(item._id);
      });

      const thumbmailPromises = this.props.list.map(item => {
        return this._getImages(item._id);
      });

     

      const results = await Promise.all(promises);
      const thumbnailResults = await Promise.all(thumbmailPromises);
      //const statsResults = await Promise.all(statPromises);

      
      //console.log("Logging The stat results" + statsResults)

      this.setState({
        metadata: results,
        thumbnails: thumbnailResults,
        //path: statsResults
      });
    }


  }



  async _getMetadata(id) {
    const options = {
      method: "POST",
      body: "aid=c90bf2be-459b-46bd-9ac5-0693f07d54ac",
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
      });
  }

  async _getImages(id) {
    const options = {
      method: "POST",
      body: "aid=c90bf2be-459b-46bd-9ac5-0693f07d54ac",
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
      });
  }

  async _getPaths(path) {
    RNFetchBlob.fs.stat(path).then((stats)=>{
      var size = stats.size;
      var lastModified = stats.lastModified;
      var type = stats.type
      console.log(size, type, lastModified)
      
      return { size, type, lastModified };
    }).catch(err=>{
      console.log(err)
    })
  }

  renderItem = data => {
    const { onPressItem } = this.props;
    const { _onPressDelete } = this.props;

    console.log(
      "These are the `metaData details" + JSON.stringify(this.state.path)
    );

    return (
      <TouchableOpacity
        onPress={() => onPressItem(data.item.uri)}
        style={styles.item}
        key={data.item.name}
      >
       <LinearGradient
          colors={['#0F516C', '#76B6C4']}
          style={{ padding: 7, alignItems: 'center', borderRadius: 3, margin: 3 }}
          start={{x: 0, y: 0}} end={{x: 1, y: 0}}
          >
        <View
          style={{
            width: "100%",
            height: 135,
            flexDirection: "row"
          }}
        >
          <View
            style={{
              width: "45%"
            }}
          >
            <Image
              resizeMode="stretch"

              style={{ width: "100%", height: 135, position: "absolute" }}
              source={{
                uri: this.state.thumbnails.find(a => data.item._id === a.id)
                  ? this.state.thumbnails.find(a => data.item._id === a.id).img
                  : "https://via.placeholder.com/150"
              }}
            />
          </View>
          <View
            style={{
              width: "55%",
              flex: 1,
              backgroundColor: "rgba(0, 0, 0, 0)"
            }}
          >
            <Text
            numberOfLines={1}
            ellipsizeMode="tail"
              style={{
                color: "white",
                fontSize: 18,
                fontWeight: "bold",
                margin: 6,
              }}
              
            >
              {this.state.metadata.find(a => data.item._id === a.id)
                ? this.state.metadata.find(a => data.item._id === a.id).metdat
                    .name
                : "Network Failure"}
            </Text>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{ color: "white", margin: 6, fontSize: 15 }}
            >
              {this.state.metadata.find(a => data.item._id === a.id)
                ? this.state.metadata.find(a => data.item._id === a.id).metdat
                    .description
                : ""}
            </Text>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{ color: "white", margin: 6, fontSize: 15 }}
            >
              {this.state.path.find(a => data.item.uri === a)
                ? this.state.path.find(a => data.item.uri === a).size
                : ""}
            </Text>
            <Icon
              onPress={() => _onPressDelete(data.item.uri)}
              name="delete"
              size={32}
              color="#d11a2a"
            />
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

    "These are the `metaData details" + JSON.stringify(this.state.path)

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
