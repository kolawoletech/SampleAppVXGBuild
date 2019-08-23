import React, { Component } from "react";
import { Actions } from "react-native-router-flux";
import { ScrollView, View, Text, TouchableHighlight, Button, TouchableOpacity, Image} from 'react-native';
import { StyleSheet, Dimensions } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';

export class Menu extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: "channels", title: "First" },
      { key: "catalogue", title: "Second" },
      { key: "media", title: "Third" }
    ]
  };

  render() {
    return (
   
        <View style={styles.container}>
          <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Icon
              name="event"
              size={29}
              color="#0f516c"

            />
            <Button
              color="#fff"
              title="Catalogue"
              onPress={() => {
                Actions.categories();
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity 
           style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Icon
              name="live-tv"
              size={29}
              color="#0f516c"
              
             
            />
            <Button
              color="#fff"

              title="Channels"
              onPress={() => {
                Actions.channels();
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
           style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Icon
              name="event"
              size={29}
              color="#0f516c"

             
            />
            <Button
              color="#fff"
              title="Playlist"
              onPress={() => {
                Actions.media();
              }}
            />
          </TouchableOpacity>

        </View>
  
    );
  }
}


const styles = StyleSheet.create({
    container: {
        textAlign: 'center', // <-- the magic
        backgroundColor:  '#00000070',

        padding: 4,
        margin: 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: 'rgba(21, 21, 21, 0.5)',

    }
});
