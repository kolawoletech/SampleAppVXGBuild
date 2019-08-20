import React, { Component, PureComponent } from "react";
import {
  View,
  TouchableOpacity,
  TouchableHighlight,
  Text,
  FlatList,
  Dimensions
} from "react-native";
import { LoadingIndicator } from "../loadingIndicator/loadingIndicator";
import LinearGradient from 'react-native-linear-gradient';
import { CategoryListItems } from './categoryListItems'
//import CategoryList from '../../components/categoryList'
export class CategoryItems extends Component {
    constructor(props) {
      super(props);
  

    }
  
    async componentDidMount() {
   
  
    }

    getCategories(cat){
      const { sub: mdata } = this.props;
      

      this.props.onFetchCurrentCategory(cat);

      return (
        <CategoryListItems data={mdata} cat={cat} /> 

      )

     
    }


    renderItem2 = (data) => {
      var catName = data.item


      return (

  
        <TouchableOpacity key={data.item} >
  
          <LinearGradient
            colors={['#000000', '#323232']}
            style={{ padding: 7, alignItems: 'center', borderRadius: 7, margin: 8 }}
            start={{x: 0, y: 0}} end={{x: 1, y: 0}}>
          <View style={{ width: '100%',  flexDirection: 'row' }}>
     
  
            <View style={{width: '100%', flex: 1, backgroundColor: 'rgba(0, 0, 0, 0)', alignItems: 'flex-start' }}>
              <Text style={{ color: 'white', fontSize: 20, margin: 6, fontSize: 21, fontWeight: 'bold'}}>{data.item}</Text>
            </View>
           
          </View>
          <View style={{width: '100%',flexDirection: 'row' , flex: 1, backgroundColor: 'rgba(0, 0, 0, 0)', alignItems: 'flex-start' }}>


            </View>
            <View style={{width: '100%',flexDirection: 'row' , flex: 1, backgroundColor: 'rgba(0, 0, 0, 0)', alignItems: 'flex-start' }}>
              {this.getCategories(data.item)}

            </View>
          </LinearGradient>
        </TouchableOpacity>
  
      );
  
    }

  
    render() {
      console.log("Getting Swamp" + JSON.stringify(this.props))

      if (this.props.list.length== 0 ) {
        return (
          <TouchableOpacity>
              <LoadingIndicator color="#000" size="large"/>
          </TouchableOpacity>
        );
      } else  {
        const { list } = this.props;
        console.log("SO HEAVY" + JSON.stringify(this.props))
        return (
        <View >
        {this.props.list.length > 0 &&
          <FlatList
            data={list}
            numColumns={1}
            renderItem={item => this.renderItem2(item)}
            keyExtractor={item => item.toString()}
          />}
        </View>
        );
      }
    }
  }
  