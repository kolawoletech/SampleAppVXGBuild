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
import LinearGradient from "react-native-linear-gradient";
import CategoryListItems from "./categoryListItems";
//import CategoryList from '../../components/categoryList'

import {
  fetchCategories,
  fetchCategoryItems,
  sendCategoryMetadata
} from "../../actions/api/actions";
import { connect } from "react-redux";
import { ScrollView } from "react-native-gesture-handler";

export class CategoryItems extends PureComponent {
  constructor(props) {
    super(props);
  }

  getCategories(cat) {
    const { list: jap } = this.props;
    this.props.onFetchCurrentCategory(cat);

    return <CategoryListItems data={jap} cat={cat} />;
  }

  renderItem2 = data => {
    return (
      <TouchableWithoutFeedback key={data.item}>
          <ScrollView
            ref={ref => {
              this.scrollView = ref;
            }}>
              <View
                style={{
                  width: "100%",
                  flex: 1,
                  backgroundColor: "rgba(0, 0, 0, 0)"
                }}>
                <Text
                  style={{
                    color: "white",
                    fontSize: 20,
                    marginTop: 1,
                    marginBottom: 0,
                    fontSize: 21,
                    fontWeight: "bold",
                    alignItems: 'flex-start',
                    justifyContent:'flex-start'
                  }}>
                  {data.item}
                </Text>
              </View>
              <View>{this.getCategories(data.item)}</View>

            

          </ScrollView>
      </TouchableWithoutFeedback>
    );
  };

  render() {
    const { list } = this.props;

    return (
      <FlatList
        removeClippedSubviews={false}
        pagingEnabled
        directionalLockEnabled
        data={list}
        renderItem={item => this.renderItem2(item)}
        keyExtractor={item => item.toString()}
        style={{ marginTop: 0}}
      />
    );
  }
}
