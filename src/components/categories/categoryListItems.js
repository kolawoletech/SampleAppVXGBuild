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
import { connect } from "react-redux";
import {
  fetchCategoryItems,
} from "../../actions/api/actions";
import RNFS from "react-native-fs";

//import ProgressiveImage from './ProgressiveImage'

import { styles } from "./styles";
import { Actions } from "react-native-router-flux";
import LinearGradient from "react-native-linear-gradient";

import Icon from "react-native-vector-icons/MaterialIcons";
import { Card, CardImage } from "react-native-material-cards";
import { AsyncStorage } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
class CategoryListItems extends PureComponent {
  constructor(props) {
    super(props);
    this.state={
      currently: ""
    };
  }

 componentDidMount() {
    //await this.loadCategoryItem()
    this.props.loadCategoryItem()

  

  }

  omponentWillMount() {
    setTimeout(() => {
      this.scrollView.scrollToEnd();
    });
  }

  renderItem = data => {
    var check = this.props.cat.toString();
    var categoryType = data.item.categories.toString()
    console.log("Filter: " + check + "" + categoryType);
    
   this.setState({
     currently: check
   });

    var cachedImageLocation =
      RNFS.CachesDirectoryPath +
      "/NileMediaCatalogueImages/" +
      data.item.programme_id +
      ".png";

    return (
      <View style={{ height: "10%" }}>
        {categoryType.trim().indexOf(check.trim())  >= -1 ? (
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
        ) : null}
      </View>
    );
  };



  render() {
    const { categoryItems: data } = this.props;
    console.log("In a minute: " + JSON.stringify(this.props));

    return (
      <View>
        <Text />
        <ScrollView ref={(ref) => { this.scrollView = ref; }}>
          <FlatList
            horizontal={true}
            data={data}
            renderItem={item => this.renderItem(item)}
            keyExtractor={item => item.programme_id.toString()}
            //numColumns={2}
          
          />
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = ({
  apiReducer: { categories, categoryItems, currentCategory }
}) => ({
  categories: categories,
  categoryItems: categoryItems,
  currentCategory: currentCategory
});

const mapDispatchToProps = {
  loadCategoryItem: fetchCategoryItems,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryListItems);
