import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Dimensions,
  ImageBackground,
  SafeAreaView,
  Image,
  TouchableWithoutFeedback,
  ScrollView,
  TouchableOpacity,
  TouchableNativeFeedback,
  Linking,
  RefreshControl,
} from 'react-native';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import {storeData, getData} from '../../utils/localStorage';
import {Icon} from 'react-native-elements';
import MyCarouser from '../../components/MyCarouser';
import MyTerbaik from '../../components/MyTerbaik';
import axios from 'axios';
import messaging from '@react-native-firebase/messaging';
import 'intl';
import 'intl/locale-data/jsonp/en';

const wait = timeout => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
};

export default function Home({navigation}) {
  const [user, setUser] = useState([]);
  const [token, setToken] = useState('');
  const [point, setPoint] = useState(0);

  const [company, setCompany] = useState({});

  const [refreshing, setRefreshing] = React.useState(false);

  const getDataPoint = () => {
    getData('user').then(res => {
      setUser(res);
      axios
        .post('https://zavalabs.com/sininja/api/point.php', {
          id_member: res.id,
        })
        .then(respoint => {
          setPoint(respoint.data);
          console.log('get apoint', respoint.data);
        });

      getData('token').then(res => {
        console.log('data token,', res);
        setToken(res.token);
        axios
          .post('https://zavalabs.com/sininja/api/update_token.php', {
            id_member: user.id,
            token: res.token,
          })
          .then(res => {
            console.log('update token', res);
          });
      });
    });
  };

  const DataKategori = ({icon, nama, nama2, onPress}) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={{
          backgroundColor: colors.primary,
          padding: 5,
          borderRadius: 10,
          width: windowWidth - 20,
          height: 250,
          elevation: 5,
        }}>
        <View>
          <Icon
            type="ionicon"
            name={icon}
            color={colors.white}
            size={windowWidth / 3}
          />
        </View>
        <View>
          <Text
            style={{
              fontFamily: fonts.secondary[400],
              color: colors.white,
              fontSize: windowWidth / 10,
              textAlign: 'center',
              // marginHorizontal: 10,
            }}>
            MULAI SURVEI
          </Text>
          <Text
            style={{
              fontFamily: fonts.secondary[800],
              color: colors.white,
              fontSize: windowWidth / 10,
              textAlign: 'center',
              // marginHorizontal: 10,
            }}>
            SEKARANG
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const GetCompany = () => {
    axios.get('https://zavalabs.com/sininja//api/company.php').then(res => {
      console.log('data company', res.data);
      setCompany(res.data);
    });
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getDataPoint();
    wait(2000).then(() => {
      setRefreshing(false);
    });
  }, []);

  messaging().onMessage(async remoteMessage => {
    // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    const json = JSON.stringify(remoteMessage);
    const obj = JSON.parse(json);
    getDataPoint();
  });

  useEffect(() => {
    getDataPoint();
    GetCompany();
  }, []);

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const ratio = 192 / 108;
  const _renderItem = ({item, index}) => {
    return (
      <Image
        resizeMode="contain"
        source={{uri: item.image}}
        style={{
          width: windowWidth,
          height: Math.round((windowWidth * 9) / 16),
        }}
      />
    );
  };

  return (
    <ImageBackground
      style={{
        flex: 1,
        // backgroundColor: colors.primary,
      }}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.primary]}
          />
        }>
        <View
          style={{
            height: windowHeight / 7,
            padding: 10,
            backgroundColor: colors.white,
            flexDirection: 'row',
          }}>
          <View style={{flex: 1, paddingTop: 15}}>
            <Text
              style={{
                fontSize: windowWidth / 25,
                color: colors.primary,
                fontFamily: fonts.secondary[400],
              }}>
              Selamat datang,
            </Text>
            <Text
              style={{
                fontSize: windowWidth / 25,
                color: colors.primary,
                fontFamily: fonts.secondary[600],
              }}>
              {user.nama_lengkap}
            </Text>
            <Text
              style={{
                fontSize: windowWidth / 25,
                color: colors.black,
                fontFamily: fonts.secondary[600],
              }}>
              Survey Management System
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
              padding: 10,
            }}>
            <Image
              source={require('../../assets/logo2.png')}
              style={{
                width: windowWidth / 5,
                resizeMode: 'contain',
              }}
            />
            {/* <Icon type="ionicon" name="notifications" color={colors.white} /> */}
          </View>
        </View>

        {/* bagian untuk search */}

        <View
          style={{
            // padding: 10,
            backgroundColor: colors.white,
          }}>
          <Image
            source={require('../../assets/slide.png')}
            style={{width: windowWidth, height: windowHeight / 3}}
          />
        </View>

        <View
          style={{
            padding: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 15,
            }}>
            <DataKategori
              onPress={() => navigation.navigate('DataInspeksiInput')}
              icon="newspaper"
              nama="MULAI"
              nama2="SURVEI"
            />
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}