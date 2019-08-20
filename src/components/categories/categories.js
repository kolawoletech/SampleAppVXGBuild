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
import faker from "faker";
import {
  RecyclerListView,
  DataProvider,
  LayoutProvider
} from "recyclerlistview";
const SCREEN_WIDTH = Dimensions.get("window").width;
import { AsyncStorage } from "react-native";

import {
  fetchCategories,
  fetchCategoryItems,
  sendCategoryMetadata
} from "../../actions/api/actions";
import { CategoryItems } from "./categoryItems";

class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: ""
    };
  }

  async getCategoriesWithAID() {
    let TOKENID = await AsyncStorage.getItem("sessionTokenID");
    let AID = await AsyncStorage.getItem("aid");
    this.props.registerWithAID(AID, TOKENID);
  }

  async componentDidMount() {
    await this.props.loadCategories();
    await this.props.loadCategoryItem();
  }



  render() {
    const { categories: data } = this.props;
    const { categoryItems: subData } = this.props;
    const { onfetchCategoryItems } = this.props.loadCategoryItem;

    console.log("Current Categories Props" + JSON.stringify(this.props));

    return (
      <View style={styles.container}>
        <CategoryItems
          list={data}
          sub={subData}
          onFetchItems={this.props.loadCategoryItem}
          onFetchCurrentCategory={this.props.getCurrentCategory}
        />
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
  loadCategories: fetchCategories,
  loadCategoryItem: fetchCategoryItems,
  getCurrentCategory: sendCategoryMetadata
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Categories);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    minHeight: 1,
    minWidth: 1
  },
  body: {
    marginLeft: 10,
    marginRight: 10,
    maxWidth: SCREEN_WIDTH - (80 + 10 + 20)
  },
  image: {
    height: 275,
    width: 183
  },
  name: {
    fontSize: 20,
    fontWeight: "bold"
  },
  description: {
    fontSize: 14,
    opacity: 0.5
  },
  listItem: {
    flexDirection: "row",
    margin: 10
  }
});
