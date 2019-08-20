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
    backgroundColor: '#000'
  },
  image: {

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
    margin: 4,
  },
  itemLandscape: {
    margin: 12,
    flexGrow: 0
  },
  text: {
    color: '#000',
    fontSize: 20,
    textAlign: 'center'
  },
  buttons: {
    flexDirection: 'row'
  },

  pills: {
  
    padding: 15,
    margin: 10,
    marginBottom: 5
  },
  footer: {
    flex: .1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#76B6C4',
    borderColor: 'red',
    padding: 2,
    margin:5,
    fontSize: 16,
    fontWeight: 'bold'
  }
});
