import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  FlatList,
  Button,
  Image,
  Dimensions
} from "react-native";
import RNFS from "react-native-fs";

//import FastImage from 'react-native-fast-image'

import { styles } from "./styles";
import { Actions } from "react-native-router-flux";
import { LoadingIndicator } from "../loadingIndicator/loadingIndicator";
import LinearGradient from "react-native-linear-gradient";

import Icon from "react-native-vector-icons/MaterialIcons";
import { Card, CardImage } from "react-native-material-cards";
import { AsyncStorage } from "react-native";
import { consolidateStreamedStyles } from "styled-components";
let { width, height } = Dimensions.get("window");

export class CatalogueItems extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showTheThing: false,
      images: [],
      facedown: this.props.orientation,
      savedLocally: []
    };
  }

  async componentDidMount() {
    await this.checkForNewUpdates()
  }


  async checkForNewUpdates(){
    try {
      //console.log("Structure of Items: " + "This Prips" + JSON.stringify(this.props))
      let catalogueItems =this.props.list;
      let result = catalogueItems.map(({ programme_id }) => programme_id).join(',');;
      var array = result.split(',');
      this.setState({
        savedOnline: array
      })
      console.log("Saved Online "+ this.state.savedOnline)
      console.log("Structure of Items: " +  "The ARRAY: " + array)

      const cachedImageFolder = RNFS.CachesDirectoryPath + `/NileMediaCatalogueImages` +"/" ;

      RNFS.readDir(cachedImageFolder) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
        .then((result) => {
          //console.log('GOT RESULT', result);
          console.log('GOT RESULT',result)
          var arr = []
          for (i = 0; i< result.length; i++){
            console.log('GOT RESULT', result[i].name);
            var filename = result[i].name.split('.').slice(0, -1).join('.')
            arr.push(parseInt(filename))
          }
          // stat the first file
          console.log(arr)
          this.setState({
            savedLocally: arr
          })
          console.log(this.state.savedLocally)
          return Promise.all([RNFS.stat(result[0].path), result[0].path]);
        })
        .then((statResult) => {
          if (statResult[0].isFile()) {
            // if we have a file, read it
            return RNFS.readFile(statResult[1], 'utf8');
          }

          return 'no file';
        })
        .then((contents) => {
          // log the file contents
          console.log(contents);
        })
        .catch((err) => {
          console.log(err.message, err.code);
        }
      );


    } catch (error) {
      console.log("Structure of Items: " + error )

    }
  }

  async componentDidUpdate(prevProps) {

      console.log("Images already saved locally");
   
      if (this.props.list != prevProps.list) {
        const promises = this.props.list.map(item => {
          return this._getImage(item.programme_id);
        });

        const results = await Promise.all(promises);
        this.setState({
          images: results
        });
      }
/* 
      if (this.props.orientation != prevProps.orientation) {
        this.setState({
          facedown: this.props.orientation
        });

        const promises = this.props.list.map(item => {
          return this._getImage(item.programme_id);
        });

        const results = await Promise.all(promises);
        this.setState({
          images: results
        });

        
      } */
    
  }

  arraysEqual= (a, b) =>  {
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
  }

  async _getImage(id) {
/*     if (this.state.savedLocally === this.state.savedOnline){

      console.log("Same Items")
    } else {
      console.log("New Updates")

    } */
    let savedLocally = this.state.savedLocally;
    console.log("checking saved localllky: "+ this.state.savedLocally)
    let savedOnline = this.state.savedOnline
    console.log("checking saved online: " + this.state.savedOnline)

    if (this.arraysEqual(savedLocally, savedOnline)){
      console.log("Same Items")
    } else {
      console.log("New Updates")
    } 
    if (this.state.isImageSavedLocally === "undefined" || this.state.isImageSavedLocally === true) {
      let AID = await AsyncStorage.getItem("aid");

      const options = {
        method: "POST",
        body: "aid=" + AID,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      };

      const url = "https://nile.rtst.co.za/api/artist/6/tokens";
      const token = await fetch(url, options).then(token_data => token_data.json())
                    .then(token_data => {
                      return token_data["data"];
                    });
      const channels_options = {
        method: "GET",

        headers: new Headers({
          Authorization: "Bearer " + token,
          "Content-Type": "application/x-www-form-urlencoded"
        })
      };

      const channel_url = "https://nile.rtst.co.za/api/artist/6/programs/" + id + "/" + "icon/";

      return await fetch(channel_url, channels_options)
        .then(icon => icon.json())
        .then(icon => {
          let img = icon["data"];

          var image_data = img.split("data:image/png;base64,");
          var i = 0;
          image_data = image_data[1];

          console.log("Stripped Image: --- " + image_data);
          const cachedImagePath =
            RNFS.CachesDirectoryPath + `/NileMediaCatalogueImages` +"/" + id + ".png";

          const absolutePath = RNFS.CachesDirectoryPath + `/NileMediaCatalogueImages`;

          RNFS.mkdir(absolutePath).then(result => {
            console.log("result", result);
            RNFS.writeFile(cachedImagePath, image_data, "base64").then(() => {
              this.setState({
                isImageSavedLocally: true
              });
            })
            .catch(error => {
              alert(JSON.stringify(error));

              this.setState({
                isImageSavedLocally: false
              });
            });
          }).catch(err => {
            console.warn("err", err);
          });
        return { id, img };
      });
    } else {
      console.log("LOVE, IT IS ALREADY LOCAL, SAVE YOUR DATA");
    }
  }

  renderItem = data => {
   var cachedImageLocation = RNFS.CachesDirectoryPath+"/NileMediaCatalogueImages/"+data.item.programme_id+".png"

    return (
      <View style={{ width: "50%", height: "50%" }}>
        <TouchableOpacity
          style={styles.item}
          key={data.item.programme_id}
          onPress={() => Actions.program({ programData: data.item })}>
          <Card>
{/*             <CardImage
              source={{
                uri: this.state.images.find(
                  a => data.item.programme_id === a.id
                )
                  ? this.state.images.find(a => data.item.programme_id === a.id)
                      .img
                  : "https://newbietech.com.ng/placeholder-nile-logo-150.png"
              }}
              resizeMode="contain"
              style={{
                backgroundColor: "transparent",
                maxHeight: 83,
                minHeight: 83
              }}
            /> */}
    {/*         {this.state.isImageSavedLocally === "false" && (
                <CardImage
                  resizeMode="contain"
                  style={{
                    backgroundColor: "transparent",
                    maxHeight: 83,
                    minHeight: 83
                  }}
                  source={{ uri:'https://via.placeholder.com/150' }}
                />
              )} */}
              {this.state.isImageSavedLocally === true || this.state.isImageSavedLocally !== "undefined"  && (
                <CardImage
                  resizeMode="contain"
                  style={{
                    backgroundColor: "transparent",
                    maxHeight: 83,
                    minHeight: 83
                  }}
                  source={{ uri: cachedImageLocation }}
                />
            )}
            {/*             <FastImage
            style={{ width: 150, height: 150,  }}
            source={{
              uri: this.state.images.find(
                a => data.item.programme_id === a.id
              )
                ? this.state.images.find(a => data.item.programme_id === a.id)
                    .img
                : "https://newbietech.com.ng/placeholder-nile-logo-150.png",
                headers: { Authorization: 'someAuthToken' },
                priority: FastImage.priority.high,
            }}
            resizeMode={FastImage.resizeMode.contain}
            cache={FastImage.cacheControl.cacheOnly}
          /> */}
            {/*                         <Image
                            source={{ uri: this.state.images.find(a => data.item.programme_id === a.id) ? this.state.images.find(a => data.item.programme_id === a.id).img : 'https://newbietech.com.ng/placeholder-nile-logo-150.png', cache: 'only-if-cached' }}
                            resizeMode="stretch"
                            style={{
                                width: '100%', height: '80%', backgroundColor: 'transparent', maxHeight: 83, minHeight: 83
                            }}
                           
                        /> */}
            <Icon
              size={22}
              color="white"
              style={{ position: "absolute", left: 10 }}
              name="cloud-download"
              size={22}
              color="white"
            />

            <Text
              numberOfLines={2}
              style={{
                fontSize: 14,
                height: "30%",
                width: "100%",
                fontWeight: "normal",
                backgroundColor: "#76b6c4",
                textAlign: "center",
                color: "white"
              }}>
              {data.item.name}
            </Text>
          </Card>
        </TouchableOpacity>
      </View>
    );
  };

  renderItemInLandscape = data => {
    var cachedImageLocation = RNFS.CachesDirectoryPath+"/NileMediaCatalogueImages/"+data.item.programme_id+".png"

    return (
      <View style={{ width: "50%", height: "50%" }}>
        <TouchableOpacity
          style={styles.itemLandscape}
          key={data.item.programme_id}
          onPress={() => Actions.program({ programData: data.item })}>
          <Card>
{/*             <CardImage
              source={{
                uri: this.state.images.find(
                  a => data.item.programme_id === a.id
                )
                  ? this.state.images.find(a => data.item.programme_id === a.id)
                      .img
                  : "https://newbietech.com.ng/placeholder-nile-logo-150.png"
              }}
              resizeMode="contain"
              style={{
                backgroundColor: "transparent"
              }}
            /> */}

            {this.state.isImageSavedLocally === true || this.state.isImageSavedLocally !== "undefined"  && (
                <CardImage
                  resizeMode="contain"
                  style={{
                    backgroundColor: "transparent",
                 
                  }}
                  source={{ uri: cachedImageLocation }}
                />
            )}

            <Icon
              size={22}
              color="white"
              style={{ position: "absolute", left: 10 }}
              name="cloud-download"
              size={22}
              color="white"
            />

            <Text
              numberOfLines={2}
              style={{
                fontSize: 16,
                height: 40,
                maxHeight: 40,
                width: "100%",
                fontWeight: "bold",
                backgroundColor: "#76b6c4",
                textAlign: "center",
                color: "white"
              }}
            >
              {data.item.name}
            </Text>
          </Card>
        </TouchableOpacity>
      </View>
    );
  };

  onLayout(e) {
    this.setState({
      width: Dimensions.get("window").width,
      height: Dimensions.get("window").height
    });
  }

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
    const { orientation } = this.props;

    if (this.props == "undefined") {
      return (
        <TouchableOpacity>
          <LoadingIndicator />
        </TouchableOpacity>
      );
    } else if (this.state.facedown == "portrait") {
      const { list } = this.props;
      const { orientation } = this.props;

      return (
        <View>
          {this.state.images.length === 0 && (
            <FlatList
              data={list}
              renderItem={item => this.renderItem(item)}
              keyExtractor={item => item.programme_id.toString()}
              numColumns={2}
            />
          )}
          {this.state.images.length > 0 && (
            <FlatList
              data={list}
              renderItem={item => this.renderItem(item)}
              keyExtractor={item => item.programme_id.toString()}
              numColumns={2}
            />
          )}
        </View>
      );
    } else if (this.state.facedown == "landscape") {
      const { list } = this.props;
      const { orientation } = this.props;

      return (
        <View onLayout={this._onLayout}>
          {this.state.images.length === 0 && (
            <FlatList
              data={list}
              renderItem={item => this.renderItemInLandscape(item)}
              keyExtractor={item => item.programme_id.toString()}
              numColumns={3}
            />
          )}
          {this.state.images.length > 0 && (
            <FlatList
              data={list}
              renderItem={item => this.renderItemInLandscape(item)}
              keyExtractor={item => item.programme_id.toString()}
              numColumns={3}
            />
          )}
        </View>
      );
    } else {
      <Text>Breakdown</Text>;
    }
  }
}
