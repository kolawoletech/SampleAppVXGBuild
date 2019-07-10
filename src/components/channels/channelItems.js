import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, FlatList, Image, Dimensions } from 'react-native';
const { width, height } = Dimensions.get("window");
import { styles } from './styles';
import { Actions } from 'react-native-router-flux';
import { AsyncStorage } from "react-native";
import { LoadingIndicator } from "../loadingIndicator/loadingIndicator";
//import FastImage from 'react-native-fast-image'
import RNFS from "react-native-fs";

import ProgressiveImage from './ProgressiveImage'

import LinearGradient from 'react-native-linear-gradient';

import _ from "lodash";

import fetch_blob from 'react-native-fetch-blob';

export class ChannelItems extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showTheThing: false,
      images: [],
      channelImagesSavedLocally: [],
      channelImagesSavedOnline: []
    }
  }

  arraysEqual = (a, b) => {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length != b.length) return false;

    // If you don't care about the order of the elements inside
    // the array, you should sort both arrays here.
    // Please note that calling sort on an array will modify that array.
    // you might want to clone your array first.

    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  };

  async componentWillMount() {
    await this.checkForNewUpdates();
    console.log("ChannelItems:" + JSON.stringify(this.props))
  }

  async checkForNewUpdates(){
    try {
      let channelItems = this.props.list;
      console.log("This is the Item List for IDs" +  JSON.stringify(this.props))

      let result = channelItems
        .map(({ id }) => id)
        .join(",");

      var array = result.split(",");
      console.log("This is the Item List for IDs" +  array)


      this.setState({
        channelImagesSavedOnline: array
      });

      console.log("checkForNewUpdates Saved Online State" + this.state.savedOnline + "checkForNewUpdates Saved Online Actual array: " + array);

      const cachedImageFolder = RNFS.CachesDirectoryPath + `/NileMediaChannelImages` + "/";

      RNFS.exists(cachedImageFolder).then(async (exists) => {
        console.log("Exists ~: " + exists)
        if (exists ==="true"){
          RNFS.readDir(cachedImageFolder).then(async (results)=>{
            var arr = [];
            for (i = 0; i < results.length; i++) {
              console.log("GOT RESULT OF CHANNEL IMAGES", results);
              var filename = results[i].name.split(".").slice(0, -1).join(".");
              arr.push(parseInt(filename));
            }


            this.setState({
              channelImagesSavedLocally: arr
            }); 

            await Promise.all(arr);
          }).then(async ()=>{
            if (this.arraysEqual(this.state.channelImagesSavedLocally,array)){
              console.log("checkForNewUpdates: Same Items");
            } else {
              console.log("checkForNewUpdates: New Updates Found, Delete Folder ");
              let path = RNFS.CachesDirectoryPath + `/NileMediaChannelImages` + "/";

              RNFS.unlink(path).then(async ()=>{
                console.log("checkForNewUpdates: Create Folder and Get Images");

                const promises = this.props.list.map(item => {
                  //return this._getImage(item.programme_id);
                  console.log("Item IDS" + item.d);
                  return this._getImageUpdate(item.id);
                });

                const results = await Promise.all(promises);
                this.setState({
                  images: results
                });
              })
            }
          })
        } else {
          console.log("Create A Folder");
          const promises = this.props.list.map(async item => {
            //return this._getImage(item.programme_id);
            console.log("Item IDS" + item.id);
            return this._getImageUpdate(item.id);
          });

          const results = await Promise.all(promises);
          this.setState({
            images: results
          });
        }
      })


    } catch (error) {
      console.log("Error:  " + error)
    }
  }

  async _getImageUpdate(id){
    let AID = await AsyncStorage.getItem("aid");
    
    const options = {
      method: "POST",
      body: "aid=" + AID,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };

    const url = "https://nile.rtst.co.za/api/artist/6/tokens";

    const token = await fetch(url, options)
      .then(token_data => token_data.json())
      .then(token_data => {
        return token_data["data"];
      })
    const channels_options = {
      method: "GET",

      headers: new Headers({
        Authorization: "Bearer " + token,
        "Content-Type": "application/x-www-form-urlencoded"
      })
    };

    const channel_url = "https://nile.rtst.co.za/api/artist/6/channels/" + id + "/" + "icon/";

    return await fetch(channel_url, channels_options)
    .then(icon => icon.json())
    .then(icon => {
      let img = icon["data"];

      var image_data = img.split("data:image/png;base64,");
      var i = 0;
      image_data = image_data[1];

      console.log("Stripped Image: --- " + image_data);
      const cachedImagePath = RNFS.CachesDirectoryPath +`/NileMediaChannelImages` + "/" + id + ".png";

      const absolutePath = RNFS.CachesDirectoryPath + `/NileMediaChannelImages`;

      RNFS.mkdir(absolutePath)
        .then(result => {
          RNFS.writeFile(cachedImagePath, image_data, "base64")
            .then(() => {
              this.setState({
                isImageSavedLocally: true
              });
            })
            .catch(error => {
              //alert(JSON.stringify(error));

              this.setState({
                isImageSavedLocally: false
              });
            });
        })
        .catch(err => {
          console.warn("err", err);
        });
      return { id, img };
    });

  }


  async  componentDidUpdate(prevProps) {
    //TODO Add Condition to detect new Chanes


    if (this.props.list != prevProps.list) {
      const promises = this.props.list.map(item => {
        return this._getImageUpdate(item.id);
      });

      const results = await Promise.all(promises);
      this.setState({
        images: results
      });
    }

  }
  



  renderItem = (data) => {
    var cachedImageLocation =RNFS.CachesDirectoryPath +"/NileMediaChannelImages/" +data.item.id + ".png";   // console.log(cachedImageFolder)
    return (

      <TouchableOpacity key={data.item.id} onPress={() => Actions.channel({ channelData: data.item })}>

        <LinearGradient
          colors={['#0F516C', '#76B6C4']}
          style={{ padding: 7, alignItems: 'center', borderRadius: 3, margin: 8 }}
          start={{x: 0, y: 0}} end={{x: 1, y: 0}}>
        <View style={{ width: '100%', height: 150, flexDirection: 'row' }}>
          <View style={{ width: '40%' }}>
          <ProgressiveImage 
              id={data.item.id}
            /> 

          </View>

          <View style={{ paddingTop: 32, width: '60%', flex: 1, backgroundColor: 'rgba(0, 0, 0, 0)', alignItems: 'flex-start' }}>
            <Text style={{ color: 'white', fontSize: 20, margin: 6, fontSize: 21, fontWeight: 'bold', left: 10 }}>{data.item.name}</Text>
            <Text numberOfLines={1} ellipsizeMode="tail" style={{ color: 'white', margin: 6, fontSize: 15, left: 10 }}>{data.item.description}</Text>
          </View>
        </View>
        </LinearGradient>
      </TouchableOpacity>

    );

  }

  FlatListItemSeparator = () => {
    return (
      <View style={{
        height: .5,
        width: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
      />
    );
  }
  render() {

    if (this.props.list.length === 0) {
      return (
        <TouchableOpacity>
          <LoadingIndicator />
        </TouchableOpacity>
      );
    } else {
      const { list } = this.props;
      const { logo } = this.props;





      return (
        <View >
          {this.state.images.length > 0 &&
            <FlatList
              data={list.sort((a, b) => a.description.localeCompare(b.description)).reverse()}
              numColumns={1}
              renderItem={item => this.renderItem(item)}
              keyExtractor={item => item.id.toString()}
            />}
        </View>

      );
    }
  }
}
