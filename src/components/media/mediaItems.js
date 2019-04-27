import React, { Component } from 'react';
import { View, TouchableOpacity, Text, Alert, StyleSheet, FlatList, Button, ScrollView } from 'react-native';
import { FileSystem } from 'expo';

import { styles } from './styles';
//import { Ionicons } from '@expo/vector-icons'
export class MediaItems extends React.Component {





  renderItem = (data) => {
    const { onPressItem } = this.props;
    const { _onPressDelete} = this.props;

    return (
      <TouchableOpacity  onPress={() => onPressItem(data.item.uri)} style={styles.item} key={data.item.name} >
 
        <Text
          style={styles.textTitle}
          color='white'
        >{data.item.name}</Text>
        {/* <Ionicons onPress={() => _onPressDelete(data.item.uri)} name="ios-trash" size={32} color="#d11a2a" /> */}
   

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

    //console.log("This is Media Items" + JSON.stringify(this.props))
    const { list } = this.props;



    return (
      <ScrollView>
        <FlatList
          data={list}
          horizontal={false}
          renderItem={item => this.renderItem(item)}
          keyExtractor={item => item.name.toString()}
        />
      </ScrollView>

    );

  }
}
