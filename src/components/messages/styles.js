import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  channelContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 50,
    justifyContent: 'space-around',
  },
  item: {
 
    borderRadius: 9 ,
    margin: 5,
    backgroundColor: '#fff',
    paddingBottom: 7,
    paddingTop: 7,
    margin:4
  },
  container: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: '#fff'
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
 
    margin: 1,

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
    backgroundColor: '#212121',
    borderColor: 'red',
    padding: 2,
    margin:5,
    fontSize: 16,
    fontWeight: 'bold'
  },
  textTitle: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'left'
  },
  programTitle: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'left',
    fontWeight: 'bold'
  },
  programDescription: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'left',
    padding : 6
  }
});
