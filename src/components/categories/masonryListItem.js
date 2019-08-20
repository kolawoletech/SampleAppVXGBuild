import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  FlatList,
  Button,
  Dimensions,
  Alert
} from "react-native";
import Image from "react-native-scalable-image";
import { PureComponent } from "react";
import { connect } from "react-redux";

import RNFS from "react-native-fs";

import { styles } from "./styles";
import { Actions } from "react-native-router-flux";
import { LoadingIndicator } from "../loadingIndicator/loadingIndicator";
import LinearGradient from "react-native-linear-gradient";

import Icon from "react-native-vector-icons/MaterialIcons";
import { Card, CardImage } from "react-native-material-cards";
import { AsyncStorage } from "react-native";
let { width, height } = Dimensions.get("window");
import ProgressiveImage from './ProgressiveImage'

import _ from "lodash";

class MasonryListItem extends PureComponent {

    constructor(props) {
        super(props);
    
        this.state = {
          showTheThing: false,
          images: [],
          facedown: this.props.orientation,
          savedLocally: [],
          savedOnline: [],
          //isImageSavedLocally: ""
        };
    }

    async componentDidMount() {
      console.warn("mount cell");    
    }

    async componentWillMount(){
      await this.checkForNewUpdates();
    }
    async componentWillUnmount(){
      //await this.checkForNewUpdates();
    }



  

    async checkForNewUpdates() {
        try {
          console.log("Structure of Items: " + "This Prips" + JSON.stringify(this.props.catalogue))
          let catalogueItems = this.props.catalogue;
          let result = catalogueItems
            .map(({ programme_id }) => programme_id)
            .join(",");
  
          var array = result.split(",");
            


    
    

          this.array = array
          //onsole.log("checkForNewUpdates Structure of Items: " + "The ARRAY: " + array);
    
          const cachedImageFolder = RNFS.CachesDirectoryPath + `/NileMediaCatalogueImages` + "/";

          RNFS.exists(cachedImageFolder).then(async exists => {
            console.log('Saved Folder does exist? ' + exists)
            if (exists) {
              RNFS.readDir(cachedImageFolder) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
                .then(async (result) => {
                  var arr = [];
                  for (i = 0; i < result.length; i++) {
                    console.log("Saved GOT RESULT", result[i].name);
                    var filename = result[i].name
                      .split(".")
                      .slice(0, -1)
                      .join(".");
                    arr.push(parseInt(filename));
                  }
                  // stat the first file
    
                  this.setState({
                    savedLocally: arr
                  });

             
    
                  await Promise.all(arr);
                  this.arr = arr;
                

                })
                .then(async () => {
                  if (this.arraysEqual(this.arr, this.array)) {
                    console.log(this.arr + "&" + this.array);
                    console.log("checkForNewUpdates: Same Items");
                  } else {
                    console.log("checkForNewUpdates: Different Items");
                    console.log(this.arr + "&" + this.array);


                    console.log( "checkForNewUpdates: New Updates Found, Delete Folder ");
                    let path = RNFS.CachesDirectoryPath + `/NileMediaCatalogueImages` + "/";
                    RNFS.unlink(path).then(async () => {
                      console.log("checkForNewUpdates: Create Folder and Get Images");
    
                      const promises = this.props.catalogue.map(item => {
                        //return this._getImage(item.programme_id);
                        console.log("Item IDS" + item.programme_id);
                        return this._getImageUpdate(item.programme_id);
                      });
    
                      const results = await Promise.all(promises);
                      this.setState({
                        images: results
                      });
                    });
                  }
                })
                .catch(err => {
                  console.log(err.message, err.code);
                });
            } else {
              console.log("Create A Folder");
              const promises = this.props.catalogue.map(async item => {
                //return this._getImage(item.programme_id);
                console.log("Item IDS" + item.programme_id);
                return this._getImageUpdate(item.programme_id);
              });
    
              const results = await Promise.all(promises);
              this.setState({
                images: results
              }); 
            }
          });
        } catch (error) {
          console.log("Structure of Items: " + error);
        }
    }
    





