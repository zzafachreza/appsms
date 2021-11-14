import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ActivityIndicator,
  PermissionsAndroid,
} from 'react-native';
import WebView from 'react-native-webview';
import {colors} from '../../utils/colors';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Icon} from 'react-native-elements';
import {fonts, windowWidth} from '../../utils/fonts';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import axios from 'axios';
import {showMessage} from 'react-native-flash-message';
import PushNotification from 'react-native-push-notification';
import FileViewer from 'react-native-file-viewer';
import {MyInput, MyPicker} from '../../components';

export default function LaporanInspeksi({route}) {
  const [user, setUser] = useState({});
  const [visible, setVisible] = useState(true);
  const [bulan, setBulan] = useState('1');
  const [tahun, setTahun] = useState('2021');

  const hideSpinner = () => {
    setVisible(false);
  };

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'SININJA',
          message: 'Izinikan Aplikasi Untuk Menyimpan Data',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        axios.post(myUrl2).then(res => {
          console.log(res.data);
          createPDF('Laporan_inspeksi', res.data);
        });
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const createPDF = async (nama_file, html) => {
    let options = {
      html: html,
      fileName: 'Laporan_inspeksi' + nama_file,
      directory: '',
    };

    let file = await RNHTMLtoPDF.convert(options);
    console.log(file.filePath);
    // alert(file.filePath);

    // const path = // absolute-path-to-my-local-file.
    FileViewer.open(file.filePath, {showOpenWithDialog: false})
      .then(() => {
        // success
        PushNotification.localNotification({
          /* Android Only Properties */
          channelId: 'zvl-bigetronesports', // (required) channelId, if the channel doesn't exist, notification will not trigger.
          title: 'Sininja', // (optional)
          message: 'Download Selesai, ' + file.filePath, // (required)
        });
      })
      .catch(error => {
        // error
      });

    // showMessage({
    //   type: 'success',
    //   message: 'Berhsil di simpan di ' + file.filePath,
    // });

    // navigation.navigate('MaterialReportDetail', {
    //   link: file.filePath,
    // });
  };
  const myUrl = `https://zavalabs.com/sininja/api/ikj.php?tahun=${tahun}&bulan=${bulan}`;

  const myUrl2 = `https://zavalabs.com/sininja/api/ikj2.php?tahun=${tahun}&bulan=${bulan}`;

  const sendServer = () => {
    requestCameraPermission();
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <View style={{flexDirection: 'row', padding: 10}}>
        <View style={{flex: 1}}>
          <MyPicker
            data={[
              {
                label: '2019',
                value: '2019',
              },
              {
                label: '2021',
                value: '2021',
              },
              {
                label: '2022',
                value: '2022',
              },
              {
                label: '2022',
                value: '2022',
              },
              {
                label: '2023',
                value: '2023',
              },
              {
                label: '2024',
                value: '2024',
              },
              {
                label: '2025',
                value: '2025',
              },
            ]}
            iconname="calendar"
            label="Tahun"
            onValueChange={val => setTahun(val)}
          />
        </View>
        <View style={{flex: 1}}>
          <MyPicker
            data={[
              {
                label: 'Januari',
                value: '01',
              },
              {
                label: 'Februari',
                value: '02',
              },
              {
                label: 'Maret',
                value: '03',
              },
              {
                label: 'April',
                value: '04',
              },
              {
                label: 'Mei',
                value: '05',
              },
              {
                label: 'Juni',
                value: '06',
              },
              {
                label: 'Juli',
                value: '07',
              },
              {
                label: 'Agustus',
                value: '08',
              },
              {
                label: 'September',
                value: '09',
              },
              {
                label: 'OKtober',
                value: '10',
              },
              {
                label: 'November',
                value: '11',
              },
              {
                label: 'Desember',
                value: '12',
              },
            ]}
            iconname="calendar"
            label="Bulan"
            onValueChange={val => setBulan(val)}
          />
        </View>
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
      <TouchableOpacity
        onPress={sendServer}
        style={{
          padding: 15,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          backgroundColor: colors.danger,
        }}>
        <Icon type="ionicon" name="download-outline" color={colors.white} />
        <Text
          style={{
            left: 10,
            fontFamily: fonts.secondary[600],
            fontSize: windowWidth / 20,
            color: colors.white,
          }}>
          DOWNLOAD / PRINT
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
