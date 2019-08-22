import React, { Component , PureComponent} from "react";

import Image from "react-native-scalable-image";
import RNFS, { completeHandlerIOS } from "react-native-fs";
import {
  View,
  Dimensions,

  Text
} from "react-native";
import shorthash from 'shorthash'

export default class ProgressiveImage extends PureComponent {

  state = {
    source : null
  }

  constructor(props){
    super(props)
  }

  componentDidMount= async () => {
    const {id} = this.props;
    //const {programme_id} = this.props;
    const pid = shorthash.unique(id)
    const cachedImageFolder = await  `${RNFS.CachesDirectoryPath}` + `/NileMediaCatalogueImages` + `/` +`${id}`+ `.`+`png`;
    if (RNFS.exists(cachedImageFolder)){
      this.setState({
        source : cachedImageFolder

      })

      console.log("Current State" + JSON.stringify(this.state.source))

      return;
    } else {
      console.log("Does Not Exists: ")
    }
    
  }

  render(){
    const {id} = this.props;

       const cachedImageFolder =  `${RNFS.CachesDirectoryPath}` + `/NileMediaCatalogueImages` + `/` +`${id}`+ `.`+`png`;

    return (
      <View>
        <Image
          width={Dimensions.get('window').width/2.3} 

          source = {{
            uri: cachedImageFolder
          }}
        
           
          resizeMode="stretch"
          style={{
            width: 50,
          
            height: 145,
            
          }}
        />
      </View>
    )
  }
}