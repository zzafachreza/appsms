import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {fonts} from '../../utils/fonts';
import {colors} from '../../utils/colors';
import {Icon} from 'react-native-elements';
import {Dimensions} from 'react-native';

export default function DataLaporan({navigation}) {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  return (
    <View
      style={{
        flex: 1,
      }}>
      <TouchableOpacity
        onPress={() => navigation.navigate('LaporanInspeksi')}
        style={{
          flex: 1,
          marginVertical: 20,
          marginHorizontal: 10,
          backgroundColor: colors.secondary,
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
          elevation: 2,
        }}>
        <Icon
          type="ionicon"
          name="pie-chart"
          color={colors.white}
          size={windowWidth / 3}
        />
        <Text
          style={{
            fontFamily: fonts.secondary[600],
            fontSize: windowWidth / 15,
            color: colors.white,
          }}>
          LAPORAN INSPEKSI IKJ
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('LaporanAduan')}
        style={{
          flex: 1,
          marginVertical: 20,
          marginHorizontal: 10,
          backgroundColor: colors.primary,
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
          elevation: 2,
        }}>
        <Icon
          type="ionicon"
          name="bar-chart"
          color={colors.white}
          size={windowWidth / 3}
        />
        <Text
          style={{
            fontFamily: fonts.secondary[600],
            fontSize: windowWidth / 15,
            color: colors.white,
          }}>
          LAPORAN ADUAN
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
