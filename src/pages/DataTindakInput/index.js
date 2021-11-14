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

import DatePicker from 'react-native-date-picker';
import {MyButton, MyInput, MyGap, MyPicker} from '../../components';
import {colors} from '../../utils/colors';
import {fonts, windowWidth} from '../../utils/fonts';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {showMessage} from 'react-native-flash-message';
import axios from 'axios';
import {getData} from '../../utils/localStorage';

export default function DataTindakInput({navigation, route}) {
  const item = route.params;
  const [date, setDate] = useState(new Date());
  const [data, setData] = useState({
    id: item.id,
  });
  const [today, setToday] = useState('');

  const Today = new Date();
  const dd = String(Today.getDate()).padStart(2, '0');
  const mm = String(Today.getMonth() + 1).padStart(2, '0'); //January is 0!
  const yyyy = Today.getFullYear();
  const jam = String(Today.getHours() + 1).padStart(2, '0');
  const menit = String(Today.getMinutes() + 1).padStart(2, '0');
  const detik = String(Today.getUTCSeconds() + 1).padStart(2, '0');

  const [loading, setLoading] = useState(false);
  console.log('pembayaran', data);
  const [foto1, setfoto1] = useState('https://zavalabs.com/nogambar.jpg');
  const [foto2, setfoto2] = useState('https://zavalabs.com/nogambar.jpg');
  const [foto3, setfoto3] = useState('https://zavalabs.com/nogambar.jpg');
  const [foto4, setfoto4] = useState('https://zavalabs.com/nogambar.jpg');

  const options = {
    includeBase64: true,
    quality: 0.5,
  };

  const getCamera = xyz => {
    launchCamera(options, response => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image Picker Error: ', response.error);
      } else {
        let source = {uri: response.uri};
        switch (xyz) {
          case 1:
            setData({
              ...data,
              foto1: `data:${response.type};base64, ${response.base64}`,
            });
            setfoto1(`data:${response.type};base64, ${response.base64}`);
            break;
          case 2:
            setData({
              ...data,
              foto2: `data:${response.type};base64, ${response.base64}`,
            });
            setfoto2(`data:${response.type};base64, ${response.base64}`);
            break;
          case 3:
            setData({
              ...data,
              foto3: `data:${response.type};base64, ${response.base64}`,
            });
            setfoto3(`data:${response.type};base64, ${response.base64}`);
            break;
          case 4:
            setData({
              ...data,
              foto4: `data:${response.type};base64, ${response.base64}`,
            });
            setfoto4(`data:${response.type};base64, ${response.base64}`);
            break;
        }
      }
    });
  };

  const getGallery = xyz => {
    launchImageLibrary(options, response => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image Picker Error: ', response.error);
      } else {
        let source = {uri: response.uri};
        switch (xyz) {
          case 1:
            setData({
              ...data,
              foto1: `data:${response.type};base64, ${response.base64}`,
            });
            setfoto1(`data:${response.type};base64, ${response.base64}`);
            break;
          case 2:
            setData({
              ...data,
              foto2: `data:${response.type};base64, ${response.base64}`,
            });
            setfoto2(`data:${response.type};base64, ${response.base64}`);
            break;
          case 3:
            setData({
              ...data,
              foto3: `data:${response.type};base64, ${response.base64}`,
            });
            setfoto3(`data:${response.type};base64, ${response.base64}`);
            break;
          case 4:
            setData({
              ...data,
              foto4: `data:${response.type};base64, ${response.base64}`,
            });
            setfoto4(`data:${response.type};base64, ${response.base64}`);
            break;
        }
      }
    });
  };

  const sendServer = () => {
    console.log('data yang akan dirikin', data);
    axios
      .post(
        'https://zavalabs.com/sininja/api/tindak_lanjut_upload_perbaikan.php',
        data,
      )
      .then(res => {
        console.log(res);
      });
    // alert('ajaja');
    navigation.replace('Success2', {
      messege: 'Data Berhasil Di Simpan !',
    });
  };

  const [ruas, setRuas] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    getData('user').then(res => {
      setUser(res);
      setData({
        ...data,
        pelapor: res.nama_lengkap,
      });
    });

    axios.get('https://zavalabs.com/sininja/api/ruas.php').then(res => {
      setRuas(res.data);

      const oldData = res.data;
      const dd = [];
      Object.keys(oldData).map(key => {
        dd.push({
          label: oldData[key].no_ruas + ' - ' + oldData[key].ruas_jalan,
          value: oldData[key].ruas_jalan,
        });
      });
      setRuas(dd);
      console.log(dd);
    });
  }, []);

  const UploadFoto = ({onPress1, onPress2, label, foto}) => {
    return (
      <View
        style={{
          padding: 10,
          backgroundColor: colors.white,
          marginVertical: 10,
          borderWidth: 1,
          borderRadius: 10,
          borderColor: colors.border,
          elevation: 2,
        }}>
        <Text
          style={{
            fontFamily: fonts.secondary[600],
            color: colors.black,
          }}>
          {label}
        </Text>
        <Image
          source={{
            uri: foto,
          }}
          style={{
            width: '100%',
            aspectRatio: 1.5,
          }}
          resizeMode="center"
        />
        <View
          style={{
            flexDirection: 'row',
          }}>
          <View
            style={{
              flex: 1,
            }}>
            <MyButton
              left={0}
              fontSize={windowWidth / 30}
              onPress={onPress1}
              colorText={colors.white}
              title="KAMERA"
              warna={colors.primary}
            />
          </View>
          <View
            style={{
              flex: 1,
              paddingLeft: 5,
            }}>
            <MyButton
              left={0}
              fontSize={windowWidth / 30}
              onPress={onPress2}
              title="GALLERY"
              colorText={colors.black}
              warna={colors.secondary}
            />
          </View>
        </View>
      </View>
    );
  };

  const ListDataTindak = ({label, value, warna = colors.black}) => {
    return (
      <View
        style={{
          // paddingHorizontal: 10,
          paddingVertical: 5,
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderBottomColor: '#CDCDCD',
        }}>
        <Text
          style={{
            flex: 1,
            fontFamily: fonts.secondary[600],
            color: warna,
            fontSize: windowWidth / 30,
          }}>
          {label}
        </Text>
        <Text
          style={{
            flex: 2,
            fontFamily: fonts.secondary[400],
            color: warna,
            fontSize: windowWidth / 30,
          }}>
          {value}
        </Text>
      </View>
    );
  };
  return (
    <SafeAreaView style={{padding: 10}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <View
            style={{
              flex: 1,
              padding: 10,
              //   borderWidth: 1,
              backgroundColor: colors.secondary,
              borderRadius: 10,
            }}>
            <Text
              style={{
                fontFamily: fonts.secondary[600],
                fontSize: windowWidth / 25,
                color: colors.black,
              }}>
              Hai,
            </Text>
            <Text
              style={{
                fontFamily: fonts.secondary[600],
                color: colors.black,

                fontSize: windowWidth / 25,
              }}>
              pelaksana {user.nama_lengkap}
            </Text>
          </View>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text
              style={{
                fontFamily: fonts.secondary[600],
                color: colors.black,
                fontSize: windowWidth / 25,
              }}>
              {item.today}
            </Text>
          </View>
        </View>
        <MyGap jarak={10} />

        <ListDataTindak
          label="Tanggal Temuan"
          value={`${item.tanggal} pukul ${item.jam}`}
        />
        <ListDataTindak label="Inspeksi Oleh" value="Eka Andi Setiyawan" />
        <ListDataTindak label="Kategori Kerusakan" value={item.kategori} />
        <ListDataTindak label="Jenis Kerusakan" value={item.jenis} />
        <ListDataTindak label="Kode Kategori IKJ" value={item.kode} />
        <ListDataTindak label="Ruas Jalan" value={item.ruas} />
        <ListDataTindak label="Lokasi Awal KM" value={item.awal} />
        <ListDataTindak label="Lokasi Akhir KM" value={item.akhir} />
        <ListDataTindak label="Lajur" value={item.lajur} />
        <ListDataTindak label="Jalur" value={item.jalur} />
        <ListDataTindak label="Dimensi" value={item.dimensi} />
        <ListDataTindak label="Hari ini" value={item.today} />
        <ListDataTindak label="Batas Waktu" value={`5 Hari`} />
        <ListDataTindak label="Sampai" value={item.tanggal_batas} />

        {item.lebih > 0 && (
          <ListDataTindak
            warna="red"
            label="Terlambat"
            value={`${item.lebih} Hari`}
          />
        )}
        <MyGap jarak={10} />

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{flex: 1, margin: 5}}>
            <UploadFoto
              onPress1={() => getCamera(1)}
              onPress2={() => getGallery(1)}
              label="Upload Perbaikan 1"
              foto={foto1}
            />
          </View>
          <View style={{flex: 1, margin: 5}}>
            <UploadFoto
              onPress1={() => getCamera(2)}
              onPress2={() => getGallery(2)}
              label="Upload Perbaikan 2"
              foto={foto2}
            />
          </View>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{flex: 1, margin: 5}}>
            <UploadFoto
              onPress1={() => getCamera(3)}
              onPress2={() => getGallery(3)}
              label="Upload Perbaikan 3"
              foto={foto3}
            />
          </View>
          <View style={{flex: 1, margin: 5}}>
            <UploadFoto
              onPress1={() => getCamera(4)}
              onPress2={() => getGallery(4)}
              label="Upload Perbaikan 4"
              foto={foto4}
            />
          </View>
        </View>
        <MyButton
          onPress={sendServer}
          title="SUBMIT DATA"
          colorText={colors.black}
          warna={colors.secondary}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
