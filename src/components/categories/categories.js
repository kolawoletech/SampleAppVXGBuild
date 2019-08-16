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

import { fetchCategories } from "../../actions/api/actions";
import { CategoryItems } from './categoryItems'

class Categories extends Component {
    constructor(props) {
      super(props);
      this.state = {
        categories: ""
      };

      const fakeData = [];
      for(i = 0; i < 100; i+= 1) {
        fakeData.push({
          type: 'NORMAL',
          item: {
            id: i,
            image: faker.image.avatar(),
            name: faker.name.firstName(),
            description: faker.random.words(5),
          },
        });
      }
     
  
      this.layoutProvider = new LayoutProvider((i) => {
        return this.state.list.getDataForIndex(i).type;
      }, (type, dim) => {
        switch (type) {
          case 'NORMAL': 
            dim.width = SCREEN_WIDTH;
            dim.height = 278;
            break;
          default: 
            dim.width = 0;
            dim.height = 0;
            break;
        };
      })
     
    }

    async getCategoriesWithAID(){
        let TOKENID = await AsyncStorage.getItem("sessionTokenID");
        let AID = await AsyncStorage.getItem("aid");
        this.props.registerWithAID(AID, TOKENID)
      }
    
  
    async componentDidMount() {

    
    }
  
    async componentWillMount() {

      await this.props.loadCategories()

  
    }

    rowRenderer = (type, data) => {
        const { image, name, description } = data.item;
        return (
          <View style={styles.listItem}>
            <Image style={styles.image} source={{ uri: image }} />
            <View style={styles.body}>
              <Text style={styles.name}>{name}</Text>
              <Text style={styles.description}>{description}</Text>
              
            </View>
          </View>
        )
      }

  
    render() {
      const { categories: data } = this.props;


      console.log("Current Categories Props" + JSON.stringify(this.props))


       
        return (
          <View style={styles.container}>
           
            <CategoryItems list={data} />
    
          </View>
        );
      
    }
  }
  
  const mapStateToProps = ({ apiReducer: { categories } }) => ({
    categories: categories
  });
  
  const mapDispatchToProps = {
    loadCategories: fetchCategories  
  };
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Categories);

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