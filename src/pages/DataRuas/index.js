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
import {fonts, windowWidth} from '../../utils/fonts';
import {colors} from '../../utils/colors';
import axios from 'axios';

export default function DataRuas({navigation}) {
  useEffect(() => {
    axios.get('https://zavalabs.com/sininja/api/ruas.php').then(res => {
      setData(res.data);
    });
  }, []);

  const [data, setData] = useState([]);
  return (
    <SafeAreaView style={{flex: 1, paddingHorizontal: 10}}>
      <ScrollView showsVerticalScrollIndicator={false}>
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
          <Text style={styles.judul}>RUAS JALAN</Text>
        </View>
        <Text style={styles.judul}>PPK 1.6 Provinsi Jawa Tengah</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            backgroundColor: colors.primary,
          }}>
          <View style={styles.head}>
            <Text style={styles.headIsi}>No Ruas</Text>
          </View>
          <View style={styles.head}>
            <Text style={styles.headIsi}>Ruas Jalan</Text>
          </View>
          <View style={styles.head}>
            <Text style={styles.headIsi}>Panjang (km)</Text>
          </View>
          <View style={styles.head}>
            <Text style={styles.headIsi}>Volume Lalin (AADT)</Text>
          </View>
        </View>

        {data.map(item => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate('DataRuasDetail', item)}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                backgroundColor: colors.white,
                borderBottomWidth: 1,
                borderBottomColor: '#CECECE',
              }}>
              <View style={styles.head}>
                <Text style={styles.headIsi2}>{item.no_ruas}</Text>
              </View>
              <View style={styles.head}>
                <Text style={styles.headIsi2}>{item.ruas_jalan}</Text>
              </View>
              <View style={styles.head}>
                <Text style={styles.headIsi2}>{item.panjang_km}</Text>
              </View>
              <View style={styles.head}>
                <Text style={styles.headIsi2}>{item.aadt}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
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
  isi: {
    fontFamily: fonts.secondary[400],
    fontSize: windowWidth / 25,
    color: colors.black,
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
