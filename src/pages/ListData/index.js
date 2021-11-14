import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import WebView from 'react-native-webview';
import {getData} from '../../utils/localStorage';
import {colors} from '../../utils/colors';
import {fonts, windowHeight} from '../../utils/fonts';

export default function ListData({navigation, route}) {
  const [visible, setVisible] = useState(true);
  const hideSpinner = () => {
    setVisible(false);
  };

  const user = route.params;

  const myUrl = `https://zavalabs.com/sininja/api/kontrak_data.php`;

  console.log(myUrl);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        // padding: 10,
      }}>
      <View
        style={{
          padding: 10,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors.secondary,
        }}>
        <Text
          style={{
            fontFamily: fonts.secondary[600],
            fontSize: windowHeight / 30,
            color: colors.black,
          }}>
          DATA KONTRAK
        </Text>
      </View>
      <WebView
        onLoad={hideSpinner}
        injectedJavaScript={`const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0'); meta.setAttribute('name', 'viewport'); `}
        // injectedJavaScript={`const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `}
        scalesPageToFit={false}
        source={{
          uri: myUrl,
        }}
      />
      {visible && (
        <View
          style={{
            flex: 1,
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#FFF',
            width: '100%',
            top: 0,
            opacity: 0.7,
            height: '100%',
          }}>
          <ActivityIndicator color={colors.primary} size="large" />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
