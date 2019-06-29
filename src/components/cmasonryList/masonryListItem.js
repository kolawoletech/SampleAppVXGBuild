import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  FlatList,
  Button,
  ScrollView,
  Dimensions
} from "react-native";
import Image from 'react-native-scalable-image';
import { PureComponent } from 'react';

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

export default class MasonryListItem extends PureComponent {
    componentDidMount() {
        console.warn('mount cell');
    }

    componentWillUnmount() {
        console.warn('unmount cell');
    }

    render() {
        const { item } = this.props;
        var cachedImageLocation =
        RNFS.CachesDirectoryPath +
        "/NileMediaCatalogueImages/" +
        item.programme_id +
        ".png";
        return (
            <View
            style={[
                stylesIn.cell,
                { height: item.height, backgroundColor: item.color },
            ]}
            >
           <Text>{item.name}</Text>
           <CardImage
                  resizeMode="contain"
                  style={{
                    backgroundColor: "transparent"
                  }}
                  source={{ uri: cachedImageLocation }}
                />
            </View>
        );
    }
}

const stylesIn = StyleSheet.create({
    cell: {
      margin: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
});