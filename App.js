import React, { Component } from 'react';
import Routes from './src/components/routes';
var SQLite = require('react-native-sqlite-storage')

class App extends Component {
  render() {
    return <Routes />;
  }
}

export default App;