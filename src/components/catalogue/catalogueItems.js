import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  FlatList,
  Button,
  Image,  Dimensions
} from "react-native";
import { styles } from "./styles";
import { Actions } from "react-native-router-flux";
import { LoadingIndicator } from "../loadingIndicator/loadingIndicator";
import LinearGradient from "react-native-linear-gradient";

import Icon from "react-native-vector-icons/MaterialIcons";
import {
  Card,
  CardImage
} from "react-native-material-cards";
import { AsyncStorage } from "react-native";

export class CatalogueItems extends React.Component {
  constructor(props) {
    super(props);
    //this._onLayout= this._onLayout.bind(this);
    console.log(
      "THESE ARE THE PROPS IN CONSTRUCT~OR" +
        JSON.stringify(this.props.orientation)
    );
    this.state = {
      showTheThing: false,
      images: [],
      facedown : this.props.orientation
    };
  }

  componentDidMount() {
    //console.log(this.props)
    console.log(
      "THESE ARE THE PROPS THAT DID MOUNT" +
        JSON.stringify(this.props.orientation)
    );
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.orientation!= nextProps.orientation){
        console.log("Reload Compent")
        this.forceUpdate();

    }  
  }


  async componentDidUpdate(prevProps) {
    if (this.props.list != prevProps.list) {
      const promises = this.props.list.map(item => {
        return this._getImage(item.programme_id);
      });

      const results = await Promise.all(promises);
      this.setState({
        images: results
      });
    }

    if (this.props.orientation!= prevProps.orientation){
        console.log("Reload Compent")

        //const results = await Promise.all(promises);
      
        setTimeout(  
          this.setState({
            facedown: this.props.orientation
          }),
           3000);


        this.forceUpdate();

    }
  }

  async _getImage(id) {
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
        //console.log("This is TOKEN from STORE "+ token_data["data"]);

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

        //console.log(id, img)
        return { id, img };
      });
  }
  renderItem = data => {
    return (
      <View style={{ width: "50%", height: "50%" }}>
        <TouchableOpacity
          style={styles.item}
          key={data.item.programme_id}
          onPress={() => Actions.program({ programData: data.item })}
        >
          <Card>
            <CardImage
              source={{
                uri: this.state.images.find(
                  a => data.item.programme_id === a.id
                )
                  ? this.state.images.find(a => data.item.programme_id === a.id)
                      .img
                  : "https://newbietech.com.ng/placeholder-nile-logo-150.png"
              }}
              resizeMode="stretch"
              style={{
                width: "100%",
                height: "80%",
                backgroundColor: "transparent",
                maxHeight: 83,
                minHeight: 83
              }}
            />
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
              style={{ position: "absolute", top: 10, left: 10 }}
              name="cloud-download"
              size={22}
              color="white"
            />

            <Text
              numberOfLines={2}
              style={{
                fontSize: 14,
                height: "20%",
                width: "100%",
                fontWeight: "normal",
                backgroundColor: "#76b6c4",
                textAlign: "center",
                color: "white",
                maxHeight: 22,
                minHeight: 22
              }}
            >
              {data.item.name}
            </Text>
          </Card>
        </TouchableOpacity>
      </View>
    );
  };

  renderItemInLandscape = data => {
    return (
      <View style={{ width: "50%", height: "50%" }}>
        <TouchableOpacity
          style={styles.item}
          key={data.item.programme_id}
          onPress={() => Actions.program({ programData: data.item })}
        >
          <Card>
            <CardImage
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
                width: "100%",
                height: "80%",
                backgroundColor: "transparent"
              
              }}
            />
            <Icon
              size={22}
              color="white"
              style={{ position: "absolute", top: 10, left: 10 }}
              name="cloud-download"
              size={22}
              color="white"
            />

            <Text
              numberOfLines={2}
              style={{
                fontSize: 14,
                height: "20%",
                width: "100%",
                fontWeight: "normal",
                backgroundColor: "#76b6c4",
                textAlign: "center",
                color: "white",
                maxHeight: 22,
                minHeight: 22
              }}
            >
              Landscape{data.item.name}
            </Text>
          </Card>
        </TouchableOpacity>
      </View>
    );
  };

  onLayout(e) {
    this.setState({
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
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
    } else if (this.state.facedown == 'portrait' ) {
      const { list } = this.props;
      const { orientation } = this.props;

      return (
        <View onLayout={this._onLayout}>       
            <FlatList
              data={list}
              renderItem={item => this.renderItem(item)}
              keyExtractor={item => item.programme_id.toString()}
              numColumns={2}
            />
        </View>
      );
    } else if (this.state.facedown== 'landscape' ){
      const { list } = this.props;
      const { orientation } = this.props;

      return (
        <View onLayout={this._onLayout}>
            <FlatList
              data={list}
              renderItem={item => this.renderItemInLandscape(item)}
              keyExtractor={item => item.programme_id.toString()}
              numColumns={2}
            /> 
        </View>
      );
    } else{
        <Text>Breakdown</Text>
    }
  }
}
