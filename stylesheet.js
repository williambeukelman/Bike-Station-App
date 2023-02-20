import {
    StyleSheet
  } from 'react-native';

export const theme = StyleSheet.create({
  primaryColor: "#47bf90",
  primaryColorFaded: '#47bf90aa',
})

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems:'flex-start',
    backgroundColor: '#f8f8f8',
  },

  stationList:{
    width: '100%'
  },

  stationCard:{
    margin: 10,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
  },

  stationCardIcons:{
    display: "flex",
    flexDirection: "row",
    gap: 10,
    marginTop: 5
  },

  regionCardBtn:{
    maxHeight: 40,
    backgroundColor: theme.primaryColor,
    paddingHorizontal: 10,
    margin: 3,
    padding: 5,
    borderRadius: 5,
  },

  stationCardBtnText: {
    color: 'white',
    fontSize: 18,
  },

  stationCardName:{
    fontSize: 22,
    color: "black",
    fontWeight: 'bold'
  },

  stationCardCapacity:{
    fontSize: 18,
    color: "black"
  },

  stationCardRegion:{
    fontSize: 18,
    color: 'black',
  },

  stationCardRegionHeader:{
    display: 'flex',
    flexShrink: 1,
    fontSize: 16,
    backgroundColor: theme.primaryColor,
    color: 'white',
    padding: 5,
    paddingHorizontal: 15,
    borderRadius: 50,
    margin: 5, 
    textTransform: 'uppercase', 
    fontWeight: 700
  },

  box: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },

  aboutText:{
    padding: 10,
    fontSize: 18,
    color: 'black',
    lineHeight: 35,
  },

  aboutTitle:{
    margin: 15,
    fontSize: 22,
    color: theme.primaryColor,
    fontWeight: 900,
  },

  aboutBtn:{
    margin: 5,
    backgroundColor: 'transparent',
    borderColor: theme.primaryColor,
    borderWidth: 1,
    borderRadius: 40,
    paddingHorizontal: 10,
  },

  //Modal Content

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    paddingTop: 30,
    margin: 5,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
  },
  buttonClose: {
    position: 'absolute',
    top: 5,
    right: 5,
    padding: 5,
    paddingHorizontal: 10,
    //margin: 10,
    backgroundColor: theme.primaryColor,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },

  label:{
    fontSize: 18,
    color: theme.primaryColor,
    marginBottom: 10,
  },

  //Search bar

  searchBar: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },

  searchBarText: {
    color: theme.primaryColor,
    fontWeight: 900,
    fontSize: 18,
    textTransform: 'uppercase'
  },

  searchBarInput: {
    color: theme.primaryColor,
    fontSize: 16,
    width: 200,
    height: 40,
    margin: 12,
    borderRadius: 5,
    borderColor: theme.primaryColorFaded,
    borderWidth: 1,
  },

  //Header
  
  headerStyle: {
    backgroundColor: theme.primaryColor,
    display: 'flex',
    flexDirection: 'row',
    height: 50,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 10
  },

  headerTitleBar:{
    display: 'flex', flexDirection: 'row', justifyContent: 'center', flex: 1, alignItems: 'center'
  },

})