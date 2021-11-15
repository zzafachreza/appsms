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
  const [data, setData] = useState({
    tanggal: `${yyyy}-${mm}-${dd}`,
    tim: null,
    kecamatan: null,
    kelurahan: null,
    jalan: null,
    jalan_panjang: null,
    jalan_lebar: null,
    drainase_panjang: null,
    drainase_lebar: null,
    foto1: null,
    foto2: null,
    foto3: null,
    foto4: null,
    foto5: null,
  });

  const [loading, setLoading] = useState(false);
  const [foto1, setfoto1] = useState('https://zavalabs.com/nogambar.jpg');
  const [foto2, setfoto2] = useState('https://zavalabs.com/nogambar.jpg');
  const [foto3, setfoto3] = useState('https://zavalabs.com/nogambar.jpg');
  const [foto4, setfoto4] = useState('https://zavalabs.com/nogambar.jpg');
  const [foto5, setfoto5] = useState('https://zavalabs.com/nogambar.jpg');

  const options = {
    includeBase64: true,
    quality: 0.5,
    maxWidth: 500,
    maxHeight: 500,
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
          case 5:
            setData({
              ...data,
              foto5: `data:${response.type};base64, ${response.base64}`,
            });
            setfoto5(`data:${response.type};base64, ${response.base64}`);
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
          case 5:
            setData({
              ...data,
              foto5: `data:${response.type};base64, ${response.base64}`,
            });
            setfoto5(`data:${response.type};base64, ${response.base64}`);
            break;
        }
      }
    });
  };

  const sendServer = () => {
    setLoading(true);
    // console.log('data yang akan dirikin', data);
    axios
      .post('https://zavalabs.com/sms/api/survey_add.php', data)
      .then(res => {
        console.log(res);
        alert('Data Berhasil Disimpan !');
        navigation.replace('MainApp');
      });
    // //
    // navigation.replace('Success2', {
    //   messege: 'Data Berhasil Di Simpan !',
    // });
  };

  useEffect(() => {
    getData('user').then(res => {
      setData({
        ...data,
        id_member: res.id,
      });
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
            aspectRatio: 1,
            resizeMode: 'contain',
          }}
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

        <UploadFoto
          onPress1={() => getCamera(1)}
          onPress2={() => getGallery(1)}
          label="Upload Foto 1"
          foto={foto1}
        />

        <UploadFoto
          onPress1={() => getCamera(2)}
          onPress2={() => getGallery(2)}
          label="Upload Foto 2"
          foto={foto2}
        />

        <UploadFoto
          onPress1={() => getCamera(3)}
          onPress2={() => getGallery(3)}
          label="Upload Foto 3"
          foto={foto3}
        />

        <UploadFoto
          onPress1={() => getCamera(4)}
          onPress2={() => getGallery(4)}
          label="Upload Foto 4"
          foto={foto4}
        />

        <UploadFoto
          onPress1={() => getCamera(5)}
          onPress2={() => getGallery(5)}
          label="Upload Foto 5"
          foto={foto5}
        />
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
