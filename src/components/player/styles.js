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
    backgroundColor:'#76B6C4'
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
    textAlign: 'center'
  },
  player: {
    paddingTop: 20,
    borderWidth: 1,
    borderColor: 'black',
    width: '100%',
    height: 250,
},
});
