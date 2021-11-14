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
import {Icon} from 'react-native-elements';

export default function DataRuasDetail({route}) {
  const data = route.params;
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
          <Text style={styles.judul}>PENILIK JALAN</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <View
            style={{
              borderRadius: 50,
              //   margin: 5,
              width: 85,
              height: 85,
              justifyContent: 'center',
              alignItems: 'center',
              //   overflow: 'hidden',
              backgroundColor: colors.white,
            }}>
            <Image
              source={{uri: 'https://zavalabs.com/sininja/api/penilik.png'}}
              style={{width: 80, height: 80, borderRadius: 40}}
            />
          </View>
          <View
            style={{
              flex: 1,
              //   borderWidth: 1,
              padding: 10,
              marginVertical: 10,
            }}>
            <Text
              style={{
                color: colors.black,
                fontFamily: fonts.secondary[600],
                fontSize: windowWidth / 25,
              }}>
              Eka Andi SetIyawan
            </Text>
            <Text
              style={{
                color: colors.black,
                fontFamily: fonts.secondary[400],
                fontSize: windowWidth / 25,
              }}>
              D01111982092018003
            </Text>
            <Text
              style={{
                color: colors.black,
                fontFamily: fonts.secondary[400],
                fontSize: windowWidth / 25,
              }}>
              0858-7941-5783
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              padding: 10,
            }}>
            <Icon
              type="ionicon"
              name="logo-whatsapp"
              size={windowWidth / 10}
              color={'green'}
            />
          </View>
        </View>
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
        </View>

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            backgroundColor: colors.white,
            borderBottomWidth: 1,
            borderBottomColor: '#CECECE',
          }}>
          <View style={styles.head}>
            <Text style={styles.headIsi2}>{data.no_ruas}</Text>
          </View>
          <View style={styles.head}>
            <Text style={styles.headIsi2}>{data.ruas_jalan}</Text>
          </View>
          <View style={styles.head}>
            <Text style={styles.headIsi2}>{data.panjang_km}</Text>
          </View>
        </TouchableOpacity>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            backgroundColor: colors.primary,
          }}>
          <View style={styles.head}>
            <Text style={styles.headIsi}>Koordinat</Text>
          </View>
          <View style={styles.head}>
            <Text style={styles.headIsi}></Text>
          </View>

          <View style={styles.head}>
            <Text style={styles.headIsi}>KM</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            backgroundColor: colors.primary,
            backgroundColor: colors.white,
            borderBottomWidth: 1,
            borderBottomColor: '#CECECE',
          }}>
          <View style={styles.head}>
            <Text style={styles.headIsi2}>Awal</Text>
          </View>
          <View style={styles.head}>
            <Text style={styles.headIsi2}>{data.awal_koordinat}</Text>
          </View>

          <View style={styles.head}>
            <Text style={styles.headIsi2}>{data.awal_km}</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            backgroundColor: colors.primary,
            backgroundColor: colors.white,
            borderBottomWidth: 1,
            borderBottomColor: '#CECECE',
          }}>
          <View style={styles.head}>
            <Text style={styles.headIsi2}>Akhir</Text>
          </View>
          <View style={styles.head}>
            <Text style={styles.headIsi2}>{data.akhir_koordinat}</Text>
          </View>

          <View style={styles.head}>
            <Text style={styles.headIsi2}>{data.akhir_km}</Text>
          </View>
        </View>
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
