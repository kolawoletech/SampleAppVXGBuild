import React, { Component, PureComponent } from "react";
import {
  View,
  Button,
  Image,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
  StyleSheet
} from "react-native";
import { connect } from "react-redux";
import _ from "lodash";
import faker from 'faker';
import { RecyclerListView, DataProvider, LayoutProvider } from 'recyclerlistview';
const SCREEN_WIDTH = Dimensions.get('window').width;
import { AsyncStorage } from "react-native";
import {CategoryListItems }from './categoryListItems';

import {  fetchCategoryItems } from "../../actions/api/actions";

class CategoryList extends Component {
    constructor(props) {
      super(props);  
    }

    async getCategoriesWithAID(){

    }
    
  
    async componentDidMount() {
    }
  
    async componentWillMount() {  
    }
  
    render() {

      const { categoryItems: dat } = this.props;



      console.log("Current Categories Props" + JSON.stringify(this.props))


       
        return (
          <View style={styles.container}>
           
            <CategoryListItems items = {dat}  />
    
          </View>
        );
      
    }
  }
  
  const mapStateToProps = ({ apiReducer: { categories , categoryItems} }) => ({
    categoryItems: categoryItems
  });
  
  const mapDispatchToProps = {
    loadCategoryItems: fetchCategoryItems
  };
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(CategoryList);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFF',
      minHeight: 1,
      minWidth: 1,
    },
    body: {
      marginLeft: 10,
      marginRight: 10,
      maxWidth: SCREEN_WIDTH - (80 + 10 + 20),
    },
    image: {
      height: 275,
      width: 183,
    },
    name: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    description: {
      fontSize: 14,
      opacity: 0.5,
    },
    listItem: {
      flexDirection: 'row',
      margin: 10,
    },
  });