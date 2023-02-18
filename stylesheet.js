import {
    StyleSheet
  } from 'react-native';

export default styles = StyleSheet.create({
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
    flex: 1,
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
    //marginHorizontal: 15,
    //justifyContent: 'space-evenly'
  },

  stationCardBtn: {
    //backgroundColor: '#000000c0',
    backgroundColor: '#47bf90',
    padding: 5,
    paddingHorizontal: 10,
    margin: 3,
    borderRadius: 5,
    marginLeft: '45%'
  },

  regionCardBtn:{
    maxHeight: 40,
    backgroundColor: '#47bf90',
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
    color: "black"
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
    color: '#47bf90',
    fontWeight: 900,
  },

  aboutBtn:{
    margin: 5,
    backgroundColor: 'transparent',
    borderColor: '#47bf90',
    borderWidth: 1,
    borderRadius: 40,
    paddingHorizontal: 10,
  },

  //Modal Stuff

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //marginTop: 22,
  },
  modalView: {
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
    elevation: 2,
  },
  buttonClose: {
    paddingHorizontal: 30,
    marginTop: 10,
    backgroundColor: '#47bf90',
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

  //Search bar

  searchBar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },

  searchBarText: {
    color: '#47bf90',
    fontWeight: 900,
    fontSize: 18,
    textTransform: 'uppercase'
  },

  searchBarInput: {
    fontSize: 16,
    width: '60%',
    height: 40,
    margin: 12,
    borderRadius: 0,
    borderColor: '#47bf90',
    borderBottomWidth: 1,
  },

})