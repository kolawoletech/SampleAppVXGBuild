import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, FlatList, Image } from 'react-native';
import { styles } from './styles';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-material-cards'



export class ChannelLogos extends React.Component {



  renderItem = (data) => {
    return (
      <View style={{ width: '50%', height: '50%' }}>
        <TouchableOpacity style={styles.item}  >
          <Card>
            <CardImage
              resizeMode="cover"
              source={{ uri: data.item.uri }}
            />


          </Card>
        </TouchableOpacity>
      </View>
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

    if (this.props == "undefined") {
      return (
        <TouchableOpacity>
          <Text>LOADING!</Text>
        </TouchableOpacity>
      );
    } else {
      const { logo } = this.props;
      
      //console.log(this.props)
    


      return (


        <FlatList
          data={logo}
          horizontal={false}
          numColumns={2}
          renderItem={item => this.renderItem(item)}
          keyExtractor={item => item.id.toString()}
        />


      );
    }

  }
}

