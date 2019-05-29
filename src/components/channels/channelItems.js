import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, FlatList, Image, Dimensions } from 'react-native';
const { width, height } = Dimensions.get("window");
import { styles } from './styles';
import { Actions } from 'react-native-router-flux';
import { AsyncStorage } from "react-native";
import { LoadingIndicator } from "../loadingIndicator/loadingIndicator";

import LinearGradient from 'react-native-linear-gradient';

import _ from "lodash";

export class ChannelItems extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showTheThing: false,
      images: []
    }
  }


  async  componentDidUpdate(prevProps) {
    if (this.props.list != prevProps.list) {



      const promises = this.props.list.map(item => {
        return this._getImage(item.id)

      })

      const results = await Promise.all(promises)
      this.setState({
        images: results
      })
    }
  }
  
  componentDidMount() {
  }

  async _getImage(id) {
    let AID = await AsyncStorage.getItem("aid");

    const options = {
      method: 'POST',
      body: "aid="+AID,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };

    const url = 'https://nile.rtst.co.za/api/artist/6/tokens';
    const token = await fetch(url, options).then(token_data => token_data.json())
      .then(token_data => {
        return token_data["data"];
      })
    const channels_options = {
      method: 'GET',
      headers: new Headers({
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    }

    const channel_url = 'https://nile.rtst.co.za/api/artist/6/channels/' + id + '/' + 'icon/';

    return await fetch(channel_url, channels_options)
      .then(icon => icon.json())
      .then(icon => {
        let img = icon["data"]

        return { id, img }
      })

  }


  renderItem = (data) => {

    return (

      <TouchableOpacity key={data.item.id} onPress={() => Actions.channel({ channelData: data.item })}>

        <LinearGradient
          colors={['#0F516C', '#76B6C4']}
          style={{ padding: 7, alignItems: 'center', borderRadius: 3, margin: 8 }}
          start={{x: 0, y: 0}} end={{x: 1, y: 0}}
          >
        <View style={{ width: '100%', height: 150, flexDirection: 'row' }}>
          <View style={{ width: '40%' }}>
            <Image
              resizeMode="stretch"
              style={{ width: 150, height: 150, position: 'absolute' }}
              source={{ uri: this.state.images.find(a => data.item.id === a.id) ? this.state.images.find(a => data.item.id === a.id).img : 'https://via.placeholder.com/150' }}
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
    console.log("After Rendering " + JSON.stringify(this.props))

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
              data={list.reverse()}
              numColumns={1}
              renderItem={item => this.renderItem(item)}
              keyExtractor={item => item.id.toString()}
            />}
        </View>

      );
    }
  }
}
