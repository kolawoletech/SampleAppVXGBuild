import React, { Component, PureComponent } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  FlatList,
  Dimensions
} from "react-native";
import { LoadingIndicator } from "../loadingIndicator/loadingIndicator";

export class CategoryItems extends PureComponent {
    constructor(props) {
      super(props);
  

    }
  
    async componentDidMount() {
   
  
    }


  
    renderItem = data => {

  
      return (
        <View style={{ width: "50%"}}>
          <Text>{data}S</Text>
        </View>
      );
    };
  
    render() {
  
      if (this.props.list.length== 0 ) {
        return (
          <TouchableOpacity>
              <LoadingIndicator color="#000" size="large"/>
          </TouchableOpacity>
        );
      } else  {
        const { list } = this.props;

        console.log("LIste: " + JSON.stringify(this.props))
        const items = this.props.list.map((item) => {

          return (
           
              <Text
              data={list}
              key={item}
         
        
              style={{
                  flexGrow: 0,
                  flex: 1,
                  width: '100%'
              }}
              >{item}</Text>
            
          
          )
        });


        return (
          <View
          style={{
            flex: 1,
            width: '100%', 
            color: '#000',
            
        }}>
            <Text
            style={{
              flex: 1,
              width: '100%',
              color: '#000',
              
              
          }}
            data={list}
            
            numColumns={2}
          
            >{items}</Text>
          </View>
        
        )
  
      }
    }
  }
  