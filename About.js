import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { styles } from './stylesheet.js'

export default About = ({ navigation }) => {
    const navHome = () => navigation.navigate('Home')
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={styles.aboutTitle}>About Bike Share</Text>
        <Text style={styles.aboutText}>
          Bike share is an innovative mode of transportation that allows users to make trips using publicly available bikes. It consists of a fleet of specially designed, sturdy and durable bikes that are locked into a network of docking stations throughout the service area. The bikes can be unlocked from one station and returned to any other station in the system, making bike share ideal for short, one-way trips.
        </Text>
        <TouchableOpacity style={styles.aboutBtn} onPress={navHome}>
          <Text style={[styles.aboutText, { color: styles.primaryColor }]}>View Stations</Text>
        </TouchableOpacity>
      </View>
    )
  }