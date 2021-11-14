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
import {fonts} from '../../utils/fonts';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {showMessage} from 'react-native-flash-message';
import axios from 'axios';

export default function DataAduan({navigation, route}) {
  const item = route.params;
  const [date, setDate] = useState(new Date());
  const [data, setData] = useState({});

  const Today = new Date();
  const dd = String(Today.getDate()).padStart(2, '0');
  const mm = String(Today.getMonth() + 1).padStart(2, '0'); //January is 0!
  const yyyy = Today.getFullYear();
  const jam = String(Today.getHours() + 1).padStart(2, '0');
  const menit = String(Today.getMinutes() + 1).padStart(2, '0');
  const detik = String(Today.getUTCSeconds() + 1).padStart(2, '0');
  const today = `${yyyy}-${mm}-${dd} ${jam}:${menit}:${detik}`;

  const [loading, setLoading] = useState(false);
  console.log('pembayaran', data);
  const [foto1, setfoto1] = useState('https://zavalabs.com/nogambar.jpg');

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
              foto: `data:${response.type};base64, ${response.base64}`,
            });
            setfoto1(`data:${response.type};base64, ${response.base64}`);
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
              foto: `data:${response.type};base64, ${response.base64}`,
            });
            setfoto1(`data:${response.type};base64, ${response.base64}`);
            break;
        }
      }
    });
  };

  const sendServer = () => {
    console.log('data yang akan dirikin', data);
    axios
      .post('https://zavalabs.com/sininja/api/aduan_add.php', data)
      .then(res => {
        console.log(res);
      });
    // alert('ajaja');
    navigation.replace('Success2', {
      messege: 'Data Berhasil Di Simpan !',
    });
  };

  const [ruas, setRuas] = useState([]);

  useEffect(() => {
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
              paddingRight: 5,
            }}>
            <MyButton
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

  return (
    <SafeAreaView style={{padding: 10}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <MyInput
          onChangeText={val => {
            setData({
              ...data,
              media: val,
            });
          }}
          label="Media"
          iconname="grid"
          value={data.media}
        />
        <MyGap jarak={10} />
        <MyInput
          onChangeText={val => {
            setData({
              ...data,
              pelapor: val,
            });
          }}
          label="Nama"
          iconname="person"
          value={data.pelapor}
        />
        <MyGap jarak={10} />
        <MyInput value={today} label="Tanggal Aduan" iconname="calendar" />
        <MyGap jarak={10} />

        <MyPicker
          onValueChange={val => {
            setData({
              ...data,
              ruas: val,
            });
          }}
          label="Ruas Jalan"
          iconname="analytics"
          data={ruas}
        />
        <MyInput
          onChangeText={val => {
            setData({
              ...data,
              awal: val,
            });
          }}
          label="Lokasi Awal KM"
          iconname="navigate"
        />
        <MyGap jarak={10} />
        <MyInput
          value={data.akhir}
          onChangeText={val => {
            setData({
              ...data,
              akhir: val,
            });
          }}
          label="Lokasi Akhir KM"
          iconname="navigate"
        />
        <MyGap jarak={10} />

        <MyPicker
          value={data.jalur}
          onValueChange={val => {
            setData({
              ...data,
              jalur: val,
            });
          }}
          label="Jalur"
          iconname="analytics"
          data={[
            {
              label: 'Kanan',
              value: 'Kanan',
            },
            {
              label: 'Kiri',
              value: 'Kiri',
            },
            {
              label: 'Median',
              value: 'Median',
            },
          ]}
        />
        <MyGap jarak={10} />
        <MyPicker
          value={data.lajur}
          onValueChange={val => {
            setData({
              ...data,
              lajur: val,
            });
          }}
          label="Lajur"
          iconname="analytics"
          data={[
            {
              label: 'Rumija',
              value: 'Rumija',
            },
            {
              label: 'Drainase',
              value: 'Drainase',
            },
            {
              label: 'Trotoar',
              value: 'Trotoar',
            },
            {
              label: 'Bahu',
              value: 'Bahu',
            },
            {
              label: 'Lajur 1',
              value: 'Lajur 1',
            },
            {
              label: 'Lajur 2',
              value: 'Lajur 2',
            },
          ]}
        />
        <MyGap jarak={10} />
        <MyPicker
          value={data.kategori}
          onValueChange={val => {
            setData({
              ...data,
              kategori: val,
            });
          }}
          label="Kategori Kerusakan"
          iconname="search"
          data={[
            {
              label: 'PERKERASAN JALAN',
              value: 'PERKERASAN JALAN',
            },
            {
              label: 'BAHU JALAN',
              value: 'BAHU JALAN',
            },
            {
              label: 'DRAINASE',
              value: 'DRAINASE',
            },
            {
              label: 'PERLENGKAPAN JALAN',
              value: 'PERLENGKAPAN JALAN',
            },
            {
              label: 'PEBAGUNAN PELANGKAP',
              value: 'PEBAGUNAN PELANGKAP',
            },
            {
              label: 'CLEARANCE',
              value: 'CLEARANCE',
            },
          ]}
        />
        <MyGap jarak={10} />
        <MyPicker
          value={data.jenis}
          onValueChange={val => {
            setData({
              ...data,
              jenis: val,
            });
          }}
          label="Jenis Kerusakan"
          iconname="search"
          data={[
            {
              value: 'Lubang, diameter < 10 cm, kedalaman < 4 cm',
              label: 'Lubang, diameter < 10 cm, kedalaman < 4 cm',
            },
            {
              value: 'Lubang, diameter > 10 cm, kedalaman > 4 cm',
              label: 'Lubang, diameter > 10 cm, kedalaman > 4 cm',
            },
            {
              value: 'Retak, lebar > 3 mm, luas 5% setiap 100 m',
              label: 'Retak, lebar > 3 mm, luas 5% setiap 100 m',
            },
            {
              value: 'Amblas, lebar > 3 cm, luas 5% setiap 100 m',
              label: 'Amblas, lebar > 3 cm, luas 5% setiap 100 m',
            },
            {
              value: 'Ketidakrataan perkerasan (overlay), IRI < 4 mm/m',
              label: 'Ketidakrataan perkerasan (overlay), IRI < 4 mm/m',
            },
            {
              value: 'Rutting/Alur, kedalaman > 25 mm',
              label: 'Rutting/Alur, kedalaman > 25 mm',
            },
            {
              value: 'Raveling',
              label: 'Raveling',
            },
            {
              value: 'Patching yang tidak rata',
              label: 'Patching yang tidak rata',
            },
          ]}
        />
        <MyGap jarak={10} />
        <MyInput
          onChangeText={val => {
            setData({
              ...data,
              kode: val,
            });
          }}
          label="Kode Kategori IKJ"
          iconname="grid"
          value={data.kode}
        />
        <MyGap jarak={10} />
        <UploadFoto
          onPress1={() => getCamera(1)}
          onPress2={() => getGallery(1)}
          label="Upload Foto Kerusakan"
          foto={foto1}
        />
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
