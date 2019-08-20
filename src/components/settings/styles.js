import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  channelContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 50,
    justifyContent: 'space-around',
  },
  container: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor:'#323232'
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 50
  },
  marginBox: {
    margin: 10
  },
  title: {
    fontSize: 24,
    margin: 20
  },
  item: {
    backgroundColor: '#0f516c',
    padding: 15,
    margin: 10,
    marginBottom: 5
  },
  text: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
    
  },
  title: {
    fontSize: 21,
    color: '#fff',
    minHeight: 26,
    maxHeight: 26,
    paddingLeft:9,
    fontWeight:'bold'
  },
  entry: {
    minHeight: 26,
    color: '#fff',
    minHeight: 19,
    maxHeight: 26,
    paddingLeft:9,
    opacity: 0.8
  }
});
