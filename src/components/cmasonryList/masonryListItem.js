import React, { Component, PureComponent } from 'react';
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
//import ProgressiveImage from './p'

import RNFS from "react-native-fs";


import { styles } from "./styles";
import { Actions } from "react-native-router-flux";
import { LoadingIndicator } from "../loadingIndicator/loadingIndicator";
import LinearGradient from "react-native-linear-gradient";

import Icon from "react-native-vector-icons/MaterialIcons";
import { Card, CardImage } from "react-native-material-cards";
import { AsyncStorage } from "react-native";
let { width, height } = Dimensions.get("window");

export default class MasonryListItem extends PureComponent {
    componentDidMount() {
        console.warn('mount cell');
        console.log(RNFS.CachesDirectoryPath);

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
            <View>
                <TouchableOpacity
                    style={styles.item}>
                    <Card>
                        <Image
                            width={Dimensions.get('window').width/2.3} 
                            source={{ uri: cachedImageLocation }}
                            resizeMode="stretch"
                        />
                   
       {/*             <ProgressiveImage
                            thumbnailSource={{ uri: cachedImageLocation }}
                            imageSource={{ uri: cachedImageLocation }}
                            style={{ flex: 1, alignItems: 'stretch' }}
                        /> */}

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
