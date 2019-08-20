import React, { Component, PureComponent } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  Text,
  FlatList,
  Dimensions
} from "react-native";
import { LoadingIndicator } from "../loadingIndicator/loadingIndicator";

import RNFS from "react-native-fs";

//import ProgressiveImage from './ProgressiveImage'

import { styles } from "./styles";
import { Actions } from "react-native-router-flux";
import LinearGradient from "react-native-linear-gradient";

import Icon from "react-native-vector-icons/MaterialIcons";
import { Card, CardImage } from "react-native-material-cards";
import { AsyncStorage } from "react-native";
export class CategoryListItems extends PureComponent {
    constructor(props) {
      super(props);
  

    }
  
    async componentDidMount() {
   
  
    }

    getCategories(cat){
      console.log(cat)
      const {onLoadItem } = this.props;
      console.log("Say what:  " + onLoadItem)
      

      return(
        <View>
          <Text
            style={{
              color: "#ffffff"
            }}>{cat}</Text>
        </View>
      )
    }

    renderItem = data => {

      var check = this.props.cat;


      console.log("FOR CATEGORY IN DD: " + JSON.stringify(this.props.sub))


        var cachedImageLocation =
          RNFS.CachesDirectoryPath +
          "/NileMediaCatalogueImages/" +
          data.item.programme_id +
          ".png";
    
        return (
          <View style={{ height: "50%"}}>
             {check.indexOf(data.item.categories) !== -1   ? 
            <TouchableOpacity
              style={styles.item}
              key={data.item.programme_id}
              onPress={() => Actions.program({ programData: data.item })}>
              <Card>

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
                  {data.item.name}
                </Text>
              </Card>
            </TouchableOpacity>
             : null}
          </View>
        );
      };

  
    render() {
        const { categoryItems : data} = this.props
        return (
        <View >
          <Text></Text>
          <FlatList
              horizontal={true}

              listKey={item => item.programme_id.toString()}
              data={data}
              renderItem={item => this.renderItem(item)}
              keyExtractor={item => item.programme_id.toString()}
              //numColumns={2}
              style={{
              flexGrow: 0,
              height: '100%'
              }}
          />
            
        </View>
        );
      
    }
  }
  