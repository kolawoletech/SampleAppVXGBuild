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
      this.state={
        items: []
      }
  

    }
  
    componentDidMount() {
     
      console.log("Did Mount" + JSON.stringify(this.props))
    }

    async componentDidUpdate(prevProps) {

    if (this.props.items != prevProps.items) {
      const promises = this.props.items.map(item => {
        return item;
      });

      const results = await Promise.all(promises)
  
      this.setState({
        items: results
      });

    }
    }

    componentWillMount() {
   
    }


    renderItem = data => {
        var categoryType = this.props.categoryType;

        var cachedImageLocation =
          RNFS.CachesDirectoryPath +
          "/NileMediaCatalogueImages/" +
          data.item.programme_id +
          ".png";

          var check = data.item.categories;
          //console.log("PLease Check:  " + check)
    
        return (
        
          <View style={{ height: "50%"}}>
             {check.indexOf(categoryType) !== -1   ? 
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
        const { items : data} = this.props;

        return (
        <View >
          <FlatList
            inverted
            horizontal={true}
            removeClippedSubviews={true}
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
  