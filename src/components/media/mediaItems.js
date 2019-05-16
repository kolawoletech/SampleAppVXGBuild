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
import moment from "moment";
import 'moment-timezone';
import LinearGradient from 'react-native-linear-gradient';
import RNFetchBlob from "rn-fetch-blob";
var RNFS = require('react-native-fs');


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
      path: []
    };
  }

  async componentWillMount(){

   
  }

  async getDetails(){
    const pathPromises = this.props.list.map(item => {
      var VIDEO_FOLDER = RNFetchBlob.fs.dirs.DocumentDir + "/NileMediaVideos/";

      return this._getPaths(VIDEO_FOLDER+item._id+'.mp4', item._id);
    });
    const pathResults = await Promise.all(pathPromises);

    this.setState({
      path: pathResults
     
    });

    
    
    console.log("These aere rtuemws Secons" + this.state.path )
    setTimeout(() => {
      console.log("These aere rtuemws Secons" + JSON.stringify(pathResults) )
    }, 1000);
    //console.log("NOW RUNIING")

    //console.log(this.state.path)
  }

  async componentDidUpdate(prevProps) {
    if ((this.props.list != prevProps.list)) {

      const promises = this.props.list.map(item => {
        return this._getMetadata(item._id);
      });

      const thumbmailPromises = this.props.list.map(item => {
        return this._getImages(item._id);
      });

      await this.getDetails()


     
     

      const results = await Promise.all(promises);
      const thumbnailResults = await Promise.all(thumbmailPromises);
      
      

      this.setState({
        metadata: results,
        thumbnails: thumbnailResults,
      });

    }





  }



  async _getMetadata(id) {

    let AID = await AsyncStorage.getItem("aid");

    const options = {
      method: "POST",
      body: "aid="+AID,
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
    let AID = await AsyncStorage.getItem("aid");

    const options = {
      method: "POST",
      body: "aid="+AID,
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

  async _getPaths(path, id) {
   return await RNFS.stat(path).then((stats)=>{
      let size = stats.size;
      let creationTime = stats.ctime;
   
      let path = stats.path;
      
      console.log(id, size, creationTime, path)

      
      
      return { id, size, creationTime, path };
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
              style={{ color: "white", margin: 6, fontSize: 13 }}
            >
              {this.state.metadata.find(a => data.item._id === a.id)
                ? this.state.metadata.find(a => data.item._id === a.id).metdat
                    .description
                : ""}
            </Text>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{ color: "white", margin: 6, fontSize: 13 }}
            >
              {this.state.path.find(a => data.item._id === a.id)
                ? Math.floor(this.state.path.find(a => data.item._id === a.id).size/1000000) +"MB"
                : "Network"}
            </Text>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{ color: "white", margin: 6, fontSize: 13 }}
            >
              {this.state.path.find(a => data.item._id === a.id)
                ?  moment(this.state.path.find(a => data.item._id === a.id).creationTime).format("YYYY-MM-DD h:mm:ss")
                : "Network"}
            </Text>

            
            <View style={{
              justifyContent: 'center',
              flexDirection: 'row',
              alignContent:'center',
              alignItems: 'center'
            }}>
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
