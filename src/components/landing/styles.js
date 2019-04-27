import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  channelContainer: {
    flex: 1,
    alignItems: 'center',
   
    justifyContent: 'center',
  },
  container: {

  
    flex: 1,
    flexDirection: 'row',
    
 
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 50
  },
  marginBox: {
    
  },
  title: {
    fontSize: 24,
    margin: 20
  },
  item: {
    backgroundColor: '#0f516c',
    padding: 5,
    margin: 3,
    marginBottom: 5,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
  
    shadowColor: '#000',
   
  },
  text: {
    color: '#ffffff',
    fontSize: 20,
    textAlign: 'left',
    fontWeight: 'bold',
    backgroundColor: '#76b6c4',

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
