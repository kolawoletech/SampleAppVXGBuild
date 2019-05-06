import React, { Component } from 'react';
import { View, TouchableOpacity, Text, Alert, StyleSheet, FlatList, Button, ScrollView } from 'react-native';

import { styles } from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
export class MediaItems extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      getTheMetaData: false,
      metadata: []
    }
  }

  async  componentDidUpdate(prevProps) {
    if (this.props.list != prevProps.list) {

      console.log("Change In Video Prop")


      const promises = this.props.list.map(item => {
        return this._getMetadata(item._id)

      })

      const results = await Promise.all(promises)
      this.setState({
        metadata: results
      })
    }
  }

  componentDidMount() {
  }

  async _getMetadata(id) {
    const options = {
      method: 'POST',
      body: "aid=c90bf2be-459b-46bd-9ac5-0693f07d54ac",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };

    const url = 'https://nile.rtst.co.za/api/artist/6/tokens';
    const token = await fetch(url, options).then(token_data => token_data.json())
    .then(token_data => {
      return token_data["data"];
    })

    const programs_options = {
      method: "GET",
      headers: new Headers({
        Authorization: "Bearer " + token,
        "Content-Type": "application/x-www-form-urlencoded"
      })
    };

    const programs_url = "https://nile.rtst.co.za/api/artist/6/programs/" + id  + "/";

    return await fetch(programs_url, programs_options)
      .then(details=> details.json())
      .then(details => {
        let metdat = details["data"]

        return { id, metdat }
    })

  }

  renderItem = (data) => {

    const { onPressItem } = this.props;
    const { _onPressDelete } = this.props;

    console.log("These are the `metaData details" + JSON.stringify(this.state.metadata))

    return (
      <TouchableOpacity  onPress={() => onPressItem(data.item.uri)} style={styles.item} key={data.item.name} >
 
        <Text
          style={styles.textTitle}
          color='white'
        >{data.item._id}</Text>
        <Text
          style={styles.textTitle}
          color='white'
        >{this.state.metadata.find(a => data.item._id === a.id) ?this.state.metadata.find(a => data.item._id === a.id).metdat.name : "Unknown"  }</Text>
        <Text
          style={styles.textTitle}
          color='white'
        >{this.state.metadata.find(a => data.item._id === a.id) ?this.state.metadata.find(a => data.item._id === a.id).metdat.description : "Unknown"  }</Text>
       
        
        {/* <Icon onPress={() => _onPressDelete(data.item.uri)} name="ios-trash" size={32} color="#d11a2a" /> */}
   

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

    const { list } = this.props;

    console.log("Current Statte In Render " + JSON.stringify(this.state))

    return (
      <ScrollView>
        {this.state.metadata.length > 0 &&
        <FlatList
          data={list}
          horizontal={false}
          renderItem={item => this.renderItem(item)}
          keyExtractor={item => item._id.toString()}
        />
        }
      </ScrollView>

    );

  }
}
