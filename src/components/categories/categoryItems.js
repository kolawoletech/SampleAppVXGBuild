import React, { Component, PureComponent } from "react";
import {
  View,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Text,
  FlatList,
  Dimensions
} from "react-native";
import { LoadingIndicator } from "../loadingIndicator/loadingIndicator";
import LinearGradient from 'react-native-linear-gradient';
import CategoryListItems from './categoryListItems'
//import CategoryList from '../../components/categoryList'

import { fetchCategories, fetchCategoryItems, sendCategoryMetadata  } from "../../actions/api/actions";
import { connect } from "react-redux";
import { ScrollView } from "react-native-gesture-handler";

export class CategoryItems extends PureComponent {
    constructor(props) {
      super(props);
  

    }
  


    getCategories(cat){
      const { list :jap } = this.props;
      this.props.onFetchCurrentCategory(cat);

      return (
       
          <CategoryListItems data={jap} cat={cat} /> 
   
      )
    }


    renderItem2 = (data) => {
      return (

        <TouchableWithoutFeedback key={data.item} >
          
          <LinearGradient
            colors={['#000000', '#323232']}
            style={{ padding: 7, alignItems: 'center', borderRadius: 7, margin: 8 }}
            start={{x: 0, y: 0}} end={{x: 1, y: 0}}>
              <ScrollView  ref={(ref) => { this.scrollView = ref; }} >
          <View style={{ width: '100%' }}>
     
  
            <View style={{width: '100%', flex: 1, backgroundColor: 'rgba(0, 0, 0, 0)' }}>
              <Text style={{ color: 'white', fontSize: 20, margin: 6, fontSize: 21, fontWeight: 'bold'}}>{data.item}</Text>
            </View>
           
          </View>
         
            <View >
              {this.getCategories(data.item)}
            </View>
            </ScrollView>
          </LinearGradient>
         
        </TouchableWithoutFeedback>
  
      );
  
    }

  
    render() {

        const { list } = this.props;

        return (

          <FlatList
          showsHorizontalScrollIndicator={false}
          removeClippedSubviews={false}
          pagingEnabled
          directionalLockEnabled
          data={list}
          renderItem={item => this.renderItem2(item)}
          keyExtractor={item => item.toString()}
          //numColumns={2}
          style={{
         
          }}
          />
  
        );
      
    }
  }
  