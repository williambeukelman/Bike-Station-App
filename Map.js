import React from 'react';
import {
  SafeAreaView,
} from 'react-native';
import { WebView } from 'react-native-webview';

export default MapPage = () => {
    map_html = `
    <iframe src="https://docs.google.com/viewerng/viewer?url=https://www.nyc.gov/html/dot/downloads/pdf/nyc-bike-map-2022.pdf&embedded=true" frameborder="0" height="100%" width="100%">
    </iframe>
    `
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <WebView
          style={{ flex: 1 }}
          originWhitelist={['*']}
          source={{ html: map_html }}
        />
      </SafeAreaView>
    )
  }