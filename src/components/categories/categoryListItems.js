import React, { Component, PureComponent } from "react";
import {
  View,
  Text,
  FlatList,
  Dimensions
} from "react-native";
import { LoadingIndicator } from "../loadingIndicator/loadingIndicator";
import { connect } from "react-redux";
import { fetchCategoryItems } from "../../actions/api/actions";
import RNFS from "react-native-fs";
import ProgressiveImage from './ProgressiveImage'

 
import { styles } from "./styles";
import { Actions } from "react-native-router-flux";
import LinearGradient from "react-native-linear-gradient";

import Icon from "react-native-vector-icons/MaterialIcons";
import { Card, CardImage } from "react-native-material-cards";
import { AsyncStorage } from "react-native";
import { ScrollView, TouchableWithoutFeedback } from "react-native-gesture-handler";
import catalogue from "../catalogue/catalogue";
class CategoryListItems extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currently: "",

      showTheThing: false,
      images: [],
      facedown: this.props.orientation,
      savedLocally: [],
      savedOnline: [],
      isImageSavedLocally: ""
    };
    //this.checkForNewUpdates();


  }

  async componentDidMount() {
    //await this.loadCategoryItem()
    this.props.loadCategoryItem();
    await this.checkForNewUpdates();

  }

  async componentWillMount() {
  }

  async checkForNewUpdates() {
    try {
      let sub = this.props.categoryItems;
      let result = sub
        .map(({ programme_id }) => programme_id)
        .join(",");

      var array = result.split(",");

      this.setState({
        savedOnline: array
      });
/* 
      console.log(
        "checkForNewUpdates Saved Online State" +
          this.state.savedOnline +
          "checkForNewUpdates Saved Online Actual array: " +
          array
      ); */

      const cachedImageFolder = RNFS.CachesDirectoryPath + `/NileMediaCatalogueImages` + "/";
      RNFS.exists(cachedImageFolder).then(async exists => {
        if (exists === "true" ) {
          RNFS.readDir(cachedImageFolder) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
            .then(async (result) => {
              var arr = [];
              for (i = 0; i <= result.length; i++) {
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
            })
            .then(async () => {
              if (this.arraysEqual(this.state.savedLocally, array)) {
              } else {
         
                let path = RNFS.CachesDirectoryPath + `/NileMediaCatalogueImages` + "/";
                RNFS.unlink(path).then(async () => {
                  const promises = this.props.sub.map(item => {
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
          const promises = this.props.categoryItems.map(async item => {
            return this._getImageUpdate(item.programme_id);
          });

          const results = await Promise.all(promises);
          this.setState({
            images: results
          });
        }
      });
    } catch (error) {
    }
  }

  async componentDidUpdate(prevProps) {
    if (this.props.data != prevProps.data) {
  const promises = this.props.data.map(item => {
    return this._getImageUpdate(item.programme_id);
  });

  const results = await Promise.all(promises);
  this.setState({
    images: results
  });
} 
}

  arraysEqual = (a, b) => {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length != b.length) return false;


    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  };


  async _getImage(id) {

    let savedLocally = this.state.savedLocally;
    let savedOnline = this.state.savedOnline;

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

    const channel_url = "https://nile.rtst.co.za/api/artist/6/programs/" + id + "/" + "icon/";

    return await fetch(channel_url, channels_options)
      .then(icon => icon.json())
      .then(icon => {
        let img = icon["data"];

        var image_data = img.split("data:image/png;base64,");
        var i = 0;
        image_data = image_data[1];

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

  renderItem = data => {
    var check = this.props.cat.toString();
    var categoryType = data.item.categories.toString();

    this.setState({
      currently: check
    });

    var cachedImageLocation =
      RNFS.CachesDirectoryPath +
      "/NileMediaCatalogueImages/" +
      data.item.programme_id +
      ".png";

    return (
      <View>
        { (categoryType.split(' ').join('').trim().includes(check.split(' ').join('').trim()) )  ?  (
          <TouchableWithoutFeedback
            style={styles.item}
            key={data.item.programme_id}
            onPress={() => Actions.program({ programData: data.item })}>
            <Card>
              <ProgressiveImage 
                id={data.item.programme_id}
              /> 
              <Icon
                color="white"
                style={{ position: "absolute", left: 10 }}
                name="cloud-download"
                size={29}
                color="white"
              />
              <Text
                numberOfLines={1}
                style={{
                  fontSize: 19,
                  padding: 3,
                  fontWeight: 'bold',
                  width:   Dimensions.get('window').width/2.3,
                  backgroundColor: "#76b6c4",
                  textAlign: "center",
                  color: "white"
                }}
              >
                {data.item.name}
              </Text>
            </Card>
          </TouchableWithoutFeedback>
        ) : null }
      </View>
    );
  };

  render() {
    const { categoryItems: data } = this.props;

    return (
      <View>
        <Text />
        <ScrollView
          ref={ref => {
            this.scrollView = ref;
          }}>
          <FlatList
            horizontal={true}
            data={data}
            renderItem={item => this.renderItem(item)}
            keyExtractor={item => item.programme_id.toString()}
          />
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = ({
  apiReducer: { categories, categoryItems, currentCategory }
}) => ({
  categories: categories,
  categoryItems: categoryItems,
  currentCategory: currentCategory
});

const mapDispatchToProps = {
  loadCategoryItem: fetchCategoryItems
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryListItems);
