import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {fonts, windowWidth, windowHeight} from '../../utils/fonts';
import {colors} from '../../utils/colors';

export default function DataInspeksi({navigation}) {
  const [data, setData] = useState([
    {
      id: 1,
      no_ruas: '052',
      ruas_jalan: 'Sruwen-Terminal Boyolali',
      panjang: '12.40',
      aadt: '',
    },
    {
      id: 2,
      no_ruas: '053.11K',
      ruas_jalan: 'Jl. Pandanaran (Boyolali)',
      panjang: '3.03',
      aadt: '',
    },
  ]);
  return (
    <SafeAreaView style={{flex: 1, paddingHorizontal: 10}}>
      <View
        style={{
          padding: 5,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10,
          backgroundColor: colors.secondary,
          // borderWidth: 1,
          margin: 10,
        }}>
        <Text style={styles.judul}>INSPEKSI IKJ</Text>
      </View>
      <Text style={styles.judul}>PPK 1.6 Provinsi Jawa Tengah</Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('DataInspeksiJenis', {
              jenis: 'PERKERASAN JALAN',
            })
          }
          style={styles.box}>
          <Text style={styles.boxText}>PERKERASAN JALAN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('DataInspeksiJenis', {
              jenis: 'BAHU JALAN',
            })
          }
          style={styles.box}>
          <Text style={styles.boxText}>BAHU JALAN</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('DataInspeksiJenis', {
              jenis: 'DRAINASE',
            })
          }
          style={styles.box}>
          <Text style={styles.boxText}>DRAINASE</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('DataInspeksiJenis', {
              jenis: 'PERLENGKAPAN JALAN',
            })
          }
          style={styles.box}>
          <Text style={styles.boxText}>PERLENGKAPAN JALAN</Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('DataInspeksiJenis', {
              jenis: 'PEBAGUNAN PELANGKAP',
            })
          }
          style={styles.box}>
          <Text style={styles.boxText}>PEBAGUNAN PELANGKAP</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('DataInspeksiJenis', {
              jenis: 'CLEARANCE',
            })
          }
          style={styles.box}>
          <Text style={styles.boxText}>CLEARANCE</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  judul: {
    fontFamily: fonts.secondary[600],
    fontSize: windowWidth / 20,
    color: colors.black,
    textAlign: 'center',
    marginVertical: 10,
  },
  box: {
    padding: 5,
    backgroundColor: colors.primary,
    flex: 1,
    marginHorizontal: 5,
    marginVertical: 20,
    height: windowHeight / 6,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  boxText: {
    fontFamily: fonts.secondary[600],
    fontSize: windowWidth / 25,
    color: colors.white,
    marginTop: 5,
    textAlign: 'justify',
  },
  head: {
    padding: 5,
    width: windowWidth / 3.5,
  },
  headIsi: {
    padding: 10,
    color: colors.white,
    fontFamily: fonts.secondary[600],
    fontSize: windowWidth / 30,
  },
  headIsi2: {
    padding: 10,
    color: colors.black,
    fontFamily: fonts.secondary[400],
    fontSize: windowWidth / 30,
  },
});
