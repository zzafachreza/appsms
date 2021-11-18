import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import LottieView from 'lottie-react-native';
import DatePicker from 'react-native-date-picker';
import {MyButton, MyInput, MyGap, MyPicker} from '../../components';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {showMessage} from 'react-native-flash-message';
import axios from 'axios';
import {getData} from '../../utils/localStorage';

export default function DataInspeksiInput({navigation, route}) {
  // const item = route.params;
  const [date, setDate] = useState(new Date());
  const Today = new Date();
  const dd = String(Today.getDate()).padStart(2, '0');
  const mm = String(Today.getMonth() + 1).padStart(2, '0'); //January is 0!
  const yyyy = Today.getFullYear();
  const jam = String(Today.getHours() + 1).padStart(2, '0');
  const menit = String(Today.getMinutes() + 1).padStart(2, '0');
  const detik = String(Today.getUTCSeconds() + 1).padStart(2, '0');
  const today = `${yyyy}-${mm}-${dd}`;
  const [data, setData] = useState(route.params);

  const [loading, setLoading] = useState(false);

  const sendServer = () => {
    setLoading(true);
    console.log('data yang akan dirikin', data);
    axios
      .post('https://zavalabs.com/sms/api/survey_update.php', data)
      .then(res => {
        console.log(res);
        alert('Data Berhasil Diupdate !');
        navigation.goBack();
      });
  };

  useEffect(() => {
    getData('user').then(res => {
      setData({
        ...data,
        id_member: res.id,
      });
    });
  }, []);

  return (
    <SafeAreaView style={{padding: 10}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <MyInput
          value={today}
          label="Tanggal"
          iconname="calendar"
          onChangeText={val =>
            setData({
              ...data,
              tanggal: val,
            })
          }
        />

        <MyGap jarak={10} />
        <MyInput
          onChangeText={val => {
            setData({
              ...data,
              tim: val,
            });
          }}
          label="Tim Survey"
          iconname="person"
          value={data.tim}
        />
        <MyGap jarak={10} />
        <MyInput
          onChangeText={val => {
            setData({
              ...data,
              kecamatan: val,
            });
          }}
          label="Kecamatan"
          iconname="map"
          value={data.kecamatan}
        />
        <MyGap jarak={10} />
        <MyInput
          onChangeText={val => {
            setData({
              ...data,
              kelurahan: val,
            });
          }}
          label="Desa/kelurahan"
          iconname="home"
          value={data.kelurahan}
        />

        <MyGap jarak={10} />
        <MyInput
          onChangeText={val => {
            setData({
              ...data,
              jalan: val,
            });
          }}
          label="Jalan / Gang"
          iconname="grid"
          value={data.jalan}
        />
        <MyGap jarak={10} />

        <MyInput
          value={data.jalan_panjang}
          onChangeText={val => {
            setData({
              ...data,
              jalan_panjang: val,
            });
          }}
          label="Panjang Jalan ( Meter )"
          iconname="navigate"
        />
        <MyGap jarak={10} />

        <MyInput
          value={data.jalan_lebar}
          onChangeText={val => {
            setData({
              ...data,
              jalan_lebar: val,
            });
          }}
          label="Lebar Jalan ( Meter )"
          iconname="navigate"
        />

        <MyGap jarak={10} />

        <MyInput
          value={data.drainase_panjang}
          onChangeText={val => {
            setData({
              ...data,
              drainase_panjang: val,
            });
          }}
          label="Panjang Drainase ( Meter )"
          iconname="navigate"
        />

        <MyGap jarak={10} />

        <MyInput
          value={data.drainase_lebar}
          onChangeText={val => {
            setData({
              ...data,
              drainase_lebar: val,
            });
          }}
          label="Lebar Drainase ( Meter )"
          iconname="navigate"
        />

        <MyGap jarak={10} />
        <MyButton
          onPress={sendServer}
          title="SUBMIT DATA"
          colorText={colors.black}
          warna={colors.secondary}
        />
      </ScrollView>
      {loading && (
        <LottieView
          source={require('../../assets/animation.json')}
          autoPlay
          loop
          style={{
            flex: 1,
            backgroundColor: colors.primary,
          }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
