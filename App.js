import React, { useState, useEffect, useMemo } from 'react';
import {
  Modal,
  View,
  Pressable,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { store, set, setRegion } from './store'
import { Provider, useSelector, useDispatch } from 'react-redux'
import { getHeaderTitle } from '@react-navigation/elements';
import Icon from 'react-native-ionicons'
import { theme, styles } from './stylesheet.js'
import About from './About'
import MapPage from './Map'

const Drawer = createDrawerNavigator();

const LoadingBox = () => {
  return (
    <View style={styles.container}>
      <View style={[styles.stationCard, { flexDirection: 'row', justifyContent: 'center', width: "50%", flex: 0, margin: '25%' }]}>
        <View>
          <Text style={styles.stationCardName}>Loading...</Text>
        </View>
      </View>
    </View>
  )
}

const topBar = ({ navigation, route, options }) => {
  const title = getHeaderTitle(options, route.name);
  return (
    <View style={options.headerStyle}>
      <TouchableOpacity onPress={navigation.openDrawer} style={styles.icons}>
        <Icon name="md-menu" size={28} color="white" />
      </TouchableOpacity>
      <View style={styles.headerTitleBar}>
        <Text style={[
          {
            color: 'white', fontSize: 18, paddingHorizontal: 15
          }]}>
          <Icon name='bicycle' />
        </Text>
        <Text style={[
          {
            color: 'white', letterSpacing: 2.8, fontSize: 18, textTransform: 'uppercase',
            fontWeight: 700
          }]}>
          {title}</Text>
      </View>
    </View>
  )
}


const AppInner = () => {
  const Data = useSelector((state) => state.Data.value)
  const RegionData = useSelector((state) => state.RegionData.value)
  const [searchText, onChangeSearchText] = useState("")
  const [modalVisible, setModalVisible] = useState(false);
  const [filtersVisible, setfiltersVisible] = useState(false);
  const [modalItem, setModalItem] = useState({ "acceptsCard": true, "acceptsKey": true, "capacity": 0, "kiosk": true, "name": "No Station", "region": "0" });
  const dispatch = useDispatch()
  const [openRegions, setOpenRegions] = useState(false);
  const [valueRegions, setValueRegions] = useState(null);
  const [itemsRegions, setItemsRegions] = useState([]);
  const [searchboxText, setSearchText] = useState("");

  const fetchData = async (url, region) => {
    console.log("Fetching data")
    try {
      let response = await fetch(
        url
      );
      let json = await response.json()
      if (!region) {
        dispatch(set(json['data']['stations']))
      } else {
        json = json['data']['regions']
        let arr = {}
        json.map(e => { arr[e.name] = e })
        json = Object.values(arr)
        dispatch(setRegion(json))
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (Object.keys(Data).length < 1) {
      fetchData(url = 'https://gbfs.citibikenyc.com/gbfs/en/station_information.json')
      fetchData(url = 'https://gbfs.citibikenyc.com/gbfs/en/system_regions.json', region = true)
    }
  }, []);

  useEffect(() => {
    if (Object.keys(RegionData).length > 0) {
      setItemsRegions([{ "label": "All Regions", "value": "" }, ...RegionData.map((e) => { return ({ "label": e.name, "value": e.region_id }) })])
    }
  }, [RegionData])

  const StationCard = props => {
    const { name, kiosk, capacity, region, acceptsCard, acceptsKey } = props
    const Iconkiosk = (kiosk) ? theme.primaryColor : "gray"
    const IconacceptsCard = (acceptsCard) ? theme.primaryColor : "gray"
    const IconacceptsKey = (acceptsKey) ? theme.primaryColor : "gray"
    try {
      region_name = RegionData.filter((e) => e.region_id === region)[0]['name']
    } catch {
      region_name = "Missing region"
    }
    const detailsAction = (name) => {
      setModalItem(name);
      setModalVisible(true);
    }
    return (
      <Pressable onPress={() => detailsAction(name)}>
        <View style={styles.stationCard}>
          <Text style={styles.stationCardName}>{name}</Text>
          <Text style={styles.stationCardCapacity}>Capacity: {capacity}</Text>
          <Text style={styles.stationCardRegion}>Region: {region_name}</Text>
          <View style={styles.stationCardIcons}>
            <Icon name="compass" color={Iconkiosk} />
            <Icon name="card" color={IconacceptsCard} />
            <Icon name="key" color={IconacceptsKey} />
          </View>
        </View>
      </Pressable>
    )
  }

  const ModalCard = () => {
    item = Data.filter(e => e.name.includes(modalItem))[0]
    let region_name = ""
    try { region_name = RegionData.filter((e) => e.region_id === item.region_id)[0]['name'] } catch { region_name = "Missing region" }

    const Iconkiosk = (item.has_kiosk) ? theme.primaryColor : "gray"
    const IconacceptsCard = (item.rental_methods.includes("KEY")) ? theme.primaryColor : "gray"
    const IconacceptsKey = (item.rental_methods.includes("CREDITCARD")) ? theme.primaryColor : "gray"
    return (
      <View>
        <Text style={styles.stationCardName}>{modalItem}</Text>
        <Text style={styles.stationCardCapacity}>Capacity: {item.capacity}</Text>
        <Text style={styles.stationCardRegion}>Region: {region_name}</Text>
        <Text style={styles.stationCardCapacity}>Station Type: {item.station_type}</Text>
        <Text style={styles.stationCardCapacity}>Lat: {item.lat}</Text>
        <Text style={styles.stationCardCapacity}>Lon: {item.lon}</Text>
        <View style={styles.stationCardIcons}>
          <Icon name="compass" color={Iconkiosk} />
          <Icon name="card" color={IconacceptsCard} />
          <Icon name="key" color={IconacceptsKey} />
        </View>
      </View>
    )
  }

  const FilterModalContent = () => {
    return (
      <View>
        <Text style={styles.label}>Region</Text>
        <DropDownPicker
          open={openRegions}
          value={valueRegions}
          items={itemsRegions}
          setOpen={setOpenRegions}
          setValue={setValueRegions}
          //setItems={setItemsRegions}
          listMode="SCROLLVIEW"
        />
      </View>
    )
  }

  const FilterModal = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={filtersVisible}
        useNativeDriver={true}
        hardwareAccelerated={true}
        onRequestClose={() => {
          setfiltersVisible(false);
        }}>
        <View style={[styles.centeredView, { backgroundColor: 'rgba(0,0,0,0.5)' }]}>
          <View style={styles.modalView}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setfiltersVisible(false)}>
              <Text style={styles.textStyle}><Icon name='close' size={16} /></Text>
            </Pressable>
            <FilterModalContent />
          </View>
        </View>
      </Modal>
    )
  }

  const StationModal = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        useNativeDriver={true}
        hardwareAccelerated={true}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View style={[styles.centeredView, { backgroundColor: 'rgba(0,0,0,0.5)' }]}>
          <View style={styles.modalView}>
            <ModalCard />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.textStyle}><Icon name='close' size={16} /></Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    )
  }

  const Station = () => {
    if (Object.keys(Data).length > 0) {

      function filter() {
        let filtered = (valueRegions == null || valueRegions == "") ? Data : Data.filter((e) => parseInt(e.region_id) == valueRegions)
        return filtered.filter((e) => e.name.includes(searchText))
      }
      const results = useMemo(() => {
        return filter();
      }, [searchText, valueRegions]);

      return (
        <View style={[styles.centeredView, { backgroundColor: 'rgba(0,0,0,0.5)' }]}>
          <FilterModal />
          <StationModal />
          <View style={styles.container}>
            <FlatList
              style={styles.stationList}
              data={results}
              initialNumToRender={5}
              renderItem={({ item }) =>

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
                <StationHeader />
              }
            />

          </View>
        </View>
      )
    } else {
      return (
        <LoadingBox />
      )
    }
  }

  const StationHeader = () => {
    const name = (valueRegions != null && valueRegions != "") ? RegionData.filter((e) => e.region_id == valueRegions.toString())[0].name : "All Regions"
    return (
      <View>
        <View style={styles.searchBar}>
          <Text style={styles.searchBarText}>Search: </Text>
          <TextInput
            style={styles.searchBarInput}
            //onChangeText={setSearchText}
            //value={searchboxText}
            autoFocus={true}
            onSubmitEditing={(e) => onChangeSearchText(e.nativeEvent.text)}
          />
          <TouchableOpacity style={styles.regionCardBtn} onPress={() => setfiltersVisible(true)}>
            <Text style={styles.stationCardBtnText}>Filters</Text>
          </TouchableOpacity>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
          {(valueRegions != null) ? <Text style={styles.stationCardRegionHeader}>Region: {name}</Text> : <></>}
        </View>
      </View>
    )
  }

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home" screenOptions={{
        headerStyle: styles.headerStyle,
        drawerStyle: {
          backgroundColor: theme.primaryColor,
          width: 240,
        },
        drawerLabelStyle: {
          color: 'white',
          fontSize: 18,
          textTransform: "uppercase"
        },
        header: topBar
      }}>
        <Drawer.Screen name="Home" component={Station} options={{
          title: 'Stations',
          drawerIcon: ({ focused, size }) => (
            <Icon
              name="home"
              size={size}
              color={focused ? '#fff' : '#ffffff90'}
            />
          ),
        }} />
        <Drawer.Screen name="Map" component={MapPage} options={{
          title: 'Map',
          drawerIcon: ({ focused, size }) => (
            <Icon
              name="map"
              size={size}
              color={focused ? '#fff' : '#ffffff90'}
            />
          ),
        }} />
        <Drawer.Screen name="About" component={About} options={{
          title: 'About',
          drawerIcon: ({ focused, size }) => (
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
      <AppInner />
    </Provider>
  )
}

export default App;