    async componentDidUpdate(prevProps) {
        if (this.props.list != prevProps.list) {
            const promises = this.props.list.map(item => {
                return this._getImageUpdate(item.programme_id);
            });

            const results = await Promise.all(promises);
            this.setState({
                images: results
            });
        } 
    }

    async componentWillUnmount() {
      console.warn("unmount cell");
    }


    arraysEqual = (a, b) => {
      return _.isEqual(a.sort(), b.sort()) 
    };


    async _getImage(id) {
        /*     if (this.state.savedLocally === this.state.savedOnline){
    
          console.log("Same Items")
        } else {
          console.log("New Updates")
    
        } */
        let savedLocally = this.state.savedLocally;
        console.log("checking saved locally: " + this.state.savedLocally);
        let savedOnline = this.state.savedOnline;
        console.log("checking saved online: " + this.state.savedOnline);
    
        if (this.arraysEqual(savedLocally, savedOnline)) {
          console.log("Same Items");
        } else {
          console.log("New Updates");
        }
        if (this.arraysEqual(savedLocally, savedOnline) === false) {
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
                RNFS.CachesDirectoryPath +
                `/NileMediaCatalogueImages` +
                "/" +
                id +
                ".png";
    
              const absolutePath =
                RNFS.CachesDirectoryPath + `/NileMediaCatalogueImages`;
    
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
        } else {
          console.log("LOVE, IT IS ALREADY LOCAL, SAVE YOUR DATA");
        }
      }
    
  async _getImageUpdate(id) {
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
      });
    const channels_options = {
      method: "GET",

      headers: new Headers({
        Authorization: "Bearer " + token,
        "Content-Type": "application/x-www-form-urlencoded"
      })
    };

    const channel_url =
      "https://nile.rtst.co.za/api/artist/6/programs/" + id + "/" + "icon/";

    return await fetch(channel_url, channels_options)
      .then(icon => icon.json())
      .then(icon => {
        let img = icon["data"];

        var image_data = img.split("data:image/png;base64,");
        var i = 0;
        image_data = image_data[1];

        console.log("Stripped Image: --- " + image_data);
        const cachedImagePath =
          RNFS.CachesDirectoryPath +
          `/NileMediaCatalogueImages` +
          "/" +
          id +
          ".png";

        const absolutePath =
          RNFS.CachesDirectoryPath + `/NileMediaCatalogueImages`;

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
  render() {
    const { item } = this.props;
    var cachedImageLocation =
      RNFS.CachesDirectoryPath +
      "/NileMediaCatalogueImages/" +
      item.programme_id +
      ".png";


      console.log("Image Location: " + cachedImageLocation)

      return (
        <View>
          <TouchableOpacity
            style={styles.item}
            key={item.programme_id}
            onPress={() => Actions.program({ programData: item })}>
            <Card>
{/*               <Image
                width={Dimensions.get("window").width / 2.3}
                source={{ 
                  uri: cachedImageLocation ||  'https://via.placeholder.com/150',
                  cache: 'only-if-cached',
                }}
                resizeMode="stretch"
                style={{
                  width: 50,
                
                  height: 145,
                  backgroundImage: 'https://via.placeholder.com/150'
                }}
                background={true}
              /> */}
            
              <ProgressiveImage 
               id={item.programme_id}
              /> 
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
                  minHeight: 30,
                  padding: 3,
                  width: "100%",
                  fontWeight: "normal",
                  backgroundColor: "#76b6c4",
                  textAlign: "center",
                  color: "white"
                }}>
                {item.name}
              </Text>
            </Card>
          </TouchableOpacity>
        </View>
      );
  }
}

const mapStateToProps = ({ apiReducer: { catalogue } }) => ({
  catalogue: catalogue
});



export default connect(
  mapStateToProps,
)(MasonryListItem);
