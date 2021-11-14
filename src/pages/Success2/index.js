import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  Animated,
} from 'react-native';
import {fonts} from '../../utils/fonts';
import LottieView from 'lottie-react-native';
import {MyButton} from '../../components';
import {colors} from '../../utils/colors';

export default function Success2({navigation, route}) {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const txt = new Animated.Value(-windowWidth);

  Animated.timing(txt, {
    toValue: 10,
    duration: 800,
    useNativeDriver: false,
  }).start();

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          alignItems: 'center',
          paddingBottom: 100,
        }}>
        <LottieView
          source={require('../../assets/success.json')}
          autoPlay
          loop={false}
        />
        <Animated.Text
          style={{
            fontFamily: fonts.secondary[400],
            fontSize: windowWidth / 22,
            color: 'black',
            bottom: txt,
          }}>
          Data Berhasil Disimpan
        </Animated.Text>
      </View>
      <View
        style={{
          //   flex: 1,
          padding: 10,
        }}>
        <MyButton
          title="KEMBALI KE HOME"
          warna={colors.primary}
          Icons="home"
          onPress={() => navigation.replace('MainApp')}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
