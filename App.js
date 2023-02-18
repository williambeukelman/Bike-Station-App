import React, {useState, useEffect, useMemo} from 'react';
import {
  Modal,
  View,
  Pressable,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  TextInput
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { store, set, setRegion } from './store'
import { Provider, useSelector, useDispatch } from 'react-redux'
import { WebView } from 'react-native-webview';
import { getHeaderTitle } from '@react-navigation/elements';
import Icon from 'react-native-ionicons'
import './stylesheet.js'

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const AppInner = () => {
  const Data = useSelector((state) => state.Data.value)
  const RegionData = useSelector((state) => state.RegionData.value)
  const [filterBy, setfilterBy] = useState('')
  const [searchText, onChangeSearchText] = useState("")
  const [modalVisible, setModalVisible] = useState(false);
  const [modalItem, setModalItem] = useState({"acceptsCard": true, "acceptsKey": true, "capacity": 0, "kiosk": true, "name": "No Station", "region": "0"});
  const dispatch = useDispatch()

  const fetchRegionData = async () => {
    console.log("Fetching data")
    try{
      let response = await fetch(
        'https://gbfs.citibikenyc.com/gbfs/en/system_regions.json'
      );
      let json = await response.json()
      json = json['data']['regions']
      let arr = {}
      json.map(e => {arr[e.name] = e})
      json = Object.values(arr)
      dispatch(setRegion(json))
    } catch (error) {
      console.error(error)
    }
  }

  const fetchData = async () => {
    console.log("Fetching data")
    try{
      let response = await fetch(
        'https://gbfs.citibikenyc.com/gbfs/en/station_information.json'
      );
      let json = await response.json()
      dispatch(set(json['data']['stations']))
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchData()
    fetchRegionData()
  }, []);
  
  const MapPage = () => {
    map_html = `
    <iframe src="https://docs.google.com/viewerng/viewer?url=https://www.nyc.gov/html/dot/downloads/pdf/nyc-bike-map-2022.pdf&embedded=true" frameborder="0" height="100%" width="100%">
    </iframe>
    `
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <WebView 
          style={{flex: 1}}
          originWhitelist={['*']}
          source={{ html: map_html }}
        />
      </SafeAreaView>
    )
  }

  const About = ({navigation}) => {
    const navHome = () => navigation.navigate('Home')
    return (
      <View style={[styles.container, {justifyContent: 'center', alignItems: 'center'}]}>
        <Text style={styles.aboutTitle}>About Bike Share</Text>
        <Text style={styles.aboutText}>
        Bike share is an innovative mode of transportation that allows users to make trips using publicly available bikes. It consists of a fleet of specially designed, sturdy and durable bikes that are locked into a network of docking stations throughout the service area. The bikes can be unlocked from one station and returned to any other station in the system, making bike share ideal for short, one-way trips.
        </Text>
        <TouchableOpacity style={styles.aboutBtn} onPress={navHome}>
          <Text style={[styles.aboutText, {color: '#47bf90'}]}>View Stations</Text>
        </TouchableOpacity>
      </View>
    )
  }

  const StationCard = props => {
    const {name, kiosk, capacity, region, acceptsCard, acceptsKey} = props
    const Iconkiosk = (kiosk) ? "#47bf90" : "gray"
    const IconacceptsCard = (acceptsCard) ? "#47bf90" : "gray"
    const IconacceptsKey = (acceptsKey) ? "#47bf90" : "gray"
    region_name = RegionData.filter((e) => e.region_id === region)[0]['name']
    const detailsAction = (name) => {
      setModalVisible(true);
      setModalItem(name);
    }
    return(
      <View style={styles.stationCard}>
        <Text style={styles.stationCardName}>{name}</Text>
        <Text style={styles.stationCardCapacity}>Capacity: {capacity}</Text>
        <Text style={styles.stationCardRegion}>Region: {region_name}</Text>
        <View style={styles.stationCardIcons}>
          <Icon name="compass" color={Iconkiosk}/>
          <Icon name="card" color={IconacceptsCard}/>
          <Icon name="key" color={IconacceptsKey}/>
          <TouchableOpacity style={styles.stationCardBtn} onPress={() => detailsAction(name)}>
            <Text style={styles.stationCardBtnText}>Details</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  const ModalCard = () => {
    //let item = {"acceptsCard": true, "acceptsKey": true, "capacity": 0, "kiosk": true, "name": "No Station", "region_id": "0", "rental_methods": [], "station_type": '', "lat": 0, "long": 0}
    item = Data.filter(e => e.name.includes(modalItem))[0]
    let region_name = ""
    try{ region_name = RegionData.filter((e) => e.region_id === item.region_id)[0]['name'] }catch{ console.log("Missing region") }
    
    const Iconkiosk = (item.has_kiosk) ? "#47bf90" : "gray"
    const IconacceptsCard = (item.rental_methods.includes("KEY")) ? "#47bf90" : "gray"
    const IconacceptsKey = (item.rental_methods.includes("CREDITCARD")) ? "#47bf90" : "gray"
    return(
      <View>
        <Text style={styles.stationCardName}>{modalItem}</Text>
        <Text style={styles.stationCardCapacity}>Capacity: {item.capacity}</Text>
        <Text style={styles.stationCardRegion}>Region: {region_name}</Text>
        <Text style={styles.stationCardCapacity}>Station Type: {item.station_type}</Text>
        <Text style={styles.stationCardCapacity}>Lat: {item.lat}</Text>
        <Text style={styles.stationCardCapacity}>Lon: {item.lon}</Text>
        <View style={styles.stationCardIcons}>
          <Icon name="compass" color={Iconkiosk}/>
          <Icon name="card" color={IconacceptsCard}/>
          <Icon name="key" color={IconacceptsKey}/>
        </View>
      </View>
    )
  }

  const Station = () => {
    if(Object.keys(Data).length > 0){

      function filter(){
        let filtered = (filterBy == '') ? Data : Data.filter((e) => e.region_id == filterBy)
        return filtered.filter((e) => e.name.includes(searchText))
      }
      const results = useMemo(() => {
        return filter();
      }, [searchText, filterBy]);

      return(
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            useNativeDriver={true} 
            hardwareAccelerated={true}
            onRequestClose={() => {
              setModalVisible(false);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <ModalCard/>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(false)}>
                  <Text style={styles.textStyle}>Close</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        <View style={styles.container}>
          { (filterBy != '') ? <Text style={[styles.stationCardRegion, {margin: 5, textTransform: 'uppercase', fontWeight: 700}]}>Showing stations in region: {filterBy}</Text> : <></>}
          { (searchText != '') ? <Text style={[styles.stationCardRegion, {margin: 5, textTransform: 'uppercase', fontWeight: 700}]}>Showing results for: {searchText}</Text> : <></>}
          <FlatList
          style={styles.stationList}
          data={results}
          initialNumToRender={5}
          renderItem={({item}) => 
        
          <StationCard name={item.name} 
          kiosk={item.has_kiosk}
          capacity={item.capacity}
          region={item.region_id}
          acceptsKey={item.rental_methods.includes("KEY")}
          acceptsCard={item.rental_methods.includes("CREDITCARD")}
          />

          }
          keyExtractor={item => item.name}
          ListHeaderComponent={
            <View style={styles.searchBar}>
              <Text style={styles.searchBarText}>Search: </Text>
              <TextInput
                style={styles.searchBarInput}
                onSubmitEditing={(e) => onChangeSearchText(e.nativeEvent.text)}
              />
            </View>
          }
        />

        </View>
        </View>
      )
    } else {
      return(
        <View style={styles.centeredView}>
            <View style={[styles.stationCard, {flexDirection: 'row', justifyContent: 'center', width: "50%", flex: 0}]}>
                <Text style={styles.stationCardName}>Loading...</Text>
            </View>
        </View>
      )}
  }

  const Region = ({navigation}) => {
    const viewAllStations = () => {setfilterBy(''); navigation.navigate('By Station')}
    const viewStations = (id) => { setfilterBy(id); navigation.navigate('By Station') }
    if(RegionData != {}){
      return(
        <View style={styles.container}>
          
          <FlatList
          style={styles.stationList}
          data={RegionData}
          renderItem={({item}) => 
        
          <View style={[styles.stationCard, {flexDirection: 'row', justifyContent: 'space-between'}]}>
            <View>
              <Text style={styles.stationCardName}>{item.name}</Text>
              <Text style={styles.stationCardRegion}>Region: {item.region_id}</Text>
            </View>
            <TouchableOpacity style={styles.regionCardBtn} onPress={() => {viewStations(item.region_id)}}>
              <Text style={styles.stationCardBtnText}>View Stations</Text>
            </TouchableOpacity>
          </View>
          }
          keyExtractor={item => item.region_id}
          ListHeaderComponent={
            <View style={[styles.stationCard, {flexDirection: 'row', justifyContent: 'space-between'}]}>
              <View>
                <Text style={styles.stationCardName}>All regions</Text>
              </View>
              <TouchableOpacity style={styles.regionCardBtn} onPress={viewAllStations}>
                <Text style={styles.stationCardBtnText}>View Stations</Text>
              </TouchableOpacity>
            </View>
          }
        />

        </View>
      )
    } else {
      return(
        <View style={styles.container}>
          <View style={[styles.stationCard, {flexDirection: 'row', justifyContent: 'space-between'}]}>
            <View>
              <Text style={styles.stationCardName}>Loading...</Text>
            </View>
          </View>
        </View>
      )
    }
  }
  
  const Main = ({navigation}) => {
    return (
      <Tab.Navigator screenOptions={{
        tabBarActiveBackgroundColor: '#47bf90',
        tabBarInactiveBackgroundColor: '#47bf90aa',
        tabBarLabelStyle: {
          color: 'white',
          fontSize: 20,
          fontWeight: 700,
          textTransform: 'uppercase'
        },
        tabBarItemStyle: {
          display: 'flex',
          alignContent: 'center'
        },
        tabBarIcon: () => {},
        tabBarLabelPosition: "beside-icon",
      }}>
        <Tab.Screen name="By Station" component={Station} options={{ headerShown: false }} />
        <Tab.Screen name="By Region" component={Region} options={{ headerShown: false }} />
      </Tab.Navigator>
    )
  }

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home" screenOptions={{
          headerStyle: {
            backgroundColor: '#47bf90',
            display: 'flex',
            flexDirection: 'row',
            height: 50,
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingHorizontal: 10
          },
          drawerStyle: {
            backgroundColor: '#47bf90',
            width: 240,
          },
          drawerLabelStyle: {
            color: 'white',
            fontSize: 18,
            textTransform: "uppercase"
          },
          header: ({ navigation, route, options }) => {
            const title = getHeaderTitle(options, route.name);
            return (
              <View style={options.headerStyle}>
                <TouchableOpacity onPress={navigation.openDrawer} style={styles.icons}>
                  <Icon name="md-menu" size={28} color="white" />
                </TouchableOpacity>
                <View style={[{display: 'flex', flexDirection: 'row', justifyContent: 'center', flex: 1, alignItems: 'center'}]}>
                  <Text style={[
                  {color: 'white', letterSpacing: 5.8, fontSize: 18, textTransform: 'uppercase', 
                  fontWeight: 700,
                  }]}><Icon name='bicycle'/>{title}</Text>
                </View>
              </View>
            )}
        }}>
        <Drawer.Screen name="Home" component={Main} options={{
           title: 'Home',
           drawerIcon: ({focused, size}) => (
              <Icon
                 name="home"
                 size={size}
                 color={focused ? '#fff' : '#ffffff90'}
              />
           ),
        }} />
        <Drawer.Screen name="Map" component={MapPage} options={{
           title: 'Map',
           drawerIcon: ({focused, size}) => (
              <Icon
                 name="map"
                 size={size}
                 color={focused ? '#fff' : '#ffffff90'}
              />
           ),
        }} />
        <Drawer.Screen name="About" component={About} options={{
           title: 'About',
           drawerIcon: ({focused, size}) => (
              <Icon
                 name="information-circle-outline"
                 size={size}
                 color={focused ? '#fff' : '#ffffff90'}
              />
           ),
        }} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <AppInner/>
    </Provider>
  )
}

export default App